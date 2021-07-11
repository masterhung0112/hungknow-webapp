// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {loadOutgoingHooksAndProfilesForTeam} from 'actions/integration_actions';

import * as Actions from 'hkclient-redux/actions/integrations';
import {getOutgoingHooks} from 'hkclient-redux/selectors/entities/integrations';
import {getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';
import {getAllChannels} from 'hkclient-redux/selectors/entities/channels';
import {getUsers} from 'hkclient-redux/selectors/entities/users';
import {haveITeamPermission} from 'hkclient-redux/selectors/entities/roles';
import {Permissions} from 'hkclient-redux/constants';
import {getConfig} from 'hkclient-redux/selectors/entities/general';

import InstalledOutgoingWebhook from './installed_outgoing_webhooks.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const teamId = getCurrentTeamId(state);
    const canManageOthersWebhooks = haveITeamPermission(state, teamId, Permissions.MANAGE_OTHERS_OUTGOING_WEBHOOKS);
    const outgoingHooks = getOutgoingHooks(state);
    const outgoingWebhooks = Object.keys(outgoingHooks).
        map((key) => outgoingHooks[key]).
        filter((outgoingWebhook) => outgoingWebhook.team_id === teamId);
    const enableOutgoingWebhooks = config.EnableOutgoingWebhooks === 'true';

    return {
        outgoingWebhooks,
        channels: getAllChannels(state),
        users: getUsers(state),
        teamId,
        canManageOthersWebhooks,
        enableOutgoingWebhooks,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadOutgoingHooksAndProfilesForTeam,
            removeOutgoingHook: Actions.removeOutgoingHook,
            regenOutgoingHookToken: Actions.regenOutgoingHookToken,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstalledOutgoingWebhook);
