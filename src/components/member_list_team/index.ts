// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { getTeamStats, getTeamMembers } from 'hkclient-ts/lib/actions/teams'
import { GetTeamMembersOpts, TeamStats, TeamMembership } from 'hkclient-ts/lib/types/teams'
import { haveITeamPermission } from 'hkclient-ts/lib/selectors/entities/roles'
import { getMembersInCurrentTeam, getCurrentTeamStats } from 'hkclient-ts/lib/selectors/entities/teams'
import { getProfilesInCurrentTeam, searchProfilesInCurrentTeam } from 'hkclient-ts/lib/selectors/entities/users'
import { Permissions } from 'hkclient-ts/lib/constants'
import { searchProfiles } from 'hkclient-ts/lib/actions/users'
import { ActionFunc, GenericAction, ActionResult } from 'hkclient-ts/lib/types/actions'
import { UserProfile } from 'hkclient-ts/lib/types/users'

import { loadStatusesForProfilesList } from 'actions/status_actions.jsx'
import { loadProfilesAndTeamMembers, loadTeamMembersForProfilesList } from 'actions/user_actions.jsx'
import { setModalSearchTerm } from 'actions/views/search'

import { GlobalState } from 'types/store'

import MemberListTeam from './member_list_team'

type Props = {
  teamId: string
}

type Actions = {
  getTeamMembers: (
    teamId: string,
    page?: number,
    perPage?: number,
    options?: GetTeamMembersOpts
  ) => Promise<{ data: TeamMembership }>
  searchProfiles: (term: string, options?: { [key: string]: any }) => Promise<{ data: UserProfile[] }>
  getTeamStats: (teamId: string) => Promise<{ data: TeamStats }>
  loadProfilesAndTeamMembers: (
    page: number,
    perPage: number,
    teamId?: string,
    options?: { [key: string]: any }
  ) => Promise<{
    data: boolean
  }>
  loadStatusesForProfilesList: (
    users: UserProfile[]
  ) => Promise<{
    data: boolean
  }>
  loadTeamMembersForProfilesList: (
    profiles: any,
    teamId: string,
    reloadAllMembers: boolean
  ) => Promise<{
    data: boolean
  }>
  setModalSearchTerm: (term: string) => ActionResult
}

function mapStateToProps(state: GlobalState, ownProps: Props) {
  const canManageTeamMembers = haveITeamPermission(state, {
    team: ownProps.teamId,
    permission: Permissions.MANAGE_TEAM_ROLES,
  })

  const searchTerm = state.views.search.modalSearch

  let users
  if (searchTerm) {
    users = searchProfilesInCurrentTeam(state, searchTerm)
  } else {
    users = getProfilesInCurrentTeam(state)
  }

  const stats = getCurrentTeamStats(state) || { active_member_count: 0 }

  return {
    searchTerm,
    users,
    teamMembers: getMembersInCurrentTeam(state) || {},
    currentTeamId: state.entities.teams.currentTeamId,
    totalTeamMembers: stats.active_member_count,
    canManageTeamMembers,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Actions>(
      {
        searchProfiles,
        getTeamStats,
        getTeamMembers,
        loadProfilesAndTeamMembers,
        loadStatusesForProfilesList,
        loadTeamMembersForProfilesList,
        setModalSearchTerm,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberListTeam)
