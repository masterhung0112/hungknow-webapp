// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'

import {
  getGroupsNotAssociatedToChannel,
  linkGroupSyncable,
  getAllGroupsAssociatedToChannel,
  getAllGroupsAssociatedToTeam,
} from 'hkclient-ts/lib/actions/groups'
import { getTeam } from 'hkclient-ts/lib/actions/teams'
import { getGroupsNotAssociatedToChannel as selectGroupsNotAssociatedToChannel } from 'hkclient-ts/lib/selectors/entities/groups'
import { getCurrentChannel } from 'hkclient-ts/lib/selectors/entities/channels'

import { Channel } from 'hkclient-ts/lib/types/channels'
import { ActionFunc, GenericAction } from 'hkclient-ts/lib/types/actions'
import { Group } from 'hkclient-ts/lib/types/groups'

import { GlobalState } from 'types/store'
import { setModalSearchTerm } from 'actions/views/search'

import AddGroupsToChannelModal, { Props } from './add_groups_to_channel_modal'

type OwnProps = {
  channel: Channel
  skipCommit: boolean
  onAddCallback: (groupIDs: string[]) => void
  excludeGroups: Group[]
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
  const searchTerm = state.views.search.modalSearch

  const channel = ownProps.channel || getCurrentChannel(state) || {}

  let groups = selectGroupsNotAssociatedToChannel(state, channel.id, channel.team_id)
  if (searchTerm) {
    const regex = RegExp(searchTerm, 'i')
    groups = groups.filter((group) => regex.test(group.display_name) || regex.test(group.name))
  }

  return {
    currentChannelName: channel.display_name,
    currentChannelId: channel.id,
    skipCommit: ownProps.skipCommit,
    onAddCallback: ownProps.onAddCallback,
    excludeGroups: ownProps.excludeGroups,
    searchTerm,
    groups,
    teamID: channel.team_id,
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Props['actions']>(
      {
        getGroupsNotAssociatedToChannel,
        setModalSearchTerm,
        linkGroupSyncable,
        getAllGroupsAssociatedToChannel,
        getTeam,
        getAllGroupsAssociatedToTeam,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupsToChannelModal)
