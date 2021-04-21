// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { updateChannelNotifyProps } from 'hkclient-ts/lib/actions/channels'
import { ActionFunc } from 'hkclient-ts/lib/types/actions'

import MenuItemToggleMuteChannel, { Actions } from './toggle_mute_channel'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
    {
      updateChannelNotifyProps,
    },
    dispatch
  ),
})

export default connect(null, mapDispatchToProps)(MenuItemToggleMuteChannel as any)
