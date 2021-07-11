// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {withRouter} from 'react-router-dom';

import {getConfig, getEnvironmentConfig, updateConfig} from 'hkclient-redux/actions/admin';
import {loadRolesIfNeeded, editRole} from 'hkclient-redux/actions/roles';
import * as Selectors from 'hkclient-redux/selectors/entities/admin';
import {getConfig as getGeneralConfig, getLicense} from 'hkclient-redux/selectors/entities/general';
import {getRoles} from 'hkclient-redux/selectors/entities/roles';
import {selectChannel} from 'hkclient-redux/actions/channels';
import {selectTeam} from 'hkclient-redux/actions/teams';
import {isCurrentUserSystemAdmin, currentUserHasAnAdminRole, getCurrentUserId} from 'hkclient-redux/selectors/entities/users';
import {getTeam} from 'hkclient-redux/selectors/entities/teams';
import {ConsoleAccess} from 'hkclient-redux/types/admin';

import {General} from 'hkclient-redux/constants';
import {GenericAction} from 'hkclient-redux/types/actions';

import {setNavigationBlocked, deferNavigation, cancelNavigation, confirmNavigation} from 'actions/admin_actions.jsx';
import {getNavigationBlocked, showNavigationPrompt} from 'selectors/views/admin';
import {getAdminDefinition, getConsoleAccess} from 'selectors/admin_console';

import LocalStorageStore from 'stores/local_storage_store';

import {GlobalState} from 'types/store';

import AdminConsole from './admin_console';

function mapStateToProps(state: GlobalState) {
    const generalConfig = getGeneralConfig(state);
    const buildEnterpriseReady = generalConfig.BuildEnterpriseReady === 'true';
    const adminDefinition = getAdminDefinition(state);
    const teamId = LocalStorageStore.getPreviousTeamId(getCurrentUserId(state));
    const team = getTeam(state, teamId || '');
    const unauthorizedRoute = team ? `/${team.name}/channels/${General.DEFAULT_CHANNEL}` : '/';
    const consoleAccess: ConsoleAccess = getConsoleAccess(state);

    return {
        config: Selectors.getConfig(state),
        environmentConfig: Selectors.getEnvironmentConfig(state),
        license: getLicense(state),
        buildEnterpriseReady,
        unauthorizedRoute,
        navigationBlocked: getNavigationBlocked(state),
        showNavigationPrompt: showNavigationPrompt(state),
        isCurrentUserSystemAdmin: isCurrentUserSystemAdmin(state),
        currentUserHasAnAdminRole: currentUserHasAnAdminRole(state),
        roles: getRoles(state),
        adminDefinition,
        consoleAccess,
        cloud: state.entities.cloud,
        team,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            getConfig,
            getEnvironmentConfig,
            updateConfig,
            setNavigationBlocked,
            deferNavigation,
            cancelNavigation,
            confirmNavigation,
            loadRolesIfNeeded,
            editRole,
            selectChannel,
            selectTeam,
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminConsole));
