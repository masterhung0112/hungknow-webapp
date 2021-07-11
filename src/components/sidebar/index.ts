// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {createCategory, clearChannelSelection} from 'actions/views/channel_sidebar';

import {isUnreadFilterEnabled} from 'selectors/views/channel_sidebar';

import {openModal} from 'actions/views/modals';

import {GlobalState} from 'types/store';

import {getIsLhsOpen} from 'selectors/lhs';

import {fetchMyCategories} from 'hkclient-redux/actions/channel_categories';
import {Preferences} from 'hkclient-redux/constants';
import Permissions from 'hkclient-redux/constants/permissions';
import {getLicense} from 'hkclient-redux/selectors/entities/general';
import {getBool} from 'hkclient-redux/selectors/entities/preferences';
import {haveICurrentChannelPermission} from 'hkclient-redux/selectors/entities/roles';
import {getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';
import {GenericAction} from 'hkclient-redux/types/actions';

import Sidebar from './sidebar';

function mapStateToProps(state: GlobalState) {
    const currentTeam = getCurrentTeam(state);
    const unreadFilterEnabled = isUnreadFilterEnabled(state);

    let canCreatePublicChannel = false;
    let canCreatePrivateChannel = false;
    let canJoinPublicChannel = false;

    if (currentTeam) {
        canCreatePublicChannel = haveICurrentChannelPermission(state, Permissions.CREATE_PUBLIC_CHANNEL);
        canCreatePrivateChannel = haveICurrentChannelPermission(state, Permissions.CREATE_PRIVATE_CHANNEL);
        canJoinPublicChannel = haveICurrentChannelPermission(state, Permissions.JOIN_PUBLIC_CHANNELS);
    }

    return {
        teamId: currentTeam ? currentTeam.id : '',
        canCreatePrivateChannel,
        canCreatePublicChannel,
        canJoinPublicChannel,
        isOpen: getIsLhsOpen(state),
        hasSeenModal: getBool(
            state,
            Preferences.CATEGORY_WHATS_NEW_MODAL,
            Preferences.HAS_SEEN_SIDEBAR_WHATS_NEW_MODAL,
            false,
        ),
        isCloud: getLicense(state).Cloud === 'true',
        unreadFilterEnabled,
    };
}

type Actions = {
    fetchMyCategories: (teamId: string) => {data: boolean};
    createCategory: (teamId: string, categoryName: string) => {data: string};
    openModal: (modalData: {modalId: string; dialogType: React.Component; dialogProps?: any}) => Promise<{
        data: boolean;
    }>;
    clearChannelSelection: () => void;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject, Actions>({
            clearChannelSelection,
            createCategory,
            fetchMyCategories,
            openModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
