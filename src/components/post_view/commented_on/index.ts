// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { getUser } from 'hkclient-ts/lib/selectors/entities/users'

import { GlobalState } from 'hkclient-ts/lib/types/store'

import { Post } from 'hkclient-ts/lib/types/posts'

import { getDisplayNameByUser } from 'utils/utils.jsx'

import CommentedOn from './commented_on'

type Props = {
  post: Post
}

function mapStateToProps(state: GlobalState, ownProps: Props) {
  let displayName = ''
  if (ownProps.post) {
    const user = getUser(state, ownProps.post.user_id)
    displayName = getDisplayNameByUser(state, user)
  }

  const config = getConfig(state)
  const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true'

  return {
    displayName,
    enablePostUsernameOverride,
  }
}

export default connect(mapStateToProps)(CommentedOn)
