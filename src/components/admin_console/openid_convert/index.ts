// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { updateConfig } from 'hkclient-ts/lib/actions/admin'
import { ActionFunc, GenericAction } from 'hkclient-ts/lib/types/actions'
import { AdminConfig } from 'hkclient-ts/lib/types/config'

import OpenIdConvert from './openid_convert'

type Actions = {
  updateConfig: (config: AdminConfig) => ActionFunc
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        updateConfig,
      },
      dispatch
    ),
  }
}

export default connect(null, mapDispatchToProps)(OpenIdConvert)
