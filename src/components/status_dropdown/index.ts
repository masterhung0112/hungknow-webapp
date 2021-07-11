// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {setStatus, unsetCustomStatus} from 'hkclient-redux/actions/users';
import {Client4} from 'hkclient-redux/client';
import {Preferences} from 'hkclient-redux/constants';

import {get, isTimedDNDEnabled} from 'hkclient-redux/selectors/entities/preferences';
import {getCurrentUser, getStatusForUserId} from 'hkclient-redux/selectors/entities/users';

import {openModal} from 'actions/views/modals';
import {setStatusDropdown} from 'actions/views/status_dropdown';

import {getCurrentUserTimezone} from 'selectors/general';
import {makeGetCustomStatus, isCustomStatusEnabled, showStatusDropdownPulsatingDot, isCustomStatusExpired} from 'selectors/views/custom_status';
import {isStatusDropdownOpen} from 'selectors/views/status_dropdown';
import {GenericAction} from 'hkclient-redux/types/actions';
import {GlobalState} from 'types/store';

import StatusDropdown from './status_dropdown';

function makeMapStateToProps() {
    const getCustomStatus = makeGetCustomStatus();

    return function mapStateToProps(state: GlobalState) {
        const currentUser = getCurrentUser(state);

        const userId = currentUser?.id;
        const customStatus = getCustomStatus(state, userId);
        return {
            userId,
            profilePicture: Client4.getProfilePictureUrl(userId, currentUser?.last_picture_update),
            autoResetPref: get(state, Preferences.CATEGORY_AUTO_RESET_MANUAL_STATUS, userId, ''),
            status: getStatusForUserId(state, userId),
            customStatus,
            isCustomStatusEnabled: isCustomStatusEnabled(state),
            isCustomStatusExpired: isCustomStatusExpired(state, customStatus),
            isStatusDropdownOpen: isStatusDropdownOpen(state),
            showCustomStatusPulsatingDot: showStatusDropdownPulsatingDot(state),
            timezone: getCurrentUserTimezone(state),
            isTimedDNDEnabled: isTimedDNDEnabled(state),
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            openModal,
            setStatus,
            unsetCustomStatus,
            setStatusDropdown,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(StatusDropdown);
