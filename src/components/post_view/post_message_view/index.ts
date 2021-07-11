// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getIsRhsExpanded, getIsRhsOpen} from 'selectors/rhs';

import {GlobalState} from 'types/store';

import {Preferences} from 'hkclient-redux/constants';
import {getTheme, getBool} from 'hkclient-redux/selectors/entities/preferences';
import {getCurrentRelativeTeamUrl} from 'hkclient-redux/selectors/entities/teams';

import PostMessageView from './post_message_view';

function mapStateToProps(state: GlobalState) {
    return {
        enableFormatting: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'formatting', true),
        isRHSExpanded: getIsRhsExpanded(state),
        isRHSOpen: getIsRhsOpen(state),
        pluginPostTypes: state.plugins.postTypes,
        theme: getTheme(state),
        currentRelativeTeamUrl: getCurrentRelativeTeamUrl(state),
    };
}

export default connect(mapStateToProps)(PostMessageView);
