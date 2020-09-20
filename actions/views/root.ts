import { ActionFunc, ActionResultType, DispatchFunc } from 'hkclient-ts/types/actions';
import { getClientConfig } from 'hkclient-ts/actions/general'
import { UserActions } from 'hkclient-ts/actions'

export function loadMeAndConfig(): ActionFunc {
    return async (dispatch: DispatchFunc): Promise<ActionResultType[]> => {
        // if any new promise needs to be added please be mindful of the order as it is used in root.jsx for redirection
        const promises = [
            dispatch(getClientConfig())
        ]

        // need to await for clientConfig first as it is required for loadMe
        const resolvedPromises = await Promise.all(promises);
        if (document.cookie.indexOf('HKUSERID=') > -1) {
            resolvedPromises.push(await dispatch(UserActions.loadMe()));
        }

        return resolvedPromises;
    }
}