// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'

import { savePreferences } from 'hkclient-ts/lib/actions/preferences'
import { shouldShowUnreadsCategory } from 'hkclient-ts/lib/selectors/entities/preferences'
import { getCurrentUserId } from 'hkclient-ts/lib/selectors/entities/users'

import { GlobalState } from 'types/store'

import ShowUnreadsCategory from './show_unreads_category'

function mapStateToProps(state: GlobalState) {
  return {
    currentUserId: getCurrentUserId(state),
    showUnreadsCategory: shouldShowUnreadsCategory(state),
  }
}

const mapDispatchToProps = {
  savePreferences,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUnreadsCategory)
