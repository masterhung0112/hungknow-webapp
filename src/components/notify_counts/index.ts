// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import {getUnreadStatusInCurrentTeam, basicUnreadMeta} from 'hkclient-redux/selectors/entities/channels';

import NotifyCounts from './notify_counts';

function mapStateToProps(state: GlobalState) {
    return basicUnreadMeta(getUnreadStatusInCurrentTeam(state));
}

export default connect(mapStateToProps)(NotifyCounts);
