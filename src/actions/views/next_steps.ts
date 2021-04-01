// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { savePreferences } from 'hkclient-ts/lib/actions/preferences'
import { getCurrentUserId } from 'hkclient-ts/lib/selectors/entities/users'
import { DispatchFunc, GetStateFunc } from 'hkclient-ts/lib/types/actions'

import { ActionTypes, Preferences, RecommendedNextSteps } from 'utils/constants'

export function setShowNextStepsView(show: boolean) {
  return {
    type: ActionTypes.SET_SHOW_NEXT_STEPS_VIEW,
    show,
  }
}

export const unhideNextSteps = () => {
  return async (dispatch: DispatchFunc, getState: GetStateFunc) => {
    const userId = getCurrentUserId(getState())

    dispatch(setShowNextStepsView(true))

    dispatch(
      savePreferences(userId, [
        {
          user_id: userId,
          category: Preferences.RECOMMENDED_NEXT_STEPS,
          name: RecommendedNextSteps.HIDE,
          value: 'false',
        },
      ])
    )
  }
}
