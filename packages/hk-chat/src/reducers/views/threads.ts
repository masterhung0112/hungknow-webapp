// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {combineReducers} from 'redux';

import {ViewsState} from 'types/store/views';

import {Threads} from 'utils/constants';

import {GenericAction} from 'hkclient-redux/types/actions';

export const selectedThreadIdInTeam = (state: ViewsState['threads']['selectedThreadIdInTeam'] | null = null, action: GenericAction) => {
    switch (action.type) {
    case Threads.CHANGED_SELECTED_THREAD:
        return {
            ...state,
            [action.data.team_id]: action.data.thread_id,
        };
    }
    return state;
};

export const lastViewedAt = (state: ViewsState['threads']['lastViewedAt'] | Record<string, unknown> = {}, action: GenericAction) => {
    switch (action.type) {
    case Threads.CHANGED_LAST_VIEWED_AT:
        return {
            ...state,
            [action.data.threadId]: action.data.lastViewedAt,
        };
    }
    return state;
};

export function manuallyUnread(state: ViewsState['threads']['manuallyUnread'] | Record<string, unknown> = {}, action: GenericAction) {
    switch (action.type) {
    case Threads.CHANGED_LAST_VIEWED_AT:
        return {
            ...state,
            [action.data.threadId]: false,
        };
    case Threads.MANUALLY_UNREAD_THREAD:
        return {
            ...state,
            [action.data.threadId]: true,
        };
    }
    return state;
}

export default combineReducers({
    selectedThreadIdInTeam,
    lastViewedAt,
    manuallyUnread,
});
