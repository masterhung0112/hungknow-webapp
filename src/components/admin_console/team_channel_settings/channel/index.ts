// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'

import { GlobalState } from 'hkclient-ts/lib/types/store'

import { ChannelsSettings } from './channel_settings'

function mapStateToProps(state: GlobalState) {
  const config = getConfig(state)
  const siteName = config.SiteName

  return {
    siteName,
  }
}

export default connect(mapStateToProps)(ChannelsSettings)
