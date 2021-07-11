// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {loadOAuthAppsAndProfiles} from 'actions/integration_actions';

import {regenOAuthAppSecret, deleteOAuthApp} from 'hkclient-redux/actions/integrations';
import {getAppsOAuthAppIDs, getOAuthApps} from 'hkclient-redux/selectors/entities/integrations';
import {haveISystemPermission} from 'hkclient-redux/selectors/entities/roles';
import {Permissions} from 'hkclient-redux/constants';
import {getConfig} from 'hkclient-redux/selectors/entities/general';

import {GlobalState} from 'hkclient-redux/types/store';

import {getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';

import {GenericAction} from 'hkclient-redux/types/actions';

import InstalledOAuthApps from './installed_oauth_apps';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const enableOAuthServiceProvider = config.EnableOAuthServiceProvider === 'true';

    return {
        canManageOauth: haveISystemPermission(state, {permission: Permissions.MANAGE_OAUTH}),
        oauthApps: getOAuthApps(state),
        appsOAuthAppIDs: getAppsOAuthAppIDs(state),
        enableOAuthServiceProvider,
        team: getCurrentTeam(state),
    };
}

type Actions = {
    loadOAuthAppsAndProfiles: (page?: number, perPage?: number) => Promise<void>;
    regenOAuthAppSecret: (appId: string) => Promise<{ error?: Error }>;
    deleteOAuthApp: (appId: string) => Promise<void>;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject, Actions>({
            loadOAuthAppsAndProfiles,
            regenOAuthAppSecret,
            deleteOAuthApp,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstalledOAuthApps);
