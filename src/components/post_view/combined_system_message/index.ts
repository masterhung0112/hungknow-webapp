// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { getMissingProfilesByIds, getMissingProfilesByUsernames } from 'hkclient-ts/lib/actions/users'
import { Preferences } from 'hkclient-ts/lib/constants'
import { getBool } from 'hkclient-ts/lib/selectors/entities/preferences'
import { getCurrentUser, makeGetProfilesByIdsAndUsernames } from 'hkclient-ts/lib/selectors/entities/users'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { GenericAction } from 'hkclient-ts/lib/types/actions'

import CombinedSystemMessage, { Props } from './combined_system_message'

function makeMapStateToProps() {
  const getProfilesByIdsAndUsernames = makeGetProfilesByIdsAndUsernames()

  return (state: GlobalState, ownProps: Props) => {
    const currentUser = getCurrentUser(state)
    const { allUserIds, allUsernames } = ownProps

    return {
      currentUserId: currentUser.id,
      currentUsername: currentUser.username,
      showJoinLeave: getBool(
        state,
        Preferences.CATEGORY_ADVANCED_SETTINGS,
        Preferences.ADVANCED_FILTER_JOIN_LEAVE,
        true
      ),
      userProfiles: getProfilesByIdsAndUsernames(state, { allUserIds, allUsernames }),
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators(
      {
        getMissingProfilesByIds,
        getMissingProfilesByUsernames,
      },
      dispatch
    ),
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(CombinedSystemMessage)
