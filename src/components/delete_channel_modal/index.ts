// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import { deleteChannel } from 'hkclient-ts/lib/actions/channels'
import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { ActionFunc } from 'hkclient-ts/lib/types/actions'

import DeleteChannelModal from './delete_channel_modal'

function mapStateToProps(state: GlobalState) {
  const config = getConfig(state)

  return {
    canViewArchivedChannels: config.ExperimentalViewArchivedChannels === 'true',
    currentTeamDetails: getCurrentTeam(state),
  }
}

type Actions = {
  deleteChannel: (channelId: string) => { data: true }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        deleteChannel,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteChannelModal)
