// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getCurrentChannelId, getUnreadChannels} from 'hkclient-redux/selectors/entities/channels';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {memoizeResult} from 'hkclient-redux/utils/helpers';
import {getMsgCountInChannel, isChannelMuted} from 'hkclient-redux/utils/channel_utils';
import {getMyChannelMemberships} from 'hkclient-redux/selectors/entities/common';

import {Channel, ChannelMembership} from 'hkclient-redux/types/channels';
import {PostList} from 'hkclient-redux/types/posts';

import {ActionFunc, GenericAction} from 'hkclient-redux/types/actions';
import {RelationOneToOne} from 'hkclient-redux/types/utilities';

import {prefetchChannelPosts} from 'actions/views/channel';
import {trackDMGMOpenChannels} from 'actions/user_actions';

import {getCategoriesForCurrentTeam} from 'selectors/views/channel_sidebar';

import {GlobalState} from 'types/store';

import {isCollapsedThreadsEnabled} from '../../packages/hkclient-redux/src/selectors/entities/preferences';

import DataPrefetch from './data_prefetch';

type Actions = {
    prefetchChannelPosts: (channelId: string, delay?: number) => Promise<{data: PostList}>;
    trackDMGMOpenChannels: () => Promise<void>;
};

enum Priority {
    high = 1,
    medium,
    low
}

// function to return a queue obj with priotiy as key and array of channelIds as values.
// high priority has channels with mentions
// medium priority has channels with unreads
const prefetchQueue = memoizeResult((channels: Channel[], memberships: RelationOneToOne<Channel, ChannelMembership>, collapsedThreads: boolean) => {
    return channels.reduce((acc: Record<string, string[]>, channel: Channel) => {
        const channelId = channel.id;
        const membership = memberships[channelId];
        if (membership && !isChannelMuted(membership)) {
            if (collapsedThreads ? membership.mention_count_root : membership.mention_count) {
                return {
                    ...acc,
                    [Priority.high]: [...acc[Priority.high], channelId],
                };
            } else if (
                membership.notify_props &&
                membership.notify_props.mark_unread !== 'mention' &&
                Boolean(getMsgCountInChannel(collapsedThreads, channel, membership))
            ) {
                return {
                    ...acc,
                    [Priority.medium]: [...acc[Priority.medium], channelId],
                };
            }
        }
        return acc;
    }, {
        [Priority.high]: [], // 1 being high priority requests
        [Priority.medium]: [],
        [Priority.low]: [], //TODO: add chanenls such as fav.
    });
});

function isSidebarLoaded(state: GlobalState) {
    if (getConfig(state).EnableLegacySidebar === 'true') {
        // With the old sidebar, we don't need to wait for anything to load before fetching profiles
        return true;
    }

    return getCategoriesForCurrentTeam(state).length > 0;
}

function mapStateToProps(state: GlobalState) {
    const lastUnreadChannel = state.views.channel.lastUnreadChannel;
    const memberships = getMyChannelMemberships(state);
    const unreadChannels = getUnreadChannels(state, lastUnreadChannel);
    const prefetchQueueObj = prefetchQueue(unreadChannels, memberships, isCollapsedThreadsEnabled(state));
    const prefetchRequestStatus = state.views.channel.channelPrefetchStatus;

    return {
        currentChannelId: getCurrentChannelId(state),
        prefetchQueueObj,
        prefetchRequestStatus,
        sidebarLoaded: isSidebarLoaded(state),
        unreadChannels,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            prefetchChannelPosts,
            trackDMGMOpenChannels,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPrefetch);
