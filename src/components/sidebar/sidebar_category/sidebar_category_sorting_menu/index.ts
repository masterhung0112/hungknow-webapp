// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { setCategorySorting } from 'hkclient-ts/lib/actions/channel_categories'
import { savePreferences } from 'hkclient-ts/lib/actions/preferences'
import { GenericAction } from 'hkclient-ts/lib/types/actions'
import { getCurrentUserId } from 'hkclient-ts/lib/selectors/entities/users'
import { getInt } from 'hkclient-ts/lib/selectors/entities/preferences'
import { Preferences } from 'hkclient-ts/lib/constants'

import { GlobalState } from 'types/store'

import SidebarCategorySortingMenu from './sidebar_category_sorting_menu'

function mapStateToProps() {
  return (state: GlobalState) => {
    const selectedDmNumber = getInt(state, Preferences.CATEGORY_SIDEBAR_SETTINGS, Preferences.LIMIT_VISIBLE_DMS_GMS, 20)

    return {
      selectedDmNumber,
      currentUserId: getCurrentUserId(state),
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators(
      {
        setCategorySorting,
        savePreferences,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCategorySortingMenu)
