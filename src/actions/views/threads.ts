// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {batchActions} from 'redux-batched-actions';

import {browserHistory} from 'utils/browser_history';

import {GlobalState} from 'types/store';
import {Threads} from 'utils/constants';

import {GetStateFunc, DispatchFunc} from 'hkclient-redux/types/actions';
import {getCurrentRelativeTeamUrl} from 'hkclient-redux/selectors/entities/teams';

export function updateThreadLastOpened(threadId: string, lastViewedAt: number) {
    return {
        type: Threads.CHANGED_LAST_VIEWED_AT,
        data: {
            threadId,
            lastViewedAt,
        },
    };
}

export function setSelectedThreadId(teamId: string, threadId: string | undefined) {
    return {
        type: Threads.CHANGED_SELECTED_THREAD,
        data: {
            thread_id: threadId,
            team_id: teamId,
        },
    };
}

export function manuallyMarkThreadAsUnread(threadId: string, lastViewedAt: number) {
    return batchActions([
        updateThreadLastOpened(threadId, lastViewedAt),
        {
            type: Threads.MANUALLY_UNREAD_THREAD,
            data: {threadId},
        },
    ]);
}

export function switchToGlobalThreads() {
    return (_dispatch: DispatchFunc, getState: GetStateFunc) => {
        const state = getState() as GlobalState;
        const teamUrl = getCurrentRelativeTeamUrl(state);
        browserHistory.push(`${teamUrl}/threads`);

        return {data: true};
    };
}
