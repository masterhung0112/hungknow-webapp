// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {Preferences} from 'utils/constants';

import {getSocketStatus} from 'selectors/views/websocket';

import {getHighlightedPostId} from 'selectors/rhs';

import {makeGetThreadLastViewedAt} from 'selectors/views/threads';

import {selectPostCard} from 'actions/views/rhs';

import {updateThreadLastOpened} from 'actions/views/threads';

import {GlobalState} from 'types/store';

import {getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';
import {getCurrentUserId} from 'hkclient-redux/selectors/entities/users';
import {makeGetPostsForThread, getPost} from 'hkclient-redux/selectors/entities/posts';
import {getChannel, getDirectTeammate} from 'hkclient-redux/selectors/entities/channels';
import {getThread} from 'hkclient-redux/selectors/entities/threads';
import {get, getBool, isCollapsedThreadsEnabled} from 'hkclient-redux/selectors/entities/preferences';
import {removePost, getPostThread} from 'hkclient-redux/actions/posts';
import {getThread as fetchThread, updateThreadRead} from 'hkclient-redux/actions/threads';
import {GenericAction} from 'hkclient-redux/types/actions';
import {Post} from 'hkclient-redux/types/posts';
import {UserThread} from 'hkclient-redux/types/threads';

import ThreadViewer from './thread_viewer';

type OwnProps = {
    rootPostId: string;
};

function makeMapStateToProps() {
    const getPostsForThread = makeGetPostsForThread();
    const getThreadLastViewedAt = makeGetThreadLastViewedAt();

    return function mapStateToProps(state: GlobalState, {rootPostId}: OwnProps) {
        const currentUserId = getCurrentUserId(state);
        const currentTeamId = getCurrentTeamId(state);
        const selected = getPost(state, rootPostId);
        const channel = getChannel(state, selected?.channel_id);
        const socketStatus = getSocketStatus(state);
        const highlightedPostId = getHighlightedPostId(state);

        let posts: Post[] = [];
        let lastViewedAt;
        let userThread: UserThread | null = null;
        if (selected) {
            posts = getPostsForThread(state, {rootId: selected.id});
            userThread = getThread(state, selected.id);
            lastViewedAt = getThreadLastViewedAt(state, selected.id);
        }

        const previewCollapsed = get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.COLLAPSE_DISPLAY, Preferences.COLLAPSE_DISPLAY_DEFAULT);

        return {
            isCollapsedThreadsEnabled: isCollapsedThreadsEnabled(state),
            currentUserId,
            currentTeamId,
            userThread,
            selected,
            channel,
            posts,
            socketConnectionStatus: socketStatus.connected,
            previewCollapsed,
            previewEnabled: getBool(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.LINK_PREVIEW_DISPLAY, Preferences.LINK_PREVIEW_DISPLAY_DEFAULT === 'true'),
            directTeammate: getDirectTeammate(state, channel?.id),
            highlightedPostId,
            lastViewedAt,
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            removePost,
            getPostThread,
            selectPostCard,
            getThread: fetchThread,
            updateThreadRead,
            updateThreadLastOpened,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ThreadViewer);
