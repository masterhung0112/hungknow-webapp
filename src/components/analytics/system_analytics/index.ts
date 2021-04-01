// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getLicense } from 'hkclient-ts/lib/selectors/entities/general'

import { GlobalState } from 'hkclient-ts/lib/types/store'

import SystemAnalytics from './system_analytics'

function mapStateToProps(state: GlobalState) {
  const license = getLicense(state)
  const isLicensed = license.IsLicensed === 'true'

  return {
    isLicensed,
    stats: state.entities.admin.analytics,
  }
}

export default connect(mapStateToProps)(SystemAnalytics)
