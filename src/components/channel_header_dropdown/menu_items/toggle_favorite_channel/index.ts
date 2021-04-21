// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { favoriteChannel, unfavoriteChannel } from 'hkclient-ts/lib/actions/channels'
import { GenericAction } from 'hkclient-ts/lib/types/actions'

import ToggleFavoriteChannel from './toggle_favorite_channel'

const mapDispatchToProps = (dispatch: Dispatch<GenericAction>) => ({
  actions: bindActionCreators(
    {
      favoriteChannel,
      unfavoriteChannel,
    },
    dispatch
  ),
})

export default connect(null, mapDispatchToProps)(ToggleFavoriteChannel)
