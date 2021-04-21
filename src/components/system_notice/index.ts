// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators, Dispatch } from 'redux'

import { makeGetCategory } from 'hkclient-ts/lib/selectors/entities/preferences'
import { getConfig, getLicense } from 'hkclient-ts/lib/selectors/entities/general'
import { haveISystemPermission } from 'hkclient-ts/lib/selectors/entities/roles'
import { savePreferences } from 'hkclient-ts/lib/actions/preferences'
import { Permissions } from 'hkclient-ts/lib/constants'
import { getStandardAnalytics } from 'hkclient-ts/lib/actions/admin'

import { PreferenceType } from 'hkclient-ts/lib/types/preferences'

import { Preferences } from 'utils/constants'

import { dismissNotice } from 'actions/views/notice'

import Notices from 'components/system_notice/notices'
import SystemNotice from 'components/system_notice/system_notice'
import { GlobalState } from 'types/store'

function makeMapStateToProps() {
  const getCategory = makeGetCategory()

  const getPreferenceNameMap = createSelector(getCategory, (preferences) => {
    const nameMap: { [key: string]: PreferenceType } = {}
    preferences.forEach((p) => {
      nameMap[p.name] = p
    })
    return nameMap
  })

  return function mapStateToProps(state: GlobalState) {
    const license = getLicense(state)
    const config = getConfig(state)
    const serverVersion = state.entities.general.serverVersion
    const analytics = state.entities.admin.analytics

    return {
      currentUserId: state.entities.users.currentUserId,
      preferences: getPreferenceNameMap(state, Preferences.CATEGORY_SYSTEM_NOTICE),
      dismissedNotices: state.views.notice.hasBeenDismissed,
      isSystemAdmin: haveISystemPermission(state, { permission: Permissions.MANAGE_SYSTEM }),
      notices: Notices,
      config,
      license,
      serverVersion,
      analytics,
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(
      {
        savePreferences,
        dismissNotice,
        getStandardAnalytics,
      },
      dispatch
    ),
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(SystemNotice)
