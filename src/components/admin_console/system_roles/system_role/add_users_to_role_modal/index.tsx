// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux'

import { UserProfile } from 'hkclient-ts/lib/types/users'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { GenericAction, ActionFunc } from 'hkclient-ts/lib/types/actions'

import { getProfiles, searchProfiles } from 'hkclient-ts/lib/actions/users'

import { getProfiles as selectProfiles } from 'hkclient-ts/lib/selectors/entities/users'

import AddUsersToRoleModal, { Props } from './add_users_to_role_modal'

function mapStateToProps(state: GlobalState, props: Props) {
  const filterOptions: { [key: string]: any } = { active: true, exclude_roles: [props.role.name] }
  const users: UserProfile[] = selectProfiles(state, filterOptions)

  return {
    users,
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>(
      {
        getProfiles,
        searchProfiles,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersToRoleModal)
