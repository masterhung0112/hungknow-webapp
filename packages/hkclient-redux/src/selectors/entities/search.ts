// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

import {getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';
import {getCurrentUserMentionKeys} from 'hkclient-redux/selectors/entities/users';
import {getMyGroupMentionKeys} from 'hkclient-redux/selectors/entities/groups';

import {GlobalState} from 'hkclient-redux/types/store';

import {UserMentionKey} from './users';
export const getCurrentSearchForCurrentTeam: (state: GlobalState) => string = createSelector(
    'getCurrentSearchForCurrentTeam',
    (state: GlobalState) => state.entities.search.current,
    getCurrentTeamId,
    (current, teamId) => {
        return current[teamId];
    },
);

export const getAllUserMentionKeys: (state: GlobalState) => UserMentionKey[] = createSelector(
    'getAllUserMentionKeys',
    getCurrentUserMentionKeys,
    getMyGroupMentionKeys,
    (userMentionKeys, groupMentionKeys) => {
        return userMentionKeys.concat(groupMentionKeys);
    },
);
