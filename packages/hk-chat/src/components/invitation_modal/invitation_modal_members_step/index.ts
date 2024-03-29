// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {GlobalState} from 'types/store';

import {isAdmin} from 'utils/utils.jsx';

import {
    getConfig,
    getLicense,
    getSubscriptionStats as selectSubscriptionStats,
} from 'hkclient-redux/selectors/entities/general';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {getSubscriptionStats} from 'hkclient-redux/actions/cloud';

import InvitationModalMembersStep from './invitation_modal_members_step';

function mapStateToProps(state: GlobalState) {
    return {
        userLimit: getConfig(state).ExperimentalCloudUserLimit,
        userIsAdmin: isAdmin(getCurrentUser(state).roles),
        isCloud: getLicense(state).Cloud === 'true',
        subscriptionStats: selectSubscriptionStats(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators({getSubscriptionStats}, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationModalMembersStep);
