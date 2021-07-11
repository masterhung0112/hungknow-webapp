// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {openModal} from 'actions/views/modals';

import {sendVerificationEmail} from 'hkclient-redux/actions/users';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {isCollapsedThreadsEnabled} from 'hkclient-redux/selectors/entities/preferences';
import {GlobalState} from 'hkclient-redux/types/store';
import {GenericAction, ActionFunc} from 'hkclient-redux/types/actions';

import UserSettingsModal, {Props} from './user_settings_modal';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    const closeUnusedDirectMessages = config.CloseUnusedDirectMessages === 'true';
    const experimentalChannelOrganization = config.ExperimentalChannelOrganization === 'true';
    const sendEmailNotifications = config.SendEmailNotifications === 'true';
    const requireEmailVerification = config.RequireEmailVerification === 'true';
    const collapsedThreads = isCollapsedThreadsEnabled(state);

    return {
        currentUser: getCurrentUser(state),
        closeUnusedDirectMessages,
        experimentalChannelOrganization,
        sendEmailNotifications,
        requireEmailVerification,
        collapsedThreads,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>({
            sendVerificationEmail,
            openModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsModal);
