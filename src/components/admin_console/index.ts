// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { withRouter } from 'react-router-dom'

import { getConfig, getEnvironmentConfig, updateConfig } from 'hkclient-ts/lib/actions/admin'
import { loadRolesIfNeeded, editRole } from 'hkclient-ts/lib/actions/roles'
import * as Selectors from 'hkclient-ts/lib/selectors/entities/admin'
import { getConfig as getGeneralConfig, getLicense } from 'hkclient-ts/lib/selectors/entities/general'
import { getRoles } from 'hkclient-ts/lib/selectors/entities/roles'
import { selectChannel } from 'hkclient-ts/lib/actions/channels'
import { selectTeam } from 'hkclient-ts/lib/actions/teams'
import {
  isCurrentUserSystemAdmin,
  currentUserHasAnAdminRole,
  getCurrentUserId,
} from 'hkclient-ts/lib/selectors/entities/users'
import { getTeam } from 'hkclient-ts/lib/selectors/entities/teams'
import { ConsoleAccess } from 'hkclient-ts/lib/types/admin'

import { General } from 'hkclient-ts/lib/constants'
import { GenericAction } from 'hkclient-ts/lib/types/actions'

import { setNavigationBlocked, deferNavigation, cancelNavigation, confirmNavigation } from 'actions/admin_actions.jsx'
import { getNavigationBlocked, showNavigationPrompt } from 'selectors/views/admin'
import { getAdminDefinition, getConsoleAccess } from 'selectors/admin_console'

import LocalStorageStore from 'stores/local_storage_store'

import { GlobalState } from 'types/store'

import AdminConsole from './admin_console'

function mapStateToProps(state: GlobalState) {
  const generalConfig = getGeneralConfig(state)
  const buildEnterpriseReady = generalConfig.BuildEnterpriseReady === 'true'
  const adminDefinition = getAdminDefinition(state)
  const teamId = LocalStorageStore.getPreviousTeamId(getCurrentUserId(state))
  const team = getTeam(state, teamId || '')
  const unauthorizedRoute = team ? `/${team.name}/channels/${General.DEFAULT_CHANNEL}` : '/'
  const consoleAccess: ConsoleAccess = getConsoleAccess(state)

  return {
    config: Selectors.getConfig(state),
    environmentConfig: Selectors.getEnvironmentConfig(state),
    license: getLicense(state),
    buildEnterpriseReady,
    unauthorizedRoute,
    navigationBlocked: getNavigationBlocked(state),
    showNavigationPrompt: showNavigationPrompt(state),
    isCurrentUserSystemAdmin: isCurrentUserSystemAdmin(state),
    currentUserHasAnAdminRole: currentUserHasAnAdminRole(state),
    roles: getRoles(state),
    adminDefinition,
    consoleAccess,
    cloud: state.entities.cloud,
    team,
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators(
      {
        getConfig,
        getEnvironmentConfig,
        updateConfig,
        setNavigationBlocked,
        deferNavigation,
        cancelNavigation,
        confirmNavigation,
        loadRolesIfNeeded,
        editRole,
        selectChannel,
        selectTeam,
      },
      dispatch
    ),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminConsole))
