// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { revokeUserAccessToken } from 'hkclient-ts/lib/actions/users'
import { GenericAction } from 'hkclient-ts/lib/types/actions'

import RevokeTokenButton from './revoke_token_button'

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators(
      {
        revokeUserAccessToken,
      },
      dispatch
    ),
  }
}

export default connect(null, mapDispatchToProps)(RevokeTokenButton)
