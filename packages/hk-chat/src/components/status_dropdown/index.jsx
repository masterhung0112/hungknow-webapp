// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {openModal} from 'actions/views/modals';

import {setStatusDropdown} from 'actions/views/status_dropdown';

import StatusDropdown from 'components/status_dropdown/status_dropdown.jsx';

import {
    makeGetCustomStatus,
    isCustomStatusEnabled,
    showStatusDropdownPulsatingDot,
} from 'selectors/views/custom_status';

import {isStatusDropdownOpen} from 'selectors/views/status_dropdown';

import {setStatus, unsetCustomStatus} from 'hkclient-redux/actions/users';
import {Client4} from 'hkclient-redux/client';
import {getCurrentUser, getStatusForUserId} from 'hkclient-redux/selectors/entities/users';
import {Preferences} from 'hkclient-redux/constants';
import {get} from 'hkclient-redux/selectors/entities/preferences';

function mapStateToProps(state) {
    const currentUser = getCurrentUser(state);
    const getCustomStatus = makeGetCustomStatus();

    if (!currentUser) {
        return {};
    }

    const userId = currentUser.id;
    return {
        userId,
        profilePicture: Client4.getProfilePictureUrl(userId, currentUser.last_picture_update),
        autoResetPref: get(state, Preferences.CATEGORY_AUTO_RESET_MANUAL_STATUS, userId, ''),
        status: getStatusForUserId(state, userId),
        customStatus: getCustomStatus(state, userId),
        isCustomStatusEnabled: isCustomStatusEnabled(state),
        isStatusDropdownOpen: isStatusDropdownOpen(state),
        showCustomStatusPulsatingDot: showStatusDropdownPulsatingDot(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                openModal,
                setStatus,
                unsetCustomStatus,
                setStatusDropdown,
            },
            dispatch,
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusDropdown);
