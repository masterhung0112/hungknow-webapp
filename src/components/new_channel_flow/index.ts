// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import Permissions from 'hkclient-ts/lib/constants/permissions'
import { getCurrentChannelId } from 'hkclient-ts/lib/selectors/entities/channels'
import { haveIChannelPermission } from 'hkclient-ts/lib/selectors/entities/roles'
import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'
import { ActionFunc, GenericAction } from 'hkclient-ts/lib/types/actions'
import { createChannel } from 'hkclient-ts/lib/actions/channels'
import { GlobalState } from 'hkclient-ts/lib/types/store'

import { switchToChannel } from 'actions/views/channel'
import { closeModal } from 'actions/views/modals'

import NewChannelFlow, { Props } from './new_channel_flow'

function mapStateToProps(state: GlobalState) {
  const currentTeam = getCurrentTeam(state)
  const currentChannelId = getCurrentChannelId(state)

  let canCreatePublicChannel = false
  let canCreatePrivateChannel = false

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
  }

  return {
    currentTeamId: currentTeam.id,
    canCreatePrivateChannel,
    canCreatePublicChannel,
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>(
      {
        createChannel,
        switchToChannel,
        closeModal,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChannelFlow)
