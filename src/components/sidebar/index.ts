// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { fetchMyCategories } from 'hkclient-ts/lib/actions/channel_categories'
import { Preferences } from 'hkclient-ts/lib/constants'
import Permissions from 'hkclient-ts/lib/constants/permissions'
import { getCurrentChannelId } from 'hkclient-ts/lib/selectors/entities/channels'
import { getLicense } from 'hkclient-ts/lib/selectors/entities/general'
import { getBool } from 'hkclient-ts/lib/selectors/entities/preferences'
import { haveIChannelPermission } from 'hkclient-ts/lib/selectors/entities/roles'
import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'
import { GenericAction } from 'hkclient-ts/lib/types/actions'

import { createCategory, clearChannelSelection } from 'actions/views/channel_sidebar'
import { isUnreadFilterEnabled } from 'selectors/views/channel_sidebar'
import { openModal } from 'actions/views/modals'
import { GlobalState } from 'types/store'
import { getIsLhsOpen } from 'selectors/lhs'

import Sidebar from './sidebar'

function mapStateToProps(state: GlobalState) {
  const currentTeam = getCurrentTeam(state)
  const currentChannelId = getCurrentChannelId(state)
  const unreadFilterEnabled = isUnreadFilterEnabled(state)

  let canCreatePublicChannel = false
  let canCreatePrivateChannel = false
  let canJoinPublicChannel = false

  if (currentTeam) {
    canCreatePublicChannel = haveIChannelPermission(state, {
      channel: currentChannelId,
      team: currentTeam.id,
      permission: Permissions.CREATE_PUBLIC_CHANNEL,
    })
    canCreatePrivateChannel = haveIChannelPermission(state, {
      channel: currentChannelId,
      team: currentTeam.id,
      permission: Permissions.CREATE_PRIVATE_CHANNEL,
    })
    canJoinPublicChannel = haveIChannelPermission(state, {
      channel: currentChannelId,
      team: currentTeam.id,
      permission: Permissions.JOIN_PUBLIC_CHANNELS,
    })
  }

  return {
    teamId: currentTeam ? currentTeam.id : '',
    canCreatePrivateChannel,
    canCreatePublicChannel,
    canJoinPublicChannel,
    isOpen: getIsLhsOpen(state),
    hasSeenModal: getBool(
      state,
      Preferences.CATEGORY_WHATS_NEW_MODAL,
      Preferences.HAS_SEEN_SIDEBAR_WHATS_NEW_MODAL,
      false
    ),
    isCloud: getLicense(state).Cloud === 'true',
    unreadFilterEnabled,
  }
}

type Actions = {
  fetchMyCategories: (teamId: string) => { data: boolean }
  createCategory: (teamId: string, categoryName: string) => { data: string }
  openModal: (modalData: {
    modalId: string
    dialogType: React.Component
    dialogProps?: any
  }) => Promise<{
    data: boolean
  }>
  clearChannelSelection: () => void
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject, Actions>(
      {
        clearChannelSelection,
        createCategory,
        fetchMyCategories,
        openModal,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
