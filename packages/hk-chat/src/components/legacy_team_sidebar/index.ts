// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {withRouter} from '../../hooks/withRouter';

import {getCurrentLocale} from 'selectors/i18n';

import {getIsLhsOpen} from 'selectors/lhs';

import {switchTeam, updateTeamsOrderForUser} from 'actions/team_actions.jsx';

import {Preferences} from 'utils/constants.jsx';

import {GlobalState} from 'types/store';

import {getTeams} from 'hkclient-redux/actions/teams';

import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {
    getCurrentTeamId,
    getJoinableTeamIds,
    getMyTeams,
    getTeamMemberships,
} from 'hkclient-redux/selectors/entities/teams';
import {get, isCollapsedThreadsEnabled} from 'hkclient-redux/selectors/entities/preferences';

import {ClientConfig} from 'hkclient-redux/types/config';

import {GenericAction} from 'hkclient-redux/types/actions';

import {getThreadCounts} from 'hkclient-redux/selectors/entities/threads';

import LegacyTeamSidebar from './legacy_team_sidebar_controller';

function mapStateToProps(state: GlobalState) {
    const config: Partial<ClientConfig> = getConfig(state);

    const experimentalPrimaryTeam: string | undefined = config.ExperimentalPrimaryTeam;
    const joinableTeams: string[] = getJoinableTeamIds(state);
    const moreTeamsToJoin: boolean = joinableTeams && joinableTeams.length > 0;

    return {
        currentTeamId: getCurrentTeamId(state),
        myTeams: getMyTeams(state),
        myTeamMembers: getTeamMemberships(state),
        isOpen: getIsLhsOpen(state),
        collapsedThreads: isCollapsedThreadsEnabled(state),
        experimentalPrimaryTeam,
        locale: getCurrentLocale(state),
        moreTeamsToJoin,
        userTeamsOrderPreference: get(state, Preferences.TEAMS_ORDER, '', ''),
        threadCounts: getThreadCounts(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            getTeams,
            switchTeam,
            updateTeamsOrderForUser,
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LegacyTeamSidebar));
