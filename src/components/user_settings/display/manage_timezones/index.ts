// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import { connect } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'

import { updateMe } from 'hkclient-ts/lib/actions/users'
import { ActionFunc, ActionResult } from 'hkclient-ts/lib/types/actions'
import { UserProfile } from 'hkclient-ts/lib/types/users'
import { getSupportedTimezones } from 'hkclient-ts/lib/selectors/entities/general'
import { GlobalState } from 'hkclient-ts/lib/types/store'

import ManageTimezones from './manage_timezones'

type Actions = {
  updateMe: (user: UserProfile) => Promise<ActionResult>
}
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        updateMe,
      },
      dispatch
    ),
  }
}
function mapStateToProps(state: GlobalState) {
  return {
    timezones: getSupportedTimezones(state),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageTimezones)
