// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {updateChannelNotifyProps} from 'hkclient-redux/actions/channels';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getMyCurrentChannelMembership} from 'hkclient-redux/selectors/entities/channels';

import ChannelNotificationsModal from './channel_notifications_modal.jsx';

const mapStateToProps = (state) => ({
    channelMember: getMyCurrentChannelMembership(state),
    sendPushNotifications: getConfig(state).SendPushNotifications === 'true',
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        updateChannelNotifyProps,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelNotificationsModal);
