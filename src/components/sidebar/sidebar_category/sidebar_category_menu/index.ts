// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { Dispatch, bindActionCreators, ActionCreatorsMapObject } from 'redux'

import { setCategoryMuted, setCategorySorting } from 'hkclient-ts/lib/actions/channel_categories'
import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'
import { ActionFunc } from 'hkclient-ts/lib/types/actions'
import { CategorySorting } from 'hkclient-ts/lib/types/channel_categories'
import { GlobalState } from 'hkclient-ts/lib/types/store'

import { openModal } from 'actions/views/modals'

import SidebarCategoryMenu from './sidebar_category_menu'

function makeMapStateToProps() {
  return (state: GlobalState) => {
    const currentTeam = getCurrentTeam(state)

    return {
      currentTeamId: currentTeam.id,
    }
  }
}

type Actions = {
  openModal: (modalData: {
    modalId: string
    dialogType: React.Component
    dialogProps?: any
  }) => Promise<{
    data: boolean
  }>
  setCategoryMuted: (categoryId: string, muted: boolean) => Promise<void>
  setCategorySorting: (categoryId: string, sorting: CategorySorting) => void
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        openModal,
        setCategoryMuted,
        setCategorySorting,
      },
      dispatch
    ),
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(SidebarCategoryMenu)
