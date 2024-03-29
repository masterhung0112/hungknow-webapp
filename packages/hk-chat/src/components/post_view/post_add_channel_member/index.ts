// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {addChannelMember} from 'hkclient-redux/actions/channels';
import {removePost} from 'hkclient-redux/actions/posts';
import {getPost} from 'hkclient-redux/selectors/entities/posts';
import {getChannel} from 'hkclient-redux/selectors/entities/channels';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {GlobalState} from 'hkclient-redux/types/store';
import {GenericAction} from 'hkclient-redux/types/actions';

import PostAddChannelMember from './post_add_channel_member';

type OwnProps = {
    postId: string;
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const post = getPost(state, ownProps.postId) || {};
    let channelType = '';
    if (post && post.channel_id) {
        const channel = getChannel(state, post.channel_id);
        if (channel && channel.type) {
            channelType = channel.type;
        }
    }

    return {
        channelType,
        currentUser: getCurrentUser(state),
        post,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            addChannelMember,
            removePost,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAddChannelMember);
