// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'

import { getCurrentChannelId, getUnreadChannels } from 'hkclient-ts/lib/selectors/entities/channels'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { memoizeResult } from 'hkclient-ts/lib/utils/helpers'
import { isChannelMuted } from 'hkclient-ts/lib/utils/channel_utils'
import { getMyChannelMemberships } from 'hkclient-ts/lib/selectors/entities/common'

import { Channel, ChannelMembership } from 'hkclient-ts/lib/types/channels'
import { PostList } from 'hkclient-ts/lib/types/posts'

import { ActionFunc, GenericAction } from 'hkclient-ts/lib/types/actions'
import { RelationOneToOne } from 'hkclient-ts/lib/types/utilities'

import { prefetchChannelPosts } from 'actions/views/channel'
import { trackDMGMOpenChannels } from 'actions/user_actions'

import { getCategoriesForCurrentTeam } from 'selectors/views/channel_sidebar'

import { GlobalState } from 'types/store'

import DataPrefetch from './data_prefetch'

type Actions = {
  prefetchChannelPosts: (channelId: string, delay?: number) => Promise<{ data: PostList }>
  trackDMGMOpenChannels: () => Promise<void>
}

enum Priority {
  high = 1,
  medium,
  low,
}

// function to return a queue obj with priotiy as key and array of channelIds as values.
// high priority has channels with mentions
// medium priority has channels with unreads
const prefetchQueue = memoizeResult(
  (channels: Channel[], memberships: RelationOneToOne<Channel, ChannelMembership>) => {
    return channels.reduce(
      (acc: Record<string, string[]>, channel: Channel) => {
        const channelId = channel.id
        const membership = memberships[channelId]
        if (membership && !isChannelMuted(membership)) {
          if (membership.mention_count > 0) {
            return {
              ...acc,
              [Priority.high]: [...acc[Priority.high], channelId],
            }
          } else if (
            membership.notify_props &&
            membership.notify_props.mark_unread !== 'mention' &&
            channel.total_msg_count - membership.msg_count
          ) {
            return {
              ...acc,
              [Priority.medium]: [...acc[Priority.medium], channelId],
            }
          }
        }
        return acc
      },
      {
        [Priority.high]: [], // 1 being high priority requests
        [Priority.medium]: [],
        [Priority.low]: [], //TODO: add chanenls such as fav.
      }
    )
  }
)

function isSidebarLoaded(state: GlobalState) {
  if (getConfig(state).EnableLegacySidebar === 'true') {
    // With the old sidebar, we don't need to wait for anything to load before fetching profiles
    return true
  }

  return getCategoriesForCurrentTeam(state).length > 0
}

function mapStateToProps(state: GlobalState) {
  const lastUnreadChannel = state.views.channel.lastUnreadChannel
  const memberships = getMyChannelMemberships(state)
  const unreadChannels = getUnreadChannels(state, lastUnreadChannel)
  const prefetchQueueObj = prefetchQueue(unreadChannels, memberships)
  const prefetchRequestStatus = state.views.channel.channelPrefetchStatus

  return {
    currentChannelId: getCurrentChannelId(state),
    prefetchQueueObj,
    prefetchRequestStatus,
    sidebarLoaded: isSidebarLoaded(state),
    unreadChannels,
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        prefetchChannelPosts,
        trackDMGMOpenChannels,
      } as any,
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPrefetch)
