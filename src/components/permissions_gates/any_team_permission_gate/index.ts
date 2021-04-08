// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { haveITeamPermission } from 'hkclient-ts/lib/selectors/entities/roles'
import { getMyTeams } from 'hkclient-ts/lib/selectors/entities/teams'
import { GlobalState } from 'hkclient-ts/lib/types/store'

import AnyTeamPermissionGate from './any_team_permission_gate'

type Props = {
  permissions: string[]
}

function mapStateToProps(state: GlobalState, ownProps: Props) {
  const teams = getMyTeams(state)
  for (const team of teams) {
    for (const permission of ownProps.permissions) {
      if (haveITeamPermission(state, { team: team.id, permission })) {
        return { hasPermission: true }
      }
    }
  }

  return { hasPermission: false }
}

export default connect(mapStateToProps)(AnyTeamPermissionGate)