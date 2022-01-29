// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {matchPath} from 'react-router-dom';

import {withRouter} from '../../hooks/withRouter';

import {
    closeRightHandSide as closeRhs,
    closeMenu as closeRhsMenu,
} from 'actions/views/rhs';

import {close as closeLhs} from 'actions/views/lhs';

import {getIsRhsOpen} from 'selectors/rhs';

import {createSelector} from 'hkreselect';

import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {
    getCurrentChannel,
    getMyCurrentChannelMembership,
    isCurrentChannelReadOnly,
} from 'hkclient-redux/selectors/entities/channels';
import {getCurrentRelativeTeamUrl} from 'hkclient-redux/selectors/entities/teams';
import {isChannelMuted} from 'hkclient-redux/utils/channel_utils';

import ChannelHeaderMobile from './channel_header_mobile';

const isCurrentChannelMuted = createSelector(
    'isCurrentChannelMuted',
    getMyCurrentChannelMembership,
    (membership) => isChannelMuted(membership),
);

const mapStateToProps = (state, {location: {pathname}}) => ({
    user: getCurrentUser(state),
    channel: getCurrentChannel(state),
    isMuted: isCurrentChannelMuted(state),
    isReadOnly: isCurrentChannelReadOnly(state),
    isRHSOpen: getIsRhsOpen(state),
    currentRelativeTeamUrl: getCurrentRelativeTeamUrl(state),
    inGlobalThreads: Boolean(matchPath('/:team/threads/:threadIdentifier?', pathname)),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        closeLhs,
        closeRhs,
        closeRhsMenu,
    }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeaderMobile));
