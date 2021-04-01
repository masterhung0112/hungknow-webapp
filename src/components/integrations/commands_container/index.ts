// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'

import { getCommands } from 'hkclient-ts/lib/selectors/entities/integrations'
import { getUsers } from 'hkclient-ts/lib/selectors/entities/users'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'

import { GlobalState } from 'hkclient-ts/lib/types/store'

import { loadCommandsAndProfilesForTeam } from 'actions/integration_actions'

import CommandsContainer from './commands_container'

function mapStateToProps(state: GlobalState) {
  const config = getConfig(state)
  const enableCommands = config.EnableCommands === 'true'

  return {
    commands: Object.values(getCommands(state)),
    users: getUsers(state),
    enableCommands,
  }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    actions: bindActionCreators(
      {
        loadCommandsAndProfilesForTeam,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandsContainer)
