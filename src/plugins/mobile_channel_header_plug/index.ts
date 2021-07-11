// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getTheme} from 'hkclient-redux/selectors/entities/preferences';
import {getMyCurrentChannelMembership} from 'hkclient-redux/selectors/entities/channels';

import {appsEnabled, makeAppBindingsSelector} from 'hkclient-redux/selectors/entities/apps';
import {AppBindingLocations} from 'hkclient-redux/constants/apps';
import {GlobalState} from 'types/store';
import {AppCallRequest, AppCallType} from 'hkclient-redux/types/apps';
import {ActionFunc, ActionResult, GenericAction} from 'hkclient-redux/types/actions';
import {doAppCall} from 'actions/apps';

import MobileChannelHeaderPlug from './mobile_channel_header_plug';

const getChannelHeaderBindings = makeAppBindingsSelector(AppBindingLocations.CHANNEL_HEADER_ICON);

function mapStateToProps(state: GlobalState) {
    const apps = appsEnabled(state);
    return {
        appBindings: getChannelHeaderBindings(state),
        appsEnabled: apps,
        channelMember: getMyCurrentChannelMembership(state),
        components: state.plugins.components.MobileChannelHeaderButton,
        theme: getTheme(state),
    };
}

type Actions = {
    doAppCall: (call: AppCallRequest, type: AppCallType) => Promise<ActionResult>;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            doAppCall,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileChannelHeaderPlug);
