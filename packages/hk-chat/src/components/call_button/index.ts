// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCurrentLocale} from 'selectors/i18n';
import {GlobalState} from 'types/store/index';

import {getCurrentChannel, getMyCurrentChannelMembership} from 'hkclient-redux/selectors/entities/channels';

import CallButton from './call_button';

function mapStateToProps(state: GlobalState) {
    return {
        currentChannel: getCurrentChannel(state),
        locale: getCurrentLocale(state),
        pluginCallMethods: state.plugins.components.CallButton,
        channelMember: getMyCurrentChannelMembership(state),
    };
}

export default connect(mapStateToProps)(CallButton);
