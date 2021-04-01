// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { searchAssociatedGroupsForReferenceLocal } from 'hkclient-ts/lib/selectors/entities/groups'
import { haveIChannelPermission } from 'hkclient-ts/lib/selectors/entities/roles'
import Permissions from 'hkclient-ts/lib/constants/permissions'

export function searchAssociatedGroupsForReference(prefix, teamId, channelId) {
  return async (dispatch, getState) => {
    const state = getState()
    if (
      !haveIChannelPermission(state, {
        permission: Permissions.USE_GROUP_MENTIONS,
        channel: channelId,
        team: teamId,
      })
    ) {
      return { data: [] }
    }
    return { data: searchAssociatedGroupsForReferenceLocal(state, prefix, teamId, channelId) }
  }
}
