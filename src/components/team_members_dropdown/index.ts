// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { getChannelStats } from 'hkclient-ts/lib/actions/channels'
import {
  getMyTeamMembers,
  getMyTeamUnreads,
  getTeamStats,
  getTeamMember,
  updateTeamMemberSchemeRoles,
} from 'hkclient-ts/lib/actions/teams'
import { getUser, updateUserActive } from 'hkclient-ts/lib/actions/users'
import { getCurrentUser } from 'hkclient-ts/lib/selectors/entities/users'
import { getCurrentRelativeTeamUrl, getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'

import { GlobalState } from 'hkclient-ts/lib/types/store'

import { GenericAction } from 'hkclient-ts/lib/types/actions'

import { removeUserFromTeamAndGetStats } from 'actions/team_actions.jsx'

import TeamMembersDropdown from './team_members_dropdown'

function mapStateToProps(state: GlobalState) {
  return {
    currentUser: getCurrentUser(state),
    teamUrl: getCurrentRelativeTeamUrl(state),
    currentTeam: getCurrentTeam(state),
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators(
      {
        getMyTeamMembers,
        getMyTeamUnreads,
        getUser,
        getTeamMember,
        getTeamStats,
        getChannelStats,
        updateUserActive,
        updateTeamMemberSchemeRoles,
        removeUserFromTeamAndGetStats,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembersDropdown)
