// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'
import { connect } from 'react-redux'

import { sendPasswordResetEmail } from 'hkclient-ts/lib/actions/users'
import { GenericAction, ActionFunc } from 'hkclient-ts/lib/types/actions'
import { ServerError } from 'hkclient-ts/lib/types/errors'

import PasswordResetSendLink from './password_reset_send_link'

type Actions = {
  sendPasswordResetEmail: (emal: string) => Promise<{ data: any; error: ServerError }>
}

const mapDispatchToProps = (dispatch: Dispatch<GenericAction>) => ({
  actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
    {
      sendPasswordResetEmail,
    },
    dispatch
  ),
})

export default connect(null, mapDispatchToProps)(PasswordResetSendLink)
