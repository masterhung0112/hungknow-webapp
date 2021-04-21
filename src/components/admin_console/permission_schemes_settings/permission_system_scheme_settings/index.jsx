// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadRolesIfNeeded, editRole } from 'hkclient-ts/lib/actions/roles'

import { getRoles } from 'hkclient-ts/lib/selectors/entities/roles'
import { getLicense, getConfig } from 'hkclient-ts/lib/selectors/entities/general'

import { setNavigationBlocked } from 'actions/admin_actions.jsx'

import PermissionSystemSchemeSettings from './permission_system_scheme_settings.jsx'

function mapStateToProps(state) {
  return {
    config: getConfig(state),
    license: getLicense(state),
    roles: getRoles(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        loadRolesIfNeeded,
        editRole,
        setNavigationBlocked,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionSystemSchemeSettings)
