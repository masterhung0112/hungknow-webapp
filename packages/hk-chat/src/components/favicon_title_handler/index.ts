// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ComponentProps} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {PathRouteProps, matchPath} from 'react-router-dom';

import {withRouter} from '../../hooks/withRouter';

import {getCurrentChannel, getUnreadStatus} from 'hkclient-redux/selectors/entities/channels';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';
import {GlobalState} from 'hkclient-redux/types/store';
import {GenericAction} from 'hkclient-redux/types/actions';

import FaviconTitleHandler from './favicon_title_handler';

type Props = PathRouteProps;

function mapStateToProps(state: GlobalState, {path}: Props): ComponentProps<typeof FaviconTitleHandler> {
    const config = getConfig(state);
    const currentChannel = getCurrentChannel(state);
    const currentTeammate = (currentChannel && currentChannel.teammate_id) ? currentChannel : null;
    const currentTeam = getCurrentTeam(state);

    return {
        currentChannel,
        currentTeam,
        currentTeammate,
        siteName: config.SiteName,
        unreadStatus: getUnreadStatus(state),
        inGlobalThreads: matchPath('/:team/threads/:threadIdentifier?', path) != null,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FaviconTitleHandler));
