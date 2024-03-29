// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {switchToChannel} from 'actions/views/channel';

import {closeModal} from 'actions/views/modals';

import Permissions from 'hkclient-redux/constants/permissions';
import {haveICurrentChannelPermission} from 'hkclient-redux/selectors/entities/roles';
import {getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';
import {ActionFunc, GenericAction} from 'hkclient-redux/types/actions';
import {createChannel} from 'hkclient-redux/actions/channels';
import {GlobalState} from 'hkclient-redux/types/store';

import NewChannelFlow, {Props} from './new_channel_flow';

function mapStateToProps(state: GlobalState) {
    const currentTeam = getCurrentTeam(state);

    let canCreatePublicChannel = false;
    let canCreatePrivateChannel = false;

    if (currentTeam) {
        canCreatePublicChannel = haveICurrentChannelPermission(state, Permissions.CREATE_PUBLIC_CHANNEL);
        canCreatePrivateChannel = haveICurrentChannelPermission(state, Permissions.CREATE_PRIVATE_CHANNEL);
    }

    return {
        currentTeamId: currentTeam.id,
        canCreatePrivateChannel,
        canCreatePublicChannel,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>({
            createChannel,
            switchToChannel,
            closeModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChannelFlow);
