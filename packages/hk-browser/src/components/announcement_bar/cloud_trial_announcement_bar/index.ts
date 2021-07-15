// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {openModal} from 'actions/views/modals';

import {GlobalState} from 'types/store';

import {Preferences, TrialPeriodDays} from 'utils/constants';

import {getRemainingDaysFromFutureTimestamp} from 'utils/utils.jsx';

import {savePreferences} from 'hkclient-redux/actions/preferences';
import {getLicense} from 'hkclient-redux/selectors/entities/general';
import {GenericAction} from 'hkclient-redux/types/actions';
import {getStandardAnalytics} from 'hkclient-redux/actions/admin';
import {makeGetCategory} from 'hkclient-redux/selectors/entities/preferences';
import {getCloudSubscription} from 'hkclient-redux/actions/cloud';

import {getCurrentUser, isCurrentUserSystemAdmin} from 'hkclient-redux/selectors/entities/users';

import CloudTrialAnnouncementBar from './cloud_trial_announcement_bar';

function mapStateToProps(state: GlobalState) {
    const getCategory = makeGetCategory();

    const subscription = state.entities.cloud.subscription;
    const isCloud = getLicense(state).Cloud === 'true';
    let isFreeTrial = false;
    let daysLeftOnTrial = 0;

    if (isCloud && subscription?.is_free_trial === 'true') {
        isFreeTrial = true;
        daysLeftOnTrial = getRemainingDaysFromFutureTimestamp(subscription.trial_end_at);
        if (daysLeftOnTrial > TrialPeriodDays.TRIAL_MAX_DAYS) {
            daysLeftOnTrial = TrialPeriodDays.TRIAL_MAX_DAYS;
        }
    }

    return {
        isFreeTrial,
        daysLeftOnTrial,
        analytics: state.entities.admin.analytics,
        userIsAdmin: isCurrentUserSystemAdmin(state),
        currentUser: getCurrentUser(state),
        isCloud,
        subscription,
        preferences: getCategory(state, Preferences.CLOUD_TRIAL_BANNER),
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

export default connect(mapStateToProps, mapDispatchToProps)(CloudTrialAnnouncementBar);
