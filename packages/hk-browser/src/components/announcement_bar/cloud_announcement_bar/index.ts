// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {openModal} from 'actions/views/modals';

import {GlobalState} from 'types/store';

import {Preferences} from 'utils/constants';

import {savePreferences} from 'hkclient-redux/actions/preferences';
import {getConfig, getLicense} from 'hkclient-redux/selectors/entities/general';
import {GenericAction} from 'hkclient-redux/types/actions';
import {getStandardAnalytics} from 'hkclient-redux/actions/admin';
import {makeGetCategory} from 'hkclient-redux/selectors/entities/preferences';
import {getCloudSubscription} from 'hkclient-redux/actions/cloud';

import {getCurrentUser, isCurrentUserSystemAdmin} from 'hkclient-redux/selectors/entities/users';

import UserLimitAnnouncementBar from './user_limit_announcement_bar';

function mapStateToProps(state: GlobalState) {
    const getCategory = makeGetCategory();
    return {
        userLimit: parseInt(getConfig(state).ExperimentalCloudUserLimit!, 10),
        analytics: state.entities.admin.analytics,
        userIsAdmin: isCurrentUserSystemAdmin(state),
        currentUser: getCurrentUser(state),
        isCloud: getLicense(state).Cloud === 'true',
        subscription: state.entities.cloud.subscription,
        preferences: getCategory(state, Preferences.CLOUD_UPGRADE_BANNER),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators(
            {
                savePreferences,
                getStandardAnalytics,
                openModal,
                getCloudSubscription,
            },
            dispatch,
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLimitAnnouncementBar);
