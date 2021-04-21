// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { GenericAction, ActionFunc } from 'hkclient-ts/lib/types/actions'

import { updateUserRoles } from 'hkclient-ts/lib/actions/users'

import { GlobalState } from 'types/store'

import ManageRolesModal, { Props } from './manage_roles_modal'

function mapStateToProps(state: GlobalState) {
  return {
    userAccessTokensEnabled: state.entities.admin.config.ServiceSettings!.EnableUserAccessTokens,
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>(
      {
        updateUserRoles,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRolesModal)
