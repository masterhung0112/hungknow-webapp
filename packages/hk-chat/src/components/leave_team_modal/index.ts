// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {toggleSideBarRightMenuAction} from 'actions/global_actions';

import {ModalIdentifiers} from 'utils/constants';

import {isModalOpen} from 'selectors/views/modals';

import {GlobalState} from 'types/store';

import {getCurrentUserId, getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';
import {getPrivateChannels, getPublicChannels} from 'hkclient-redux/selectors/entities/channels';
import {removeUserFromTeam as leaveTeam} from 'hkclient-redux/actions/teams';
import {GenericAction} from 'hkclient-redux/types/actions';

import LeaveTeamModal from './leave_team_modal';

function mapStateToProps(state: GlobalState) {
    const modalId = ModalIdentifiers.LEAVE_TEAM;
    const currentUserId = getCurrentUserId(state);
    const currentTeamId = getCurrentTeamId(state);
    const privateChannels = getPrivateChannels(state);
    const publicChannels = getPublicChannels(state);
    const show = isModalOpen(state, modalId);
    const currentUser = getCurrentUser(state);
    return {
        currentUserId,
        currentTeamId,
        show,
        currentUser,
        privateChannels,
        publicChannels,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            leaveTeam,
            toggleSideBarRightMenu: toggleSideBarRightMenuAction,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveTeamModal);
