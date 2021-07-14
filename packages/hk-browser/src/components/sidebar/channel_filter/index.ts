// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {setUnreadFilterEnabled} from 'actions/views/channel_sidebar';
import {isUnreadFilterEnabled} from 'selectors/views/channel_sidebar';
import {GlobalState} from 'types/store';

import {GenericAction} from 'hkclient-redux/types/actions';
import {getMyTeams} from 'hkclient-redux/selectors/entities/teams';

import ChannelFilter from './channel_filter';

function mapStateToProps(state: GlobalState) {
    const teams = getMyTeams(state);

    return {
        hasMultipleTeams: teams && teams.length > 1,
        unreadFilterEnabled: isUnreadFilterEnabled(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            setUnreadFilterEnabled,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelFilter);
