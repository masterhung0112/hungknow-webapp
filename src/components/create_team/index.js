// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { getCurrentChannel } from 'hkclient-ts/lib/selectors/entities/channels'
import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'

import CreateTeam from './create_team'

function mapStateToProps(state) {
  const config = getConfig(state)
  const currentChannel = getCurrentChannel(state)
  const currentTeam = getCurrentTeam(state)

  const customDescriptionText = config.CustomDescriptionText
  const siteName = config.SiteName

  return {
    currentChannel,
    currentTeam,
    customDescriptionText,
    siteName,
  }
}

export default connect(mapStateToProps)(CreateTeam)
