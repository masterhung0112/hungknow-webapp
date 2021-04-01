// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getConfig, getFirstAdminVisitMarketplaceStatus } from 'hkclient-ts/lib/selectors/entities/general'
import { getCurrentUser } from 'hkclient-ts/lib/selectors/entities/users'
import { getInt } from 'hkclient-ts/lib/selectors/entities/preferences'

import { Preferences, TutorialSteps } from 'utils/constants'
import * as Utils from 'utils/utils.jsx'

import SidebarHeader from './sidebar_header.jsx'

function mapStateToProps(state) {
  const config = getConfig(state)
  const currentUser = getCurrentUser(state)

  const enableTutorial = config.EnableTutorial === 'true'

  const showTutorialTip =
    getInt(state, Preferences.TUTORIAL_STEP, currentUser.id) === TutorialSteps.MENU_POPOVER && !Utils.isMobile()

  const firstAdminVisitMarketplaceStatus = getFirstAdminVisitMarketplaceStatus(state)

  return {
    enableTutorial,
    showTutorialTip,
    firstAdminVisitMarketplaceStatus,
  }
}

export default connect(mapStateToProps)(SidebarHeader)
