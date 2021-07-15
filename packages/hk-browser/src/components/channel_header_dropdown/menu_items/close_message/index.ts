// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {leaveDirectChannel} from 'actions/views/channel';

import {GlobalState} from 'types/store';

import {savePreferences} from 'hkclient-redux/actions/preferences';
import {getCurrentTeam, getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';
import {getRedirectChannelNameForTeam} from 'hkclient-redux/selectors/entities/channels';

import CloseMessage from './close_message';

const mapStateToProps = (state: GlobalState) => {
    return {
        currentTeam: getCurrentTeam(state),
        redirectChannel: getRedirectChannelNameForTeam(state, getCurrentTeamId(state)),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({savePreferences, leaveDirectChannel}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CloseMessage);
