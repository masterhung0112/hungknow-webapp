// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getIsRhsOpen} from 'selectors/rhs';

import {getCurrentChannel} from 'hkclient-redux/selectors/entities/channels';
import {getCurrentRelativeTeamUrl, getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';

import ChannelInfoModal from './channel_info_modal';

function mapStateToProps(state) {
    return {
        isRHSOpen: getIsRhsOpen(state),
        currentRelativeTeamUrl: getCurrentRelativeTeamUrl(state),
        currentChannel: getCurrentChannel(state),
        currentTeam: getCurrentTeam(state),
    };
}

export default connect(mapStateToProps)(ChannelInfoModal);
