// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {createPost} from 'actions/post_actions';

import {removePost} from 'hkclient-redux/actions/posts';
import {GenericAction} from 'hkclient-redux/types/actions';

import FailedPostOptions from './failed_post_options';

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            createPost,
            removePost,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(FailedPostOptions);