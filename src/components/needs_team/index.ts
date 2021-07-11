// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';
import {withRouter} from 'react-router-dom';

import {GlobalState} from 'types/store';

import {setPreviousTeamId} from 'actions/local_storage';

import {getPreviousTeamId} from 'selectors/local_storage';

import {loadStatusesForChannelAndSidebar} from 'actions/status_actions';

import {addUserToTeam} from 'actions/team_actions';

import {markChannelAsReadOnFocus} from 'actions/views/channel';

import {getSelectedThreadIdInCurrentTeam} from 'selectors/views/threads';

import {checkIfMFARequired} from 'utils/route';

import {loadProfilesForDirect} from 'hkclient-redux/actions/users';
import {fetchMyChannelsAndMembers, viewChannel} from 'hkclient-redux/actions/channels';
import {getMyTeamUnreads, getTeamByName, selectTeam} from 'hkclient-redux/actions/teams';
import {getGroups, getAllGroupsAssociatedToChannelsInTeam, getAllGroupsAssociatedToTeam, getGroupsByUserId} from 'hkclient-redux/actions/groups';
import {getTheme} from 'hkclient-redux/selectors/entities/preferences';
import {getLicense, getConfig} from 'hkclient-redux/selectors/entities/general';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {getCurrentTeamId, getMyTeams} from 'hkclient-redux/selectors/entities/teams';
import {getCurrentChannelId} from 'hkclient-redux/selectors/entities/channels';
import {Action} from 'hkclient-redux/types/actions';

import NeedsTeam from './needs_team';

type OwnProps = {
    match: {
        url: string;
    };
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const license = getLicense(state);
    const config = getConfig(state);
    const currentUser = getCurrentUser(state);
    const plugins = state.plugins.components.NeedsTeamComponent;

    return {
        license,
        theme: getTheme(state),
        mfaRequired: checkIfMFARequired(currentUser, license, config, ownProps.match.url),
        currentUser,
        currentTeamId: getCurrentTeamId(state),
        previousTeamId: getPreviousTeamId(state) as string,
        teamsList: getMyTeams(state),
        currentChannelId: getCurrentChannelId(state),
        useLegacyLHS: config.EnableLegacySidebar === 'true',
        plugins,
        selectedThreadId: getSelectedThreadIdInCurrentTeam(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, any>({
            fetchMyChannelsAndMembers,
            getMyTeamUnreads,
            viewChannel,
            markChannelAsReadOnFocus,
            getTeamByName,
            addUserToTeam,
            setPreviousTeamId,
            selectTeam,
            loadStatusesForChannelAndSidebar,
            loadProfilesForDirect,
            getAllGroupsAssociatedToChannelsInTeam,
            getAllGroupsAssociatedToTeam,
            getGroupsByUserId,
            getGroups,
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NeedsTeam));
