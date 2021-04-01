// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'
import { GlobalState } from 'hkclient-ts/lib/types/store'

import { getSiteURL } from 'utils/url'

import ChangeURLModal from './change_url_modal'

function mapStateToProps(state: GlobalState) {
  const currentTeam = getCurrentTeam(state)
  const currentTeamURL = `${getSiteURL()}/${currentTeam.name}`
  return {
    currentTeamURL,
  }
}

export default connect(mapStateToProps)(ChangeURLModal)
