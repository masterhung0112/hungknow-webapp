// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {combineReducers} from 'redux';

import {ActionTypes} from 'utils/constants';

import {TeamTypes} from 'hkclient-redux/action_types';

function isOpen(state = false, action) {
    switch (action.type) {
    case ActionTypes.TOGGLE_LHS:
        return !state;
    case ActionTypes.OPEN_LHS:
        return true;
    case ActionTypes.CLOSE_LHS:
        return false;
    case ActionTypes.TOGGLE_RHS_MENU:
        return false;
    case ActionTypes.OPEN_RHS_MENU:
        return false;
    case TeamTypes.SELECT_TEAM:
        return false;
    default:
        return state;
    }
}

export default combineReducers({
    isOpen,
});
