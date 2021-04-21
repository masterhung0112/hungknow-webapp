// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { getCurrentUser } from 'hkclient-ts/lib/selectors/entities/users'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { GenericAction, ActionFunc } from 'hkclient-ts/lib/types/actions'

import { activateMfa, generateMfaSecret } from 'actions/views/mfa'

import Setup from './setup'

function mapStateToProps(state: GlobalState) {
  const config = getConfig(state)

  const siteName = config.SiteName
  const enforceMultifactorAuthentication = config.EnforceMultifactorAuthentication === 'true'

  return {
    currentUser: getCurrentUser(state),
    siteName,
    enforceMultifactorAuthentication,
  }
}

type Actions = {
  activateMfa: (code: string) => Promise<{ error?: { server_error_id: string; message: string } }>
  generateMfaSecret: () => Promise<{ data: { secret: string; qr_code: string }; error?: { message: string } }>
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        activateMfa,
        generateMfaSecret,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup)
