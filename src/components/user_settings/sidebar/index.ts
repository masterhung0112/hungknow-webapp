// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { savePreferences } from 'hkclient-ts/lib/actions/preferences'
import { Preferences } from 'hkclient-ts/lib/constants'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { get as getPreference, getSidebarPreferences } from 'hkclient-ts/lib/selectors/entities/preferences'
import { getCurrentUser } from 'hkclient-ts/lib/selectors/entities/users'
import { GlobalState } from 'hkclient-ts/lib/types/store'

import UserSettingsSidebar from './user_settings_sidebar'

function mapStateToProps(state: GlobalState) {
  const config = getConfig(state)

  const closeUnusedDirectMessages = getPreference(
    state,
    Preferences.CATEGORY_SIDEBAR_SETTINGS,
    'close_unused_direct_messages',
    'after_seven_days'
  )

  const channelSwitcherOption = getPreference(
    state,
    Preferences.CATEGORY_SIDEBAR_SETTINGS,
    'channel_switcher_section',
    'true'
  )

  const sidebarPreference = getSidebarPreferences(state)

  return {
    closeUnusedDirectMessages,
    sidebarPreference,
    unreadsAtTop: sidebarPreference.unreads_at_top,
    favoriteAtTop: sidebarPreference.favorite_at_top,
    channelSwitcherOption,
    showChannelOrganization: config.ExperimentalChannelOrganization === 'true',
    showUnusedOption: config.CloseUnusedDirectMessages === 'true',
    user: getCurrentUser(state),
    enableLegacySidebar: config.EnableLegacySidebar === 'true',
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(
      {
        savePreferences,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsSidebar)
