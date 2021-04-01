// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'

import {
  getGroupsNotAssociatedToTeam,
  linkGroupSyncable,
  getAllGroupsAssociatedToTeam,
} from 'hkclient-ts/lib/actions/groups'
import { getGroupsNotAssociatedToTeam as selectGroupsNotAssociatedToTeam } from 'hkclient-ts/lib/selectors/entities/groups'
import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'
import { Team } from 'hkclient-ts/lib/types/teams'
import { Group } from 'hkclient-ts/lib/types/groups'
import { ActionFunc, GenericAction } from 'hkclient-ts/lib/types/actions'

import { setModalSearchTerm } from 'actions/views/search'
import { GlobalState } from '../../types/store'

import AddGroupsToTeamModal, { Actions } from './add_groups_to_team_modal'

type Props = {
  team?: Team
  skipCommit?: boolean
  onAddCallback?: (groupIDs: string[]) => void
  excludeGroups?: Group[]
}

function mapStateToProps(state: GlobalState, ownProps: Props) {
  const searchTerm = state.views.search.modalSearch

  const team = ownProps.team || getCurrentTeam(state) || {}

  let groups = selectGroupsNotAssociatedToTeam(state, team.id)
  if (searchTerm) {
    const regex = RegExp(searchTerm, 'i')
    groups = groups.filter((group) => regex.test(group.display_name) || regex.test(group.name))
  }

  return {
    currentTeamName: team.display_name,
    currentTeamId: team.id,
    skipCommit: ownProps.skipCommit,
    onAddCallback: ownProps.onAddCallback,
    excludeGroups: ownProps.excludeGroups,
    searchTerm,
    groups,
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Actions>(
      {
        getGroupsNotAssociatedToTeam,
        setModalSearchTerm,
        linkGroupSyncable,
        getAllGroupsAssociatedToTeam,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupsToTeamModal)
