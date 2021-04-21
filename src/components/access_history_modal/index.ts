// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { getUserAudits } from 'hkclient-ts/lib/actions/users'
import { getCurrentUserId, getUserAudits as getCurrentUserAudits } from 'hkclient-ts/lib/selectors/entities/users'
import { GenericAction } from 'hkclient-ts/lib/types/actions'

import { GlobalState } from 'types/store'

import AccessHistoryModal from './access_history_modal'

function mapStateToProps(state: GlobalState) {
  return {
    currentUserId: getCurrentUserId(state),
    userAudits: getCurrentUserAudits(state) || [],
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators(
      {
        getUserAudits,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessHistoryModal)
