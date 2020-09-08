import { Store } from 'redux';
import { wrapper } from 'stores/redux_store.jsx'
import { GlobalState } from 'hkclient-ts/types/store';
import { getCurrentUser } from 'hkclient-ts/selectors/entities/common'
import { getTeamMemberships } from 'hkclient-ts/selectors/entities/teams'
import { loadMe } from 'hkclient-ts/actions/users'
import { Utils } from 'utils';
import { getCurrentLocale } from 'selectors/i18n';
import LocalStorageStore from 'stores/local_storage_store'
// import 'hkclient-ts/types/actions'
// const getState = wrapper;

// import { ActionFunc } from 'hkclient-ts/types/actions'

// declare module 'redux' {
//     /*
//     * Overload to add thunk support to Redux's dispatch() function.
//     * Useful for react-redux or any other library which could use this type.
//     */
//    export interface Dispatch<A extends Action = AnyAction> {
//      <TReturnType = any>(
//        actionFunc: ActionFunc,
//      ): TReturnType;
//    }
//  }

export async function redirectUserToDefaultTeam(store: Store<GlobalState>) {
    let state = store.getState();

    // Assume we need to load the user if they don't have any team memberships loaded or the user loaded
    let user = getCurrentUser(state);
    const shouldLoadUser = Utils.isEmptyObject(getTeamMemberships(state)) || !user;

    if (shouldLoadUser) {
        await store.dispatch(loadMe());
        state = store.getState();
        user = getCurrentUser(state);
    }

    if (!user) {
        return;
    }

    const locale = getCurrentLocale(state);
    const teamId = LocalStorageStore.getPreviousTeamId(user.id, state);

    let myTeams = getMyTeams(state);
    if (myTeams.length === 0) {
        browserHistory.push('/select_team');
        return;
    }

    const team = getTeam(state, teamId);
    if (team && team.delete_at === 0) {
        const channel = await getTeamRedirectChannelIfIsAccesible(user, team);
        if (channel) {
            dispatch(selectChannel(channel.id));
            browserHistory.push(`/${team.name}/channels/${channel.name}`);
            return;
        }
    }

    myTeams = filterAndSortTeamsByDisplayName(myTeams, locale);

    for (const myTeam of myTeams) {
        // This should execute async behavior in a pretty limited set of situations, so shouldn't be a problem
        const channel = await getTeamRedirectChannelIfIsAccesible(user, myTeam); // eslint-disable-line no-await-in-loop
        if (channel) {
            store.dispatch(selectChannel(channel.id));
            browserHistory.push(`/${myTeam.name}/channels/${channel.name}`);
            return;
        }
    }

    browserHistory.push('/select_team');
}