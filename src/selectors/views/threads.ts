// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

import {$ID} from 'hkclient-redux/types/utilities';
import {Post} from 'hkclient-redux/types/posts';
import {getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';
import {getThreads} from 'hkclient-redux/selectors/entities/threads';

import {Team} from 'hkclient-redux/types/teams';
import {UserThread} from 'hkclient-redux/types/threads';

import {GlobalState} from 'types/store';
import {ViewsState} from 'types/store/views';
import {getIsRhsOpen, getSelectedPostId} from 'selectors/rhs';

export function getSelectedThreadIdInTeam(state: GlobalState) {
    return state.views.threads.selectedThreadIdInTeam;
}

export const getSelectedThreadIdInCurrentTeam: (state: GlobalState) => ViewsState['threads']['selectedThreadIdInTeam'][$ID<Team>] = createSelector(
    'getSelectedThreadIdInCurrentTeam',
    getCurrentTeamId,
    getSelectedThreadIdInTeam,
    (
        currentTeamId,
        selectedThreadIdInTeam,
    ) => {
        return selectedThreadIdInTeam?.[currentTeamId] ?? null;
    },
);

export const getSelectedThreadInCurrentTeam: (state: GlobalState) => UserThread | null = createSelector(
    'getSelectedThreadInCurrentTeam',
    getCurrentTeamId,
    getSelectedThreadIdInTeam,
    getThreads,
    (
        currentTeamId,
        selectedThreadIdInTeam,
        threads,
    ) => {
        const threadId = selectedThreadIdInTeam?.[currentTeamId];
        return threadId ? threads[threadId] : null;
    },
);

export function makeGetThreadLastViewedAt(): (state: GlobalState, threadId: $ID<Post>) => number {
    return createSelector(
        'makeGetThreadLastViewedAt',
        (state: GlobalState, threadId: $ID<Post>) => state.views.threads.lastViewedAt[threadId],
        getThreads,
        (_state, threadId) => threadId,
        (lastViewedAt, threads, threadId) => {
            if (typeof lastViewedAt === 'number') {
                return lastViewedAt;
            }

            return threads[threadId]?.last_viewed_at;
        },
    );
}

export const isThreadOpen = (state: GlobalState, threadId: $ID<UserThread>): boolean => {
    return (
        threadId === getSelectedThreadIdInCurrentTeam(state) ||
        (getIsRhsOpen(state) && threadId === getSelectedPostId(state))
    );
};

export const isThreadManuallyUnread = (state: GlobalState, threadId: $ID<UserThread>): boolean => {
    return state.views.threads.manuallyUnread[threadId] || false;
};
