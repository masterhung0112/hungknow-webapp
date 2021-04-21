// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { Client4 } from 'hkclient-ts/lib/client'
import { savePreferences } from 'hkclient-ts/lib/actions/preferences'
import { ActionFunc } from 'hkclient-ts/lib/types/actions'
import { PreferenceType } from 'hkclient-ts/lib/types/preferences'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { Channel } from 'hkclient-ts/lib/types/channels'
import { UserProfile } from 'hkclient-ts/lib/types/users'
import { getCurrentChannelId, getRedirectChannelNameForTeam } from 'hkclient-ts/lib/selectors/entities/channels'
import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'
import { getCurrentUser, getUser } from 'hkclient-ts/lib/selectors/entities/users'

import { leaveDirectChannel } from 'actions/views/channel'

import SidebarDirectChannel from './sidebar_direct_channel'

type OwnProps = {
  channel: Channel
  currentTeamName: string
}

/**
 * Gets the LHS bot icon url for a given botUser.
 */
function botIconImageUrl(botUser: UserProfile & { bot_last_icon_update?: number }) {
  if (!botUser) {
    return null
  }

  if (!(botUser.is_bot && botUser.bot_last_icon_update)) {
    return null
  }

  return `${Client4.getBotRoute(botUser.id)}/icon?_=${botUser.bot_last_icon_update || 0}`
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
  const teammate = getUser(state, ownProps.channel.teammate_id!)
  const currentUser = getCurrentUser(state)
  const currentTeam = getCurrentTeam(state)
  const redirectChannel = getRedirectChannelNameForTeam(state, currentTeam.id)
  const currentChannelId = getCurrentChannelId(state)
  const active = ownProps.channel.id === currentChannelId

  return {
    teammate,
    currentUserId: currentUser.id,
    redirectChannel,
    active,
    botIconUrl: botIconImageUrl(teammate),
  }
}

type Actions = {
  savePreferences: (
    userId: string,
    preferences: PreferenceType[]
  ) => Promise<{
    data: boolean
  }>
  leaveDirectChannel: (channelId: string) => Promise<{ data: boolean }>
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        savePreferences,
        leaveDirectChannel,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarDirectChannel)
