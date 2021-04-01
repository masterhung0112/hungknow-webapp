// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
/* eslint-disable @typescript-eslint/naming-convention */

import { connect } from 'react-redux'

import { getRoles } from 'hkclient-ts/lib/selectors/entities/roles_helpers'

import { GlobalState } from 'types/store'

import SystemRoles from './system_roles'

function mapStateToProps(state: GlobalState) {
  return {
    roles: getRoles(state),
  }
}

export default connect(mapStateToProps)(SystemRoles)
