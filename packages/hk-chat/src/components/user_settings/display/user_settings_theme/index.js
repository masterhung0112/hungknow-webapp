// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Preferences} from 'utils/constants';

import {getTheme, makeGetCategory} from 'hkclient-redux/selectors/entities/preferences';
import {getCurrentTeamId, getMyTeamsCount} from 'hkclient-redux/selectors/entities/teams';

import {saveTheme, deleteTeamSpecificThemes} from 'hkclient-redux/actions/preferences';

import UserSettingsTheme from './user_settings_theme.jsx';

function makeMapStateToProps() {
    const getThemeCategory = makeGetCategory();

    return (state) => {
        return {
            currentTeamId: getCurrentTeamId(state),
            theme: getTheme(state),
            applyToAllTeams: getThemeCategory(state, Preferences.CATEGORY_THEME).length <= 1,
            showAllTeamsCheckbox: getMyTeamsCount(state) > 1,
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            saveTheme,
            deleteTeamSpecificThemes,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(UserSettingsTheme);