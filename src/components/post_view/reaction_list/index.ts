// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { getChannel } from 'hkclient-ts/lib/selectors/entities/channels'
import { makeGetReactionsForPost } from 'hkclient-ts/lib/selectors/entities/posts'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { GenericAction } from 'hkclient-ts/lib/types/actions'
import { Post } from 'hkclient-ts/lib/types/posts'
import { Reaction } from 'hkclient-ts/lib/types/reactions'

import { addReaction } from 'actions/post_actions.jsx'

import { Channel } from 'hkclient-ts/lib/types/channels'

import ReactionList from './reaction_list'

type Props = {
  enableEmojiPicker: boolean
  isReadOnly: boolean
  post: Post
  reactions: { [x: string]: Reaction } | undefined | null
}

function makeMapStateToProps() {
  const getReactionsForPost = makeGetReactionsForPost()

  return function mapStateToProps(state: GlobalState, ownProps: Props) {
    const config = getConfig(state)
    const enableEmojiPicker = config.EnableEmojiPicker === 'true' && !ownProps.isReadOnly

    const channel = getChannel(state, ownProps.post.channel_id) || ({} as Channel)
    const teamId = channel.team_id

    return {
      teamId,
      reactions: getReactionsForPost(state, ownProps.post.id),
      enableEmojiPicker,
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators(
      {
        addReaction,
      },
      dispatch
    ),
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ReactionList)
