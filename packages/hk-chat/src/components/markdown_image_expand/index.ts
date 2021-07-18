// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {bindActionCreators, Dispatch} from 'redux';

import {connect} from 'react-redux';

import {toggleInlineImageVisibility} from 'actions/post_actions';

import {isInlineImageVisible} from 'selectors/posts';

import {GlobalState} from 'hkclient-redux/types/store';

import {GenericAction} from 'hkclient-redux/types/actions';

import MarkdownImageExpand, {Props} from './markdown_image_expand';

const mapStateToProps = (state: GlobalState, {postId, imageKey}: Props) => {
    return {
        isExpanded: isInlineImageVisible(state, postId, imageKey),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<GenericAction>) => {
    return {
        actions: bindActionCreators({toggleInlineImageVisibility}, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownImageExpand);