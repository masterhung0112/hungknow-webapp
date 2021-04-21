// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { switchLdapToEmail } from 'hkclient-ts/lib/actions/users'
import { getConfig } from 'hkclient-ts/lib/selectors/entities/general'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { GenericAction } from 'hkclient-ts/lib/types/actions'

import { getPasswordConfig } from 'utils/utils.jsx'

import ClaimController from './claim_controller'

function mapStateToProps(state: GlobalState) {
  const config = getConfig(state)
  const siteName = config.SiteName as string
  const ldapLoginFieldName = config.LdapLoginFieldName as string

  return {
    siteName,
    ldapLoginFieldName,
    passwordConfig: getPasswordConfig(config),
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators(
      {
        switchLdapToEmail,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimController)
