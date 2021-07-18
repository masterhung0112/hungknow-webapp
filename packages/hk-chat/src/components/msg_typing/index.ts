// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import {makeGetUsersTypingByChannelAndPost} from 'hkclient-redux/selectors/entities/typing';

import MsgTyping from './msg_typing';

type Props = {
    channelId: string;
    postId: string;
};

function makeMapStateToProps() {
    const getUsersTypingByChannelAndPost = makeGetUsersTypingByChannelAndPost();

    return function mapStateToProps(state: GlobalState, ownProps: Props) {
        const typingUsers = getUsersTypingByChannelAndPost(state, {channelId: ownProps.channelId, postId: ownProps.postId});

        return {
            typingUsers,
        };
    };
}

export default connect(makeMapStateToProps)(MsgTyping);