// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getCurrentUserId } from 'hkclient-ts/lib/selectors/entities/users'
import { getInt } from 'hkclient-ts/lib/selectors/entities/preferences'
import { savePreferences } from 'hkclient-ts/lib/actions/preferences'

import { Preferences } from 'utils/constants'

import TutorialIntroScreens from './tutorial_intro_screens.jsx'

function mapStateToProps(state) {
  const currentUserId = getCurrentUserId(state)
  return {
    currentUserId,
    step: getInt(state, Preferences.TUTORIAL_STEP, currentUserId, 0),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        savePreferences,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorialIntroScreens)