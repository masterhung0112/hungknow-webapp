import { getCurrentUser } from "hkclient-ts/selectors/entities/common";
import {
  getTeamMemberships,
  getMyTeams,
  getTeam,
  getMyTeamMember,
} from "hkclient-ts/selectors/entities/teams";
import {
  getAllDirectChannels,
  getChannelsNameMapInTeam,
  getRedirectChannelNameForTeam,
  getMyChannelMember,
} from "hkclient-ts/selectors/entities/channels";
import {
  fetchMyChannelsAndMembers,
  getChannelByNameAndTeamName,
} from "hkclient-ts/actions/channels";

import { loadMe } from "hkclient-ts/actions/users";
import { Utils } from "utils";
import { getCurrentLocale } from "selectors/i18n";
import LocalStorageStore from "stores/local_storage_store";
import {
  ActionResult,
  DispatchFunc,
  GetStateFunc,
} from "hkclient-ts/types/actions";
import Router from "next/router";
import { filterAndSortTeamsByDisplayName } from "utils/team_utils";
import { UserProfile } from "hkclient-ts/types/users";
import { Team } from "hkclient-ts/types/teams";

export function redirectUserToDefaultTeam() {
  return async (
    dispatch: DispatchFunc,
    getState: GetStateFunc
  ): Promise<ActionResult> => {
    let state = getState();

    // Assume we need to load the user if they don't have any team memberships loaded or the user loaded
    let user = getCurrentUser(state);
    const shouldLoadUser =
      Utils.isEmptyObject(getTeamMemberships(state)) || !user;

    if (shouldLoadUser) {
      await dispatch(loadMe());
      state = getState();
      user = getCurrentUser(state);
    }

    if (!user) {
      return {};
    }

    const locale = getCurrentLocale(state);
    const teamId = LocalStorageStore.getPreviousTeamId(user.id, state);

    let myTeams = getMyTeams(state);
    if (myTeams.length === 0) {
      Router.push("/talking/select_team");
      return {};
    }

    const team = getTeam(state, teamId);
    if (team && team.delete_at === 0) {
      const channel = await getTeamRedirectChannelIfIsAccesible(user, team);
      if (channel) {
        //TODO: Open this
        // dispatch(selectChannel(channel.id));
        Router.push(`/talking/${team.name}/channels/${channel.name}`);
        return {};
      }
    }

    myTeams = filterAndSortTeamsByDisplayName(myTeams, locale);

    for (const myTeam of myTeams) {
      // This should execute async behavior in a pretty limited set of situations, so shouldn't be a problem
      const channel = await getTeamRedirectChannelIfIsAccesible(user, myTeam); // eslint-disable-line no-await-in-loop
      if (channel) {
        //TODO: Open this
        // dispatch(selectChannel(channel.id));
        Router.push(`/talking/${myTeam.name}/channels/${channel.name}`);
        return {};
      }
    }

    Router.push("/talking/select_team");
    return {};
  };
}

export function getTeamRedirectChannelIfIsAccesible(
  user: UserProfile,
  team: Team
) {
  return async (dispatch: DispatchFunc, getState: GetStateFunc) => {
    let state = getState();
    let channel = null;

    const myMember = getMyTeamMember(state, team.id);
    if (!myMember || Object.keys(myMember).length === 0) {
      return null;
    }

    let teamChannels = getChannelsNameMapInTeam(state, team.id);
    if (!teamChannels || Object.keys(teamChannels).length === 0) {
      // This should be executed in pretty limited scenarios (empty teams)
      await dispatch(fetchMyChannelsAndMembers(team.id)); // eslint-disable-line no-await-in-loop
      state = getState();
      teamChannels = getChannelsNameMapInTeam(state, team.id);
    }

    const channelName = LocalStorageStore.getPreviousChannelName(
      user.id,
      team.id,
      getState()
    );
    channel = teamChannels[channelName];

    if (typeof channel === "undefined") {
      const dmList = getAllDirectChannels(state);
      channel = dmList.find(
        (directChannel) => directChannel.name === channelName
      );
    }

    let channelMember = getMyChannelMember(state, channel && channel.id);

    if (!channel || !channelMember) {
      // This should be executed in pretty limited scenarios (when the last visited channel in the team has been removed)
      await dispatch(getChannelByNameAndTeamName(team.name, channelName)); // eslint-disable-line no-await-in-loop
      state = getState();
      teamChannels = getChannelsNameMapInTeam(state, team.id);
      channel = teamChannels[channelName];
      channelMember = getMyChannelMember(state, channel && channel.id);
    }

    if (!channel || !channelMember) {
      const redirectedChannelName = getRedirectChannelNameForTeam(
        state,
        team.id
      );
      channel = teamChannels[redirectedChannelName];
      channelMember = getMyChannelMember(state, channel && channel.id);
    }

    if (channel && channelMember) {
      return channel;
    }
    return null;
  };
}
