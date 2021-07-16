// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {removeUserFromTeamAndGetStats} from 'actions/team_actions.jsx';

import {getChannelStats} from 'hkclient-redux/actions/channels';
import {
    getMyTeamMembers,
    getMyTeamUnreads,
    getTeamStats,
    getTeamMember,
    updateTeamMemberSchemeRoles,
} from 'hkclient-redux/actions/teams';
import {getUser, updateUserActive} from 'hkclient-redux/actions/users';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {getCurrentRelativeTeamUrl, getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';

import {GlobalState} from 'hkclient-redux/types/store';

import {GenericAction} from 'hkclient-redux/types/actions';

import TeamMembersDropdown from './team_members_dropdown';

function mapStateToProps(state: GlobalState) {
    return {
        currentUser: getCurrentUser(state),
        teamUrl: getCurrentRelativeTeamUrl(state),
        currentTeam: getCurrentTeam(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            getMyTeamMembers,
            getMyTeamUnreads,
            getUser,
            getTeamMember,
            getTeamStats,
            getChannelStats,
            updateUserActive,
            updateTeamMemberSchemeRoles,
            removeUserFromTeamAndGetStats,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembersDropdown);
