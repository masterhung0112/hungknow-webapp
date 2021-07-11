// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import CommentIcon from 'components/common/comment_icon';

import {getPost, makeGetCommentCountForPost} from 'hkclient-redux/selectors/entities/posts';
import {isCollapsedThreadsEnabled} from 'hkclient-redux/selectors/entities/preferences';

type OwnProps = {
    postId: string;
}

function makeMapStateToProps() {
    const getReplyCount = makeGetCommentCountForPost();

    return (state: GlobalState, ownProps: OwnProps) => {
        const post = getPost(state, ownProps.postId);

        const collapsedThreadsEnabled = isCollapsedThreadsEnabled(state);

        return {
            commentCount: collapsedThreadsEnabled ? 0 : getReplyCount(state, post),
        };
    };
}

export default connect(makeMapStateToProps)(CommentIcon);
