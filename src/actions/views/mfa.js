// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import * as UserActions from 'hkclient-ts/lib/actions/users'
import { getCurrentUserId } from 'hkclient-ts/lib/selectors/entities/users'

export function activateMfa(code) {
  return (dispatch, getState) => {
    const currentUserId = getCurrentUserId(getState())

    return dispatch(UserActions.updateUserMfa(currentUserId, true, code))
  }
}

export function deactivateMfa() {
  return (dispatch, getState) => {
    const currentUserId = getCurrentUserId(getState())

    return dispatch(UserActions.updateUserMfa(currentUserId, false))
  }
}

export function generateMfaSecret() {
  return (dispatch, getState) => {
    const currentUserId = getCurrentUserId(getState())

    return dispatch(UserActions.generateMfaSecret(currentUserId))
  }
}
