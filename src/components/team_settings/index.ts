// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'

import { GlobalState } from 'hkclient-ts/lib/types/store'

import TeamSettings from './team_settings'

function mapStateToProps(state: GlobalState) {
  return {
    team: getCurrentTeam(state),
  }
}

export default connect(mapStateToProps)(TeamSettings)