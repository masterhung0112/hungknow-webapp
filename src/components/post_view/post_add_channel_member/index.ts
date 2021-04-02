// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { addChannelMember } from 'hkclient-ts/lib/actions/channels'
import { removePost } from 'hkclient-ts/lib/actions/posts'
import { getPost } from 'hkclient-ts/lib/selectors/entities/posts'
import { getChannel } from 'hkclient-ts/lib/selectors/entities/channels'
import { getCurrentUser } from 'hkclient-ts/lib/selectors/entities/users'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { GenericAction } from 'hkclient-ts/lib/types/actions'

import { Post } from 'hkclient-ts/lib/types/posts'

import PostAddChannelMember, { Props } from './post_add_channel_member'

function mapStateToProps(state: GlobalState, ownProps: Props) {
  const post = getPost(state, ownProps.postId) || ({} as Post)
  let channelType = ''
  if (post && post.channel_id) {
    const channel = getChannel(state, post.channel_id)
    if (channel && channel.type) {
      channelType = channel.type
    }
  }

  return {
    channelType,
    currentUser: getCurrentUser(state),
    post,
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators(
      {
        addChannelMember,
        removePost,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAddChannelMember)
