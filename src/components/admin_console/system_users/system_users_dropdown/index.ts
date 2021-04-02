// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { ActionFunc } from 'hkclient-ts/lib/types/actions'

import {
  updateUserActive,
  revokeAllSessionsForUser,
  promoteGuestToUser,
  demoteUserToGuest,
} from 'hkclient-ts/lib/actions/users'
import { getCurrentUser } from 'hkclient-ts/lib/selectors/entities/users'
import { getExternalBotAccounts } from 'hkclient-ts/lib/selectors/entities/bots'
import { loadBots } from 'hkclient-ts/lib/actions/bots'

import { getLicense } from 'hkclient-ts/lib/selectors/entities/general'

import * as Selectors from 'hkclient-ts/lib/selectors/entities/admin'

import { GlobalState } from 'types/store'

import SystemUsersDropdown, { Props } from './system_users_dropdown'
import { adminResetMfa } from 'actions/admin_actions.jsx'

function mapStateToProps(state: GlobalState) {
  const bots = getExternalBotAccounts(state)
  const license = getLicense(state)
  return {
    isLicensed: license && license.IsLicensed === 'true',
    config: Selectors.getConfig(state),
    currentUser: getCurrentUser(state),
    bots,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>(
      {
        updateUserActive,
        revokeAllSessionsForUser,
        promoteGuestToUser,
        demoteUserToGuest,
        loadBots,
        adminResetMfa,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemUsersDropdown)
