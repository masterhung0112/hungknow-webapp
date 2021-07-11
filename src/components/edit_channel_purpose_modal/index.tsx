// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';
import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import Constants from 'utils/constants';

import {getBool} from 'hkclient-redux/selectors/entities/preferences';
import {patchChannel} from 'hkclient-redux/actions/channels';
import {ActionFunc, GenericAction, ActionResult} from 'hkclient-redux/types/actions';
import {Channel} from 'hkclient-redux/types/channels';

import EditChannelPurposeModal from './edit_channel_purpose_modal';

function mapStateToProps(state: GlobalState) {
    return {
        ctrlSend: getBool(state, Constants.Preferences.CATEGORY_ADVANCED_SETTINGS, 'send_on_ctrl_enter'),
    };
}

type Actions = {
    patchChannel: (channelId: string, patch: Partial<Channel>) => Promise<ActionResult>;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            patchChannel,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChannelPurposeModal);
