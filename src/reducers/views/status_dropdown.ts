// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {combineReducers} from 'redux';

import {ActionTypes} from 'utils/constants';

import {GenericAction} from 'hkclient-redux/types/actions';

export function isOpen(state = false, action: GenericAction) {
    switch (action.type) {
    case ActionTypes.STATUS_DROPDOWN_TOGGLE:
        return action.open;
    default:
        return state;
    }
}

export default combineReducers({
    isOpen,
});
