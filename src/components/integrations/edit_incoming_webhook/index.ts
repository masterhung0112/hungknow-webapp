// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getIncomingHook, updateIncomingHook} from 'hkclient-redux/actions/integrations';
import {getConfig} from 'hkclient-redux/selectors/entities/general';

import {GlobalState} from 'hkclient-redux/types/store';
import {ActionFunc, ActionResult, GenericAction} from 'hkclient-redux/types/actions';
import {IncomingWebhook} from 'hkclient-redux/types/integrations';

import EditIncomingWebhook from './edit_incoming_webhook';

type Props = {
    location: Location;
}

type Actions = {
    updateIncomingHook: (hook: IncomingWebhook) => Promise<ActionResult>;
    getIncomingHook: (hookId: string) => Promise<ActionResult>;
}

function mapStateToProps(state: GlobalState, ownProps: Props) {
    const config = getConfig(state);
    const enableIncomingWebhooks = config.EnableIncomingWebhooks === 'true';
    const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true';
    const enablePostIconOverride = config.EnablePostIconOverride === 'true';
    const hookId = (new URLSearchParams(ownProps.location.search)).get('id') || '';

    return {
        hookId,
        hook: state.entities.integrations.incomingHooks[hookId],
        enableIncomingWebhooks,
        enablePostUsernameOverride,
        enablePostIconOverride,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            updateIncomingHook,
            getIncomingHook,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditIncomingWebhook);
