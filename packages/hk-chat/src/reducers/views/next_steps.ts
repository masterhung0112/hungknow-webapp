// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {combineReducers} from 'redux';

import {ActionTypes} from 'utils/constants';

import {GenericAction} from 'hkclient-redux/types/actions';
import {UserTypes} from 'hkclient-redux/action_types';

export function show(state = false, action: GenericAction) {
    switch (action.type) {
    case ActionTypes.SET_SHOW_NEXT_STEPS_VIEW:
        return action.show;

    case UserTypes.LOGOUT_SUCCESS:
        return true;
    default:
        return state;
    }
}

export default combineReducers({
    show,
});
