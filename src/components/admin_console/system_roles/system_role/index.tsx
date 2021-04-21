// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { GenericAction, ActionFunc, ActionResult } from 'hkclient-ts/lib/types/actions'
import { Role } from 'hkclient-ts/lib/types/roles'
import { updateUserRoles } from 'hkclient-ts/lib/actions/users'
import { editRole } from 'hkclient-ts/lib/actions/roles'
import { getRolesById } from 'hkclient-ts/lib/selectors/entities/roles'
import { getLicense } from 'hkclient-ts/lib/selectors/entities/general'

import { GlobalState } from 'types/store'
import { setNavigationBlocked } from 'actions/admin_actions.jsx'

import SystemRole from './system_role'

type Props = {
  match: {
    params: {
      role_id: string
    }
  }
}

type Actions = {
  editRole(role: Role): Promise<ActionResult>
  updateUserRoles(userId: string, roles: string): Promise<ActionResult>
  setNavigationBlocked: (blocked: boolean) => void
}

function mapStateToProps(state: GlobalState, props: Props) {
  const role = getRolesById(state)[props.match.params.role_id]
  const license = getLicense(state)
  const isLicensedForCloud = license.Cloud === 'true'

  return {
    isLicensedForCloud,
    role,
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Actions>(
      {
        editRole,
        updateUserRoles,
        setNavigationBlocked,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemRole)
