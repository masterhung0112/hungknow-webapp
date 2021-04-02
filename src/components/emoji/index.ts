// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { getCurrentTeam } from 'hkclient-ts/lib/selectors/entities/teams'
import { loadRolesIfNeeded } from 'hkclient-ts/lib/actions/roles'

import { GlobalState } from 'types/store'

import EmojiPage from 'components/emoji/emoji_page'
import { Team } from 'hkclient-ts/lib/types/teams'

function mapStateToProps(state: GlobalState) {
  const team = getCurrentTeam(state) || ({} as Team)

  return {
    teamId: team.id,
    teamName: team.name,
    teamDisplayName: team.display_name,
    siteName: state.entities.general.config.SiteName,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(
      {
        loadRolesIfNeeded,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmojiPage)
