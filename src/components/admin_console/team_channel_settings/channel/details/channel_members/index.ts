// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { Dictionary, UserIDMappedObjects } from 'hkclient-ts/lib/types/utilities'
import { ServerError } from 'hkclient-ts/lib/types/errors'
import { UserProfile, UsersStats, GetFilteredUsersStatsOpts } from 'hkclient-ts/lib/types/users'

import { filterProfilesStartingWithTerm, profileListToMap } from 'hkclient-ts/lib/utils/user_utils'

import { ActionResult, ActionFunc, GenericAction } from 'hkclient-ts/lib/types/actions'
import { Channel, ChannelMembership, ChannelStats } from 'hkclient-ts/lib/types/channels'

import { getChannelStats } from 'hkclient-ts/lib/actions/channels'
import { getFilteredUsersStats } from 'hkclient-ts/lib/actions/users'

import {
  getChannelMembersInChannels,
  getAllChannelStats,
  getChannel,
} from 'hkclient-ts/lib/selectors/entities/channels'
import {
  makeGetProfilesInChannel,
  makeSearchProfilesInChannel,
  filterProfiles,
  getFilteredUsersStats as selectFilteredUsersStats,
} from 'hkclient-ts/lib/selectors/entities/users'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'

import { loadProfilesAndReloadChannelMembers, searchProfilesAndChannelMembers } from 'actions/user_actions'
import { setUserGridSearch, setUserGridFilters } from 'actions/views/search'
import { GlobalState } from 'types/store'

import ChannelMembers from './channel_members'

type Props = {
  channelId: string
  usersToAdd: Dictionary<UserProfile>
  usersToRemove: Dictionary<UserProfile>
}

type Actions = {
  getChannelStats: (
    channelId: string
  ) => Promise<{
    data: boolean
  }>
  loadProfilesAndReloadChannelMembers: (
    page: number,
    perPage: number,
    channelId?: string,
    sort?: string,
    options?: { [key: string]: any }
  ) => Promise<{
    data: boolean
  }>
  searchProfilesAndChannelMembers: (
    term: string,
    options?: { [key: string]: any }
  ) => Promise<{
    data: boolean
  }>
  getFilteredUsersStats: (
    filters: GetFilteredUsersStatsOpts
  ) => Promise<{
    data?: UsersStats
    error?: ServerError
  }>
  setUserGridSearch: (term: string) => ActionResult
  setUserGridFilters: (filters: GetFilteredUsersStatsOpts) => ActionResult
}

function searchUsersToAdd(users: Dictionary<UserProfile>, term: string): Dictionary<UserProfile> {
  const profiles = filterProfilesStartingWithTerm(Object.values(users), term)
  const filteredProfilesMap = filterProfiles(profileListToMap(profiles), {})

  return filteredProfilesMap
}

function makeMapStateToProps() {
  const doGetProfilesInChannel = makeGetProfilesInChannel()
  const doSearchProfilesInChannel = makeSearchProfilesInChannel()

  return function mapStateToProps(state: GlobalState, props: Props) {
    const { channelId, usersToRemove } = props
    let { usersToAdd } = props

    const config = getConfig(state)
    const channelMembers =
      getChannelMembersInChannels(state)[channelId] || ({} as UserIDMappedObjects<ChannelMembership>)
    const channel = getChannel(state, channelId) || ({ id: channelId } as Channel)
    const searchTerm = state.views.search.userGridSearch?.term || ''
    const filters = state.views.search.userGridSearch?.filters || {}

    let totalCount: number
    if (Object.keys(filters).length === 0) {
      const stats: ChannelStats =
        getAllChannelStats(state)[channelId] ||
        ({
          member_count: 0,
          channel_id: channelId,
          pinnedpost_count: 0,
          guest_count: 0,
        } as ChannelStats)
      totalCount = stats.member_count
    } else {
      const filteredUserStats: UsersStats = selectFilteredUsersStats(state) || {
        total_users_count: 0,
      }
      totalCount = filteredUserStats.total_users_count
    }

    let users = []
    if (searchTerm) {
      users = doSearchProfilesInChannel(state, channelId, searchTerm, false, { ...filters, active: true })
      usersToAdd = searchUsersToAdd(usersToAdd, searchTerm)
    } else {
      users = doGetProfilesInChannel(state, channelId, { ...filters, active: true })
    }

    return {
      filters,
      channelId,
      channel,
      users,
      channelMembers,
      usersToAdd,
      usersToRemove,
      totalCount,
      searchTerm,
      enableGuestAccounts: config.EnableGuestAccounts === 'true',
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Actions>(
      {
        getChannelStats,
        loadProfilesAndReloadChannelMembers,
        searchProfilesAndChannelMembers,
        getFilteredUsersStats,
        setUserGridSearch,
        setUserGridFilters,
      },
      dispatch
    ),
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ChannelMembers)
