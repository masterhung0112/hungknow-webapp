// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'
import { connect } from 'react-redux'

import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { sendVerificationEmail } from 'hkclient-ts/lib/actions/users'
import { GenericAction, ActionFunc } from 'hkclient-ts/lib/types/actions'
import { GlobalState } from 'hkclient-ts/lib/types/store'

import ShouldVerifyEmail from './should_verify_email'

type Actions = {
  sendVerificationEmail: (
    email: string
  ) => Promise<{
    data: boolean
    error?: {
      err: string
    }
  }>
}

const mapStateToProps = (state: GlobalState) => {
  const { SiteName: siteName } = getConfig(state)
  return { siteName }
}

const mapDispatchToProps = (dispatch: Dispatch<GenericAction>) => ({
  actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
    {
      sendVerificationEmail,
    },
    dispatch
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShouldVerifyEmail)
