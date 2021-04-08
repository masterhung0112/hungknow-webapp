// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getTeammateNameDisplaySetting } from 'hkclient-ts/lib/selectors/entities/preferences'
import { getCurrentUserId, getUsersByUsername } from 'hkclient-ts/lib/selectors/entities/users'
import { getAllGroupsForReferenceByName } from 'hkclient-ts/lib/selectors/entities/groups'

import AtMention from './at_mention.jsx'

function mapStateToProps(state) {
  return {
    currentUserId: getCurrentUserId(state),
    teammateNameDisplay: getTeammateNameDisplaySetting(state),
    usersByUsername: getUsersByUsername(state),
    groupsByName: getAllGroupsForReferenceByName(state),
  }
}

export default connect(mapStateToProps)(AtMention)