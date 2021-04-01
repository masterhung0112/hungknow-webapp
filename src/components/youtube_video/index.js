// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getCurrentChannelId } from 'hkclient-ts/lib/selectors/entities/channels'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { getOpenGraphMetadataForUrl } from 'hkclient-ts/lib/selectors/entities/posts'

import YoutubeVideo from './youtube_video'

function mapStateToProps(state, ownProps) {
  const config = getConfig(state)

  return {
    currentChannelId: getCurrentChannelId(state),
    googleDeveloperKey: config.GoogleDeveloperKey,
    hasImageProxy: config.HasImageProxy === 'true',
    metadata: getOpenGraphMetadataForUrl(state, ownProps.postId, ownProps.link),
  }
}

export default connect(mapStateToProps)(YoutubeVideo)
