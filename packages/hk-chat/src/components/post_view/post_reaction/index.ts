// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {addReaction} from 'actions/post_actions.jsx';

import {GenericAction} from 'hkclient-redux/types/actions';

import PostReaction from './post_reaction';

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            addReaction,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(PostReaction);