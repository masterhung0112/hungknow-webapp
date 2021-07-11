// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import Post from 'components/post_view/post';

import {makeGenerateCombinedPost} from 'hkclient-redux/utils/post_list';

import {GlobalState} from 'hkclient-redux/types/store';

type Props = {
    combinedId: string;
}

export function makeMapStateToProps() {
    const generateCombinedPost = makeGenerateCombinedPost();

    return (state: GlobalState, ownProps: Props) => {
        return {
            post: generateCombinedPost(state, ownProps.combinedId),
            postId: ownProps.combinedId,
        };
    };
}

// Note that this also passes through Post's mapStateToProps
export default connect(makeMapStateToProps)(Post);
