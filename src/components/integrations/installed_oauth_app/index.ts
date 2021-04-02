// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getUser } from 'hkclient-ts/lib/selectors/entities/users'
import { GlobalState } from 'hkclient-ts/lib/types/store'

import { getDisplayNameByUser } from 'utils/utils'

import InstalledOAuthApp, { InstalledOAuthAppProps } from './installed_oauth_app'
import { OAuthApp } from 'hkclient-ts/lib/types/integrations'

function mapStateToProps(state: GlobalState, ownProps: InstalledOAuthAppProps) {
  const oauthApp = ownProps.oauthApp || {} as OAuthApp
  return {
    creatorName: getDisplayNameByUser(state, getUser(state, oauthApp.creator_id)),
  }
}

export default connect(mapStateToProps)(InstalledOAuthApp)
