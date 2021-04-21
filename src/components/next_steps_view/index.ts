// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { savePreferences } from 'hkclient-ts/lib/actions/preferences'
import { getProfiles } from 'hkclient-ts/lib/actions/users'
import { makeGetCategory } from 'hkclient-ts/lib/selectors/entities/preferences'
import { getCurrentUser, isCurrentUserSystemAdmin } from 'hkclient-ts/lib/selectors/entities/users'
import { getTeam, getCurrentTeamId } from 'hkclient-ts/lib/selectors/entities/teams'

import { setShowNextStepsView } from 'actions/views/next_steps'
import { closeRightHandSide } from 'actions/views/rhs'
import { GlobalState } from 'types/store'
import { Preferences } from 'utils/constants'

import { getSteps, isFirstAdmin } from './steps'

import NextStepsView from './next_steps_view'

function makeMapStateToProps() {
  const getCategory = makeGetCategory()

  return (state: GlobalState) => {
    const teamId = getCurrentTeamId(state)
    const team = getTeam(state, teamId || '')
    return {
      currentUser: getCurrentUser(state),
      isAdmin: isCurrentUserSystemAdmin(state),
      preferences: getCategory(state, Preferences.RECOMMENDED_NEXT_STEPS),
      steps: getSteps(state),
      isFirstAdmin: isFirstAdmin(state),
      team,
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(
      {
        savePreferences,
        setShowNextStepsView,
        getProfiles,
        closeRightHandSide,
      },
      dispatch
    ),
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(NextStepsView)
