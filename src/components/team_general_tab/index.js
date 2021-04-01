// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { getTeam, patchTeam, removeTeamIcon, setTeamIcon, regenerateTeamInviteId } from 'hkclient-ts/lib/actions/teams'
import { Permissions } from 'hkclient-ts/lib/constants'
import { haveITeamPermission } from 'hkclient-ts/lib/selectors/entities/roles'

import TeamGeneralTab from './team_general_tab.jsx'

function mapStateToProps(state, ownProps) {
  const config = getConfig(state)
  const maxFileSize = parseInt(config.MaxFileSize, 10)

  const canInviteTeamMembers = haveITeamPermission(state, {
    team: ownProps.team.id,
    permission: Permissions.INVITE_USER,
  })

  return {
    maxFileSize,
    canInviteTeamMembers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getTeam,
        patchTeam,
        regenerateTeamInviteId,
        removeTeamIcon,
        setTeamIcon,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamGeneralTab)
