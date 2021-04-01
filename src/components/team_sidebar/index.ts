// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { GlobalState } from 'hkclient-ts/lib/types/store'
import { GenericAction } from 'hkclient-ts/lib/types/actions'
import { getMyTeams } from 'hkclient-ts/lib/selectors/entities/teams'

import TeamSidebar from './team_sidebar'

function mapStateToProps(state: GlobalState) {
  return {
    teams: getMyTeams(state),
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators({}, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSidebar)
