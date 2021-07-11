// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {addReaction} from 'actions/post_actions.jsx';

import {getChannel} from 'hkclient-redux/selectors/entities/channels';
import {makeGetReactionsForPost} from 'hkclient-redux/selectors/entities/posts';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {GlobalState} from 'hkclient-redux/types/store';
import {GenericAction} from 'hkclient-redux/types/actions';
import {Post} from 'hkclient-redux/types/posts';
import {Reaction} from 'hkclient-redux/types/reactions';

import ReactionList from './reaction_list';

type Props = {
    enableEmojiPicker: boolean;
    isReadOnly: boolean;
    post: Post;
    reactions: { [x: string]: Reaction } | undefined | null;
};

function makeMapStateToProps() {
    const getReactionsForPost = makeGetReactionsForPost();

    return function mapStateToProps(state: GlobalState, ownProps: Props) {
        const config = getConfig(state);
        const enableEmojiPicker = config.EnableEmojiPicker === 'true' && !ownProps.isReadOnly;

        const channel = getChannel(state, ownProps.post.channel_id) || {};
        const teamId = channel.team_id;

        return {
            teamId,
            reactions: getReactionsForPost(state, ownProps.post.id),
            enableEmojiPicker,
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            addReaction,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ReactionList);
