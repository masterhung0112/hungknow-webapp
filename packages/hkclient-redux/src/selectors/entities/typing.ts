// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

import {getCurrentChannelId, getUsers} from 'hkclient-redux/selectors/entities/common';
import {getTeammateNameDisplaySetting} from 'hkclient-redux/selectors/entities/preferences';

import {GlobalState} from 'hkclient-redux/types/store';
import {Typing} from 'hkclient-redux/types/typing';
import {UserProfile} from 'hkclient-redux/types/users';
import {IDMappedObjects} from 'hkclient-redux/types/utilities';

import {displayUsername} from 'hkclient-redux/utils/user_utils';

const getUsersTypingImpl = (profiles: IDMappedObjects<UserProfile>, teammateNameDisplay: string, channelId: string, parentPostId: string, typing: Typing): string[] => {
    const id = channelId + parentPostId;

    if (typing[id]) {
        const users = Object.keys(typing[id]);

        if (users.length) {
            return users.map((userId) => {
                return displayUsername(profiles[userId], teammateNameDisplay);
            });
        }
    }

    return [];
};

export function makeGetUsersTypingByChannelAndPost(): (state: GlobalState, props: {channelId: string; postId: string}) => string[] {
    return createSelector(
        'makeGetUsersTypingByChannelAndPost',
        getUsers,
        getTeammateNameDisplaySetting,
        (state: GlobalState, options: {channelId: string; postId: string}) => options.channelId,
        (state: GlobalState, options: {channelId: string; postId: string}) => options.postId,
        (state: GlobalState) => state.entities.typing,
        getUsersTypingImpl,
    );
}

export const getUsersTyping: (state: GlobalState) => string[] = createSelector(
    'getUsersTyping',
    getUsers,
    getTeammateNameDisplaySetting,
    getCurrentChannelId,
    (state) => state.entities.posts.selectedPostId,
    (state) => state.entities.typing,
    getUsersTypingImpl,
);