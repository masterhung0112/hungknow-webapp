// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { memoizeResult } from 'hkclient-ts/lib/utils/helpers'
import { UserProfile } from 'hkclient-ts/lib/types/users'
import { ActionResult, GenericAction, ActionFunc } from 'hkclient-ts/lib/types/actions'

import { filterProfilesStartingWithTerm, profileListToMap } from 'hkclient-ts/lib/utils/user_utils'

import { filterProfiles } from 'hkclient-ts/lib/selectors/entities/users'
import { getMembersInTeams } from 'hkclient-ts/lib/selectors/entities/teams'
import { getChannelMembersInChannels } from 'hkclient-ts/lib/selectors/entities/channels'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'

import { GlobalState } from 'types/store'
import { loadChannelMembersForProfilesList, loadTeamMembersForProfilesList } from 'actions/user_actions.jsx'
import { setModalSearchTerm, setModalFilters } from 'actions/views/search'

import UsersToRemove, { Filters, Memberships } from './users_to_remove'

type Props = {
  members: UserProfile[]
  scope: 'team' | 'channel'
  scopeId: string
  total: number
}

type Actions = {
  loadTeamMembersForProfilesList: (
    profiles: UserProfile[],
    id: string,
    reloadAllMembers?: boolean
  ) => Promise<{
    data: boolean
  }>
  loadChannelMembersForProfilesList: (
    profiles: UserProfile[],
    id: string,
    reloadAllMembers?: boolean
  ) => Promise<{
    data: boolean
  }>
  setModalSearchTerm: (term: string) => ActionResult
  setModalFilters: (filters: Filters) => ActionResult
}

function makeMapStateToProps() {
  const searchUsers = memoizeResult(
    (users: UserProfile[], term: string, filters: Filters, memberships: Memberships) => {
      let profiles = users
      if (term !== '') {
        profiles = filterProfilesStartingWithTerm(users, term)
      }

      if (Object.keys(filters).length > 0) {
        const filteredProfilesMap = filterProfiles(profileListToMap(profiles), filters, memberships)
        profiles = Object.keys(filteredProfilesMap).map((key) => filteredProfilesMap[key])
      }

      return profiles
    }
  )

  return (state: GlobalState, props: Props) => {
    const { scope, scopeId } = props
    let { members, total } = props

    const searchTerm = state.views.search.modalSearch || ''
    const filters = state.views.search.modalFilters || {}

    let memberships = {}
    if (scope === 'channel') {
      memberships = getChannelMembersInChannels(state)[scopeId] || {}
    } else if (scope === 'team') {
      memberships = getMembersInTeams(state)[scopeId] || {}
    }

    if (searchTerm || Object.keys(filters).length > 0) {
      members = searchUsers(members, searchTerm, filters, memberships)
      total = members.length
    }

    const enableGuestAccounts = getConfig(state)?.EnableGuestAccounts === 'true'

    return {
      ...props,
      members,
      total,
      searchTerm,
      scope,
      memberships,
      enableGuestAccounts,
      filters,
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Actions>(
      {
        loadChannelMembersForProfilesList,
        loadTeamMembersForProfilesList,
        setModalSearchTerm,
        setModalFilters,
      },
      dispatch
    ),
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(UsersToRemove)
