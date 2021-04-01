// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { GlobalState } from 'hkclient-ts/lib/types/store'
import { getOAuthApp, editOAuthApp } from 'hkclient-ts/lib/actions/integrations'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'

import { ActionFunc, ActionResult } from 'hkclient-ts/lib/types/actions'
import { OAuthApp } from 'hkclient-ts/lib/types/integrations'

import EditOAuthApp from './edit_oauth_app'

type Actions = {
  getOAuthApp: (id: string) => OAuthApp
  editOAuthApp: (app: OAuthApp) => Promise<ActionResult>
}

type Props = {
  location: Location
}

function mapStateToProps(state: GlobalState, ownProps: Props) {
  const config = getConfig(state)
  const oauthAppId: string = new URLSearchParams(ownProps.location.search).get('id') || ''
  const enableOAuthServiceProvider = config.EnableOAuthServiceProvider === 'true'

  return {
    oauthAppId,
    oauthApp: state.entities.integrations.oauthApps[oauthAppId],
    enableOAuthServiceProvider,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        getOAuthApp,
        editOAuthApp,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOAuthApp)
