// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { getTheme } from 'hkclient-ts/lib/selectors/entities/preferences'
import { GlobalState } from 'hkclient-ts/lib/types/store'

import ActionButton from './action_button'

function mapStateToProps(state: GlobalState) {
  return {
    theme: getTheme(state),
  }
}

export default connect(mapStateToProps)(ActionButton)