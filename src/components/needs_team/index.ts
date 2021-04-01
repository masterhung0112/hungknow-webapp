// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'
import { withRouter } from 'react-router-dom'

import { loadProfilesForDirect } from 'hkclient-ts/lib/actions/users'
import { fetchMyChannelsAndMembers, viewChannel } from 'hkclient-ts/lib/actions/channels'
import { getMyTeamUnreads, getTeamByName, selectTeam } from 'hkclient-ts/lib/actions/teams'
import {
  getGroups,
  getAllGroupsAssociatedToChannelsInTeam,
  getAllGroupsAssociatedToTeam,
  getGroupsByUserId,
} from 'hkclient-ts/lib/actions/groups'
import { getTheme } from 'hkclient-ts/lib/selectors/entities/preferences'
import { getLicense, getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { getCurrentUser } from 'hkclient-ts/lib/selectors/entities/users'
import { getCurrentTeamId, getMyTeams } from 'hkclient-ts/lib/selectors/entities/teams'
import { getCurrentChannelId } from 'hkclient-ts/lib/selectors/entities/channels'
import { Action } from 'hkclient-ts/lib/types/actions'

import { GlobalState } from 'types/store'

import { setPreviousTeamId } from 'actions/local_storage'
import { getPreviousTeamId } from 'selectors/local_storage'
import { loadStatusesForChannelAndSidebar } from 'actions/status_actions'
import { addUserToTeam } from 'actions/team_actions'
import { markChannelAsReadOnFocus } from 'actions/views/channel'
import { checkIfMFARequired } from 'utils/route'

import NeedsTeam from './needs_team'

type OwnProps = {
  match: {
    url: string
  }
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
  const license = getLicense(state)
  const config = getConfig(state)
  const currentUser = getCurrentUser(state)
  const plugins = state.plugins.components.NeedsTeamComponent

  return {
    license,
    theme: getTheme(state),
    mfaRequired: checkIfMFARequired(currentUser, license, config, ownProps.match.url),
    currentUser,
    currentTeamId: getCurrentTeamId(state),
    previousTeamId: getPreviousTeamId(state) as string,
    teamsList: getMyTeams(state),
    currentChannelId: getCurrentChannelId(state),
    useLegacyLHS: config.EnableLegacySidebar === 'true',
    plugins,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<Action>, any>(
      {
        fetchMyChannelsAndMembers,
        getMyTeamUnreads,
        viewChannel,
        markChannelAsReadOnFocus,
        getTeamByName,
        addUserToTeam,
        setPreviousTeamId,
        selectTeam,
        loadStatusesForChannelAndSidebar,
        loadProfilesForDirect,
        getAllGroupsAssociatedToChannelsInTeam,
        getAllGroupsAssociatedToTeam,
        getGroupsByUserId,
        getGroups,
      },
      dispatch
    ),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NeedsTeam))
