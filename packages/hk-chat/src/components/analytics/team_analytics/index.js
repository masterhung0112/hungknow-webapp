// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import BrowserStore from 'stores/browser_store';

import {getCurrentLocale} from 'selectors/i18n';

import {getTeams} from 'hkclient-redux/actions/teams';
import {getProfilesInTeam} from 'hkclient-redux/actions/users';
import {getTeamsList} from 'hkclient-redux/selectors/entities/teams';

import TeamAnalytics from './team_analytics.jsx';

const LAST_ANALYTICS_TEAM = 'last_analytics_team';

function mapStateToProps(state) {
    const teams = getTeamsList(state);
    const teamId = BrowserStore.getGlobalItem(LAST_ANALYTICS_TEAM, null);
    const initialTeam = state.entities.teams.teams[teamId] || (teams.length > 0 ? teams[0] : null);

    return {
        initialTeam,
        locale: getCurrentLocale(state),
        teams,
        stats: state.entities.admin.teamAnalytics,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getTeams,
            getProfilesInTeam,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamAnalytics);