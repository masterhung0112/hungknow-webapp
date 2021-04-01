// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { getUser } from 'hkclient-ts/lib/selectors/entities/users'

import { Client4 } from 'hkclient-ts/lib/client'

import { GlobalState } from 'types/store'
import { isGuest } from 'utils/utils.jsx'

import PostHeader, { Props } from './post_header'

function mapStateToProps(state: GlobalState, ownProps: Props) {
  const config = getConfig(state)
  const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true'
  const enablePostIconOverride = config.EnablePostIconOverride === 'true'

  const overrideIconUrl = enablePostIconOverride && ownProps.post?.props?.override_icon_url
  let overwriteIcon
  if (overrideIconUrl) {
    overwriteIcon = Client4.getAbsoluteUrl(overrideIconUrl)
  }

  const user = getUser(state, ownProps.post.user_id)
  const isBot = Boolean(user && user.is_bot)

  return {
    enablePostUsernameOverride,
    isBot,
    overwriteIcon,
    isGuest: Boolean(user && isGuest(user)),
  }
}

export default connect(mapStateToProps)(PostHeader)
