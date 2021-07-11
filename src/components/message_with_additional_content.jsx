// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import PostBodyAdditionalContent from 'components/post_view/post_body_additional_content';
import PostMessageView from 'components/post_view/post_message_view';

import {Posts} from 'hkclient-redux/constants';

export default function MessageWithAdditionalContent({post, previewCollapsed, previewEnabled, isEmbedVisible, pluginPostTypes}) {
    const hasPlugin = post.type && pluginPostTypes.hasOwnProperty(post.type);
    let msg;
    const messageWrapper = (
        <PostMessageView
            post={post}
            isRHS={true}
            hasMention={true}
        />
    );
    if (post.state === Posts.POST_DELETED || hasPlugin) {
        msg = messageWrapper;
    } else {
        msg = (
            <PostBodyAdditionalContent
                post={post}
                previewCollapsed={previewCollapsed}
                previewEnabled={previewEnabled}
                isEmbedVisible={isEmbedVisible}
            >
                {messageWrapper}
            </PostBodyAdditionalContent>
        );
    }
    return msg;
}
