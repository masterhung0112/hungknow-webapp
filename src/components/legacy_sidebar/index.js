// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {switchToChannelById} from 'actions/views/channel';

import {openModal} from 'actions/views/modals';

import {close} from 'actions/views/lhs';

import {getIsLhsOpen} from 'selectors/lhs';

import {Preferences} from 'hkclient-redux/constants/index';
import {
    getCurrentChannel,
    getSortedUnreadChannelIds,
    getOrderedChannelIds,
} from 'hkclient-redux/selectors/entities/channels';

import Permissions from 'hkclient-redux/constants/permissions';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getBool as getBoolPreference, getSidebarPreferences, isCollapsedThreadsEnabled} from 'hkclient-redux/selectors/entities/preferences';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {haveICurrentTeamPermission} from 'hkclient-redux/selectors/entities/roles';
import {getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';

import Sidebar from './sidebar.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const currentChannel = getCurrentChannel(state);
    const currentTeammate = currentChannel && currentChannel.teammate_id && getCurrentChannel(state, currentChannel.teammate_id);
    const currentTeam = getCurrentTeam(state);

    let canCreatePublicChannel = false;
    let canCreatePrivateChannel = false;

    if (currentTeam) {
        canCreatePublicChannel = haveICurrentTeamPermission(state, Permissions.CREATE_PUBLIC_CHANNEL);
        canCreatePrivateChannel = haveICurrentTeamPermission(state, Permissions.CREATE_PRIVATE_CHANNEL);
    }

    const sidebarPrefs = getSidebarPreferences(state);
    const lastUnreadChannel = state.views.channel.lastUnreadChannel;
    const unreadChannelIds = getSortedUnreadChannelIds(state, lastUnreadChannel);
    const orderedChannelIds = getOrderedChannelIds(
        state,
        lastUnreadChannel,
        sidebarPrefs.grouping,
        sidebarPrefs.sorting,
        sidebarPrefs.unreads_at_top === 'true',
        sidebarPrefs.favorite_at_top === 'true',
    );

    const channelSwitcherOption = getBoolPreference(
        state,
        Preferences.CATEGORY_SIDEBAR_SETTINGS,
        'channel_switcher_section',
        'true',
    );

    return {
        unreadChannelIds,
        orderedChannelIds,
        channelSwitcherOption,
        currentChannel,
        currentTeammate,
        currentTeam,
        currentUser: getCurrentUser(state),
        canCreatePublicChannel,
        canCreatePrivateChannel,
        isOpen: getIsLhsOpen(state),
        viewArchivedChannels: config.ExperimentalViewArchivedChannels === 'true',
        isCollapsedThreadsEnabled: isCollapsedThreadsEnabled(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            close,
            switchToChannelById,
            openModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
