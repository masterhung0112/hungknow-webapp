// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'

import { getUser } from 'hkclient-ts/lib/selectors/entities/users'
import { updateUserActive } from 'hkclient-ts/lib/actions/users'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { addUserToTeam } from 'hkclient-ts/lib/actions/teams'

import { ActionFunc, GenericAction } from 'hkclient-ts/lib/types/actions'

import { GlobalState } from 'hkclient-ts/lib/types/store'

import { ServerError } from 'hkclient-ts/lib/types/errors'

import { TeamMembership } from 'hkclient-ts/lib/types/teams'

import { adminResetMfa, setNavigationBlocked } from 'actions/admin_actions.jsx'

import SystemUserDetail from './system_user_detail'

type OwnProps = {
  match: any
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
  const config = getConfig(state)
  const userId = ownProps.match.params.user_id
  const user = getUser(state, userId)
  return {
    user,
    mfaEnabled: config.EnableMultifactorAuthentication === 'true',
  }
}

type Actions = {
  updateUserActive: (userId: string, active: boolean) => Promise<{ error: ServerError }>
  setNavigationBlocked: (blocked: boolean) => void
  addUserToTeam: (teamId: string, userId?: string) => Promise<{ data: TeamMembership; error?: any }>
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  const apiActions = bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
    {
      updateUserActive,
      addUserToTeam,
    },
    dispatch
  )
  const uiActions = bindActionCreators(
    {
      setNavigationBlocked,
      adminResetMfa,
    },
    dispatch
  )

  const props = {
    actions: Object.assign(apiActions, uiActions),
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemUserDetail)
