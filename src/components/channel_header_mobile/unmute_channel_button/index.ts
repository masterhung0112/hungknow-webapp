// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { updateChannelNotifyProps } from 'hkclient-ts/lib/actions/channels'

import { GenericAction } from 'hkclient-ts/lib/types/actions'

import UnmuteChannelButton from './unmute_channel_button'

const mapDispatchToProps = (dispatch: Dispatch<GenericAction>) => ({
  actions: bindActionCreators(
    {
      updateChannelNotifyProps,
    },
    dispatch
  ),
})

export default connect(null, mapDispatchToProps)(UnmuteChannelButton)
