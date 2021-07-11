// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {savePreferences} from 'hkclient-redux/actions/preferences';
import {getLicense} from 'hkclient-redux/selectors/entities/general';
import {GenericAction} from 'hkclient-redux/types/actions';
import {getStandardAnalytics} from 'hkclient-redux/actions/admin';
import {getCloudSubscription, getCloudCustomer} from 'hkclient-redux/actions/cloud';

import {isCurrentUserSystemAdmin} from 'hkclient-redux/selectors/entities/users';

import {openModal} from 'actions/views/modals';

import {GlobalState} from 'types/store';

import PaymentAnnouncementBar from './payment_announcement_bar';

function mapStateToProps(state: GlobalState) {
    return {
        userIsAdmin: isCurrentUserSystemAdmin(state),
        isCloud: getLicense(state).Cloud === 'true',
        subscription: state.entities.cloud.subscription,
        customer: state.entities.cloud.customer,
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
                getCloudCustomer,
            },
            dispatch,
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentAnnouncementBar);
