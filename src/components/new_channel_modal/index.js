// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {Preferences} from 'hkclient-redux/constants';
import {getBool} from 'hkclient-redux/selectors/entities/preferences';
import {getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';

import NewChannelModal from './new_channel_modal.jsx';

function mapStateToProps(state) {
    return {
        ctrlSend: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'send_on_ctrl_enter'),
        currentTeamId: getCurrentTeamId(state),
    };
}

export default connect(mapStateToProps)(NewChannelModal);
