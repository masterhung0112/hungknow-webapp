// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { removeReaction } from 'hkclient-ts/lib/actions/posts'
import { getMissingProfilesByIds } from 'hkclient-ts/lib/actions/users'
import { getCurrentUserId, makeGetProfilesForReactions, getCurrentUser } from 'hkclient-ts/lib/selectors/entities/users'
import { getChannel } from 'hkclient-ts/lib/selectors/entities/channels'
import { getCustomEmojisByName } from 'hkclient-ts/lib/selectors/entities/emojis'
import { getEmojiImageUrl } from 'hkclient-ts/lib/utils/emoji_utils'
import { getTeammateNameDisplaySetting } from 'hkclient-ts/lib/selectors/entities/preferences'
import { haveIChannelPermission } from 'hkclient-ts/lib/selectors/entities/roles'
import Permissions from 'hkclient-ts/lib/constants/permissions'
import Constants from 'hkclient-ts/lib/constants/general'
import { getConfig, getLicense } from 'hkclient-ts/lib/selectors/entities/general'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { ClientConfig, ClientLicense } from 'hkclient-ts/lib/types/config'
import { GenericAction } from 'hkclient-ts/lib/types/actions'
import { Emoji as EmojiType } from 'hkclient-ts/lib/types/emojis'
import { UserProfile } from 'hkclient-ts/lib/types/users'
import { Post } from 'hkclient-ts/lib/types/posts'
import { Reaction as ReactionType } from 'hkclient-ts/lib/types/reactions'

import { addReaction } from 'actions/post_actions.jsx'

import * as Emoji from 'utils/emoji.jsx'
import { getSortedUsers } from 'utils/utils.jsx'

import { Channel } from 'hkclient-ts/lib/types/channels'

import Reaction from './reaction'

type Props = {
  emojiName: string
  post: Post
  reactions: ReactionType[]
}

function makeMapStateToProps() {
  const getProfilesForReactions = makeGetProfilesForReactions()

  return function mapStateToProps(state: GlobalState, ownProps: Props) {
    const config = getConfig(state)
    const license = getLicense(state)
    const me = getCurrentUser(state)

    const profiles = getProfilesForReactions(state, ownProps.reactions)
    let emoji
    if (Emoji.EmojiIndicesByAlias.has(ownProps.emojiName)) {
      emoji = Emoji.Emojis[Emoji.EmojiIndicesByAlias.get(ownProps.emojiName) as number]
    } else {
      const emojis = getCustomEmojisByName(state)
      emoji = emojis.get(ownProps.emojiName)
    }

    let emojiImageUrl = ''
    if (emoji) {
      emojiImageUrl = getEmojiImageUrl(emoji as EmojiType)
    }
    const channel = getChannel(state, ownProps.post.channel_id) || ({} as Channel)
    const channelIsArchived = channel.delete_at !== 0
    const teamId = channel.team_id
    const currentUserId = getCurrentUserId(state)
    const teammateNameDisplaySetting = getTeammateNameDisplaySetting(state)
    let canAddReaction = false
    let canRemoveReaction = false

    if (!channelIsArchived) {
      canAddReaction = checkReactionAction(
        state,
        teamId,
        ownProps.post.channel_id,
        channel.name,
        config,
        license,
        me,
        Permissions.REMOVE_REACTION
      )
      canRemoveReaction = checkReactionAction(
        state,
        teamId,
        ownProps.post.channel_id,
        channel.name,
        config,
        license,
        me,
        Permissions.ADD_REACTION
      )
    }

    return {
      profiles,
      otherUsersCount: ownProps.reactions.length - profiles.length,
      currentUserId,
      reactionCount: ownProps.reactions.length,
      canAddReaction,
      canRemoveReaction,
      emojiImageUrl,
      sortedUsers: getSortedUsers(ownProps.reactions, currentUserId, profiles, teammateNameDisplaySetting),
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators(
      {
        addReaction,
        removeReaction,
        getMissingProfilesByIds,
      },
      dispatch
    ),
  }
}

function checkReactionAction(
  state: GlobalState,
  teamId: string,
  channelId: string,
  channelName: string,
  config: Partial<ClientConfig>,
  license: ClientLicense,
  user: UserProfile,
  permission: string
) {
  if (!haveIChannelPermission(state, { team: teamId, channel: channelId, permission })) {
    return false
  }

  if (
    channelName === Constants.DEFAULT_CHANNEL &&
    config.ExperimentalTownSquareIsReadOnly === 'true' &&
    license.IsLicensed === 'true' &&
    !user.roles.includes('system_admin')
  ) {
    return false
  }

  return true
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Reaction)
