// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { deleteCommand, regenCommandToken } from 'hkclient-ts/lib/actions/integrations'
import { haveITeamPermission } from 'hkclient-ts/lib/selectors/entities/roles'
import { Permissions } from 'hkclient-ts/lib/constants'
import { GenericAction, ActionResult, ActionFunc } from 'hkclient-ts/lib/types/actions'
import { GlobalState } from 'hkclient-ts/lib/types/store'

import InstalledCommands from './installed_commands'

type Props = {
  team: {
    id: string
  }
}

type Actions = {
  regenCommandToken: (id: string) => Promise<ActionResult>
  deleteCommand: (id: string) => Promise<ActionResult>
}

function mapStateToProps(state: GlobalState, ownProps: Props) {
  const canManageOthersSlashCommands = haveITeamPermission(state, {
    team: ownProps.team.id,
    permission: Permissions.MANAGE_OTHERS_SLASH_COMMANDS,
  })

  return {
    canManageOthersSlashCommands,
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        regenCommandToken,
        deleteCommand,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstalledCommands)
