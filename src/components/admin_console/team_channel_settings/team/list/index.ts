// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'
import { createSelector } from 'reselect'

import { getTeams as fetchTeams, searchTeams } from 'hkclient-ts/lib/actions/teams'
import { getTeams } from 'hkclient-ts/lib/selectors/entities/teams'

import { ActionFunc } from 'hkclient-ts/lib/types/actions'

import { TeamSearchOpts, TeamsWithCount } from 'hkclient-ts/lib/types/teams'

import { GlobalState } from 'types/store'

import TeamList from './team_list'

type Actions = {
  searchTeams(term: string, opts: TeamSearchOpts): Promise<{ data: TeamsWithCount }>
  getData(page: number, size: number): void
}
const getSortedListOfTeams = createSelector(getTeams, (teams) =>
  Object.values(teams).sort((a, b) => a.display_name.localeCompare(b.display_name))
)

function mapStateToProps(state: GlobalState) {
  return {
    data: getSortedListOfTeams(state),
    total: state.entities.teams.totalCount || 0,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        getData: (page: number, pageSize: number) => fetchTeams(page, pageSize, true),
        searchTeams,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)