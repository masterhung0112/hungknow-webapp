// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {getSelectedChannel, getSelectedPost} from 'selectors/rhs';

import {selectPostCard} from 'actions/views/rhs';

import {GlobalState} from 'types/store';

import {makeGetPostsForThread} from 'hkclient-redux/selectors/entities/posts';
import {removePost, getPostThread} from 'hkclient-redux/actions/posts';
import {GenericAction} from 'hkclient-redux/types/actions';
import {Post} from 'hkclient-redux/types/posts';

import RhsThread from './rhs_thread';

function makeMapStateToProps() {
    const getPostsForThread = makeGetPostsForThread();

    return function mapStateToProps(state: GlobalState) {
        const selected = getSelectedPost(state);

        const channel = getSelectedChannel(state);
        let posts: Post[] = [];
        if (selected) {
            posts = getPostsForThread(state, {rootId: selected.id});
        }

        return {
            selected,
            channel,
            posts,
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            removePost,
            selectPostCard,
            getPostThread,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(RhsThread);
