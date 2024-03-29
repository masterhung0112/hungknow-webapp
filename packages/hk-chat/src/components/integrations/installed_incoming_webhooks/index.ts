// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {loadIncomingHooksAndProfilesForTeam} from 'actions/integration_actions.jsx';

import {removeIncomingHook} from 'hkclient-redux/actions/integrations';

import {getAllChannels} from 'hkclient-redux/selectors/entities/channels';
import {getIncomingHooks} from 'hkclient-redux/selectors/entities/integrations';
import {getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';
import {getUsers} from 'hkclient-redux/selectors/entities/users';
import {GlobalState} from 'hkclient-redux/types/store';
import {haveITeamPermission} from 'hkclient-redux/selectors/entities/roles';
import {Permissions} from 'hkclient-redux/constants';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {ActionResult, GenericAction} from 'hkclient-redux/types/actions';

import InstalledIncomingWebhooks from './installed_incoming_webhooks';

type Actions = {
    removeIncomingHook: (hookId: string) => Promise<ActionResult>;
    loadIncomingHooksAndProfilesForTeam: (teamId: string, startPageNumber: number, pageSize: string) => Promise<ActionResult>;
}

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const teamId = getCurrentTeamId(state);
    const canManageOthersWebhooks = haveITeamPermission(state, teamId, Permissions.MANAGE_OTHERS_INCOMING_WEBHOOKS);
    const incomingHooks = getIncomingHooks(state);
    const incomingWebhooks = Object.keys(incomingHooks).
        map((key) => incomingHooks[key]).
        filter((incomingWebhook) => incomingWebhook.team_id === teamId);
    const enableIncomingWebhooks = config.EnableIncomingWebhooks === 'true';

    return {
        incomingWebhooks,
        channels: getAllChannels(state),
        users: getUsers(state),
        canManageOthersWebhooks,
        enableIncomingWebhooks,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<any>, Actions>({
            loadIncomingHooksAndProfilesForTeam,
            removeIncomingHook,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstalledIncomingWebhooks);
