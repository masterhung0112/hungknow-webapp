// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { regenOAuthAppSecret, deleteOAuthApp } from 'hkclient-ts/lib/actions/integrations'
import { getOAuthApps } from 'hkclient-ts/lib/selectors/entities/integrations'
import { haveISystemPermission } from 'hkclient-ts/lib/selectors/entities/roles'
import { Permissions } from 'hkclient-ts/lib/constants'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'

import { GlobalState } from 'hkclient-ts/lib/types/store'

import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'

import { GenericAction } from 'hkclient-ts/lib/types/actions'

import { loadOAuthAppsAndProfiles } from 'actions/integration_actions'

import InstalledOAuthApps from './installed_oauth_apps'

function mapStateToProps(state: GlobalState) {
  const config = getConfig(state)
  const enableOAuthServiceProvider = config.EnableOAuthServiceProvider === 'true'

  return {
    canManageOauth: haveISystemPermission(state, { permission: Permissions.MANAGE_OAUTH }),
    oauthApps: getOAuthApps(state),
    enableOAuthServiceProvider,
    team: getCurrentTeam(state),
  }
}

type Actions = {
  loadOAuthAppsAndProfiles: (page?: number, perPage?: number) => Promise<void>
  regenOAuthAppSecret: (appId: string) => Promise<{ error?: Error }>
  deleteOAuthApp: (appId: string) => Promise<void>
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject, Actions>(
      {
        loadOAuthAppsAndProfiles,
        regenOAuthAppSecret,
        deleteOAuthApp,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstalledOAuthApps)
