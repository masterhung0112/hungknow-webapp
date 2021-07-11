// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Constants from 'utils/constants';

import {getBool} from 'hkclient-redux/selectors/entities/preferences';
import {patchChannel} from 'hkclient-redux/actions/channels';

import EditChannelPurposeModal from './edit_channel_purpose_modal.jsx';

function mapStateToProps(state) {
    return {
        ctrlSend: getBool(state, Constants.Preferences.CATEGORY_ADVANCED_SETTINGS, 'send_on_ctrl_enter'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            patchChannel: bindActionCreators(patchChannel, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChannelPurposeModal);
