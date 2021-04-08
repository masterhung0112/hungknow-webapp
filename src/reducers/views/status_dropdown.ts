// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import { combineReducers } from 'redux'

import { GenericAction } from 'hkclient-ts/lib/types/actions'

import { ActionTypes } from 'utils/constants'

export function isOpen(state = false, action: GenericAction) {
  switch (action.type) {
    case ActionTypes.STATUS_DROPDOWN_TOGGLE:
      return action.open
    default:
      return state
  }
}

export default combineReducers({
  isOpen,
})