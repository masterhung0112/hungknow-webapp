// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getFirstAdminVisitMarketplaceStatus } from 'hkclient-ts/lib/actions/general'
import { getFirstAdminVisitMarketplaceStatus as firstAdminVisitMarketplaceStatus } from 'hkclient-ts/lib/selectors/entities/general'
import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'
import { getCurrentUser } from 'hkclient-ts/lib/selectors/entities/users'
import { getInt } from 'hkclient-ts/lib/selectors/entities/preferences'

import { openModal } from 'actions/views/modals'

import { Preferences, TutorialSteps } from 'utils/constants'
import * as Utils from 'utils/utils.jsx'

import SidebarHeaderDropdown from './sidebar_header_dropdown.jsx'

function mapStateToProps(state) {
  const currentTeam = getCurrentTeam(state)
  const currentUser = getCurrentUser(state)
  const showTutorialTip =
    getInt(state, Preferences.TUTORIAL_STEP, currentUser.id) === TutorialSteps.MENU_POPOVER && !Utils.isMobile()

  return {
    currentUser,
    teamDescription: currentTeam.description,
    teamDisplayName: currentTeam.display_name,
    teamId: currentTeam.id,
    showTutorialTip,
    firstAdminVisitMarketplaceStatus: firstAdminVisitMarketplaceStatus(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        openModal,
        getFirstAdminVisitMarketplaceStatus,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeaderDropdown)
