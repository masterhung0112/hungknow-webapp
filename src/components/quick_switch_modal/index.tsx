// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {joinChannelById, switchToChannel} from 'actions/views/channel';

import {ActionFunc} from 'hkclient-redux/types/actions';

import QuickSwitchModal, {Props} from './quick_switch_modal';

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>({
            joinChannelById,
            switchToChannel,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(QuickSwitchModal);
