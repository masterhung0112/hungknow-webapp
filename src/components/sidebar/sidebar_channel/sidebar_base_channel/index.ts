// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {leaveChannel} from 'actions/views/channel';

import {ActionFunc} from 'hkclient-redux/types/actions';

import SidebarBaseChannel from './sidebar_base_channel';

type Actions = {
    leaveChannel: (channelId: any) => Promise<{
        error: any;
        data?: undefined;
    } | {
        data: boolean;
        error?: undefined;
    }>;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            leaveChannel,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(SidebarBaseChannel);
