// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {getShortcutReactToLastPostEmittedFrom} from 'selectors/emojis';

import {emitShortcutReactToLastPostFrom} from 'actions/post_actions.jsx';

import {GlobalState} from 'types/store';

import {GenericAction} from 'hkclient-redux/types/actions';

import {Channel} from 'hkclient-redux/types/channels';
import {Post} from 'hkclient-redux/types/posts';

import PostListRow from './post_list_row';

type Props = {
    post: Post;
    channel: Channel;
}

function mapStateToProps(state: GlobalState, ownProps: Props) {
    const shortcutReactToLastPostEmittedFrom = getShortcutReactToLastPostEmittedFrom(state);

    return {
        post: ownProps.post,
        channel: ownProps.channel,
        shortcutReactToLastPostEmittedFrom,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            emitShortcutReactToLastPostFrom,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListRow);