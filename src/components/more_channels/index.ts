// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'
import { createSelector } from 'reselect'

import { RequestStatus } from 'hkclient-ts/lib/constants'
import { Channel } from 'hkclient-ts/lib/types/channels'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { ActionFunc, ActionResult } from 'hkclient-ts/lib/types/actions'
import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'
import { getCurrentUserId } from 'hkclient-ts/lib/selectors/entities/users'
import { getChannels, getArchivedChannels, joinChannel } from 'hkclient-ts/lib/actions/channels'
import { getOtherChannels, getChannelsInCurrentTeam } from 'hkclient-ts/lib/selectors/entities/channels'

import { searchMoreChannels } from 'actions/channel_actions.jsx'
import { openModal, closeModal } from 'actions/views/modals'

import { GlobalState } from '../../types/store'

import MoreChannels from './more_channels'
import { Team } from 'hkclient-ts/lib/types/teams'

const getNotArchivedOtherChannels = createSelector(
  getOtherChannels,
  (channels: Channel[]) => channels && channels.filter((c) => c.delete_at === 0)
)

const getArchivedOtherChannels = createSelector(
  getChannelsInCurrentTeam,
  (channels: Channel[]) => channels && channels.filter((c) => c.delete_at !== 0)
)

function mapStateToProps(state: GlobalState) {
  const team = getCurrentTeam(state) || {} as Team

  return {
    channels: getNotArchivedOtherChannels(state) || [],
    archivedChannels: getArchivedOtherChannels(state) || [],
    currentUserId: getCurrentUserId(state),
    teamId: team.id,
    teamName: team.name,
    channelsRequestStarted: state.requests.channels.getChannels.status === RequestStatus.STARTED,
    canShowArchivedChannels: getConfig(state).ExperimentalViewArchivedChannels === 'true',
  }
}

type Actions = {
  getChannels: (teamId: string, page: number, perPage: number) => ActionFunc | void
  getArchivedChannels: (teamId: string, page: number, channelsPerPage: number) => ActionFunc | void
  joinChannel: (currentUserId: string, teamId: string, channelId: string) => Promise<ActionResult>
  searchMoreChannels: (term: string, shouldShowArchivedChannels: boolean) => Promise<ActionResult>
  openModal: (modalData: {
    modalId: string
    dialogType: any
    dialogProps?: any
  }) => Promise<{
    data: boolean
  }>
  closeModal: (modalId: string) => void
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        getChannels,
        getArchivedChannels,
        joinChannel,
        searchMoreChannels,
        openModal,
        closeModal,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreChannels)
