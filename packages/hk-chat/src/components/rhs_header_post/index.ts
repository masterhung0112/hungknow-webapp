// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ComponentProps} from 'react';
import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import {
    setRhsExpanded,
    showMentions,
    showSearchResults,
    showFlaggedPosts,
    showPinnedPosts,
    showChannelFiles,
    closeRightHandSide,
    toggleRhsExpanded,
} from 'actions/views/rhs';

import {getIsRhsExpanded} from 'selectors/rhs';

import {isCollapsedThreadsEnabled} from 'hkclient-redux/selectors/entities/preferences';

import {getCurrentTeamId, getCurrentRelativeTeamUrl} from 'hkclient-redux/selectors/entities/teams';
import {getCurrentUserId} from 'hkclient-redux/selectors/entities/users';

import {setThreadFollow} from 'hkclient-redux/actions/threads';
import {getThreadOrSynthetic} from 'hkclient-redux/selectors/entities/threads';
import {getPost} from 'hkclient-redux/selectors/entities/posts';

import RhsHeaderPost from './rhs_header_post';

type OwnProps = Pick<ComponentProps<typeof RhsHeaderPost>, 'rootPostId'>

function mapStateToProps(state: GlobalState, {rootPostId}: OwnProps) {
    return {
        isExpanded: getIsRhsExpanded(state),
        relativeTeamUrl: getCurrentRelativeTeamUrl(state),
        currentTeamId: getCurrentTeamId(state),
        currentUserId: getCurrentUserId(state),
        isCollapsedThreadsEnabled: isCollapsedThreadsEnabled(state),
        isFollowingThread: isCollapsedThreadsEnabled(state) && getThreadOrSynthetic(state, getPost(state, rootPostId)).is_following,
    };
}

const actions = {
    setRhsExpanded,
    showSearchResults,
    showMentions,
    showFlaggedPosts,
    showPinnedPosts,
    showChannelFiles,
    closeRightHandSide,
    toggleRhsExpanded,
    setThreadFollow,
};

export default connect(mapStateToProps, actions)(RhsHeaderPost);
