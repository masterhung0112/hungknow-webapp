// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getCurrentLocale} from 'selectors/i18n';

import {getSessions, revokeSession} from 'hkclient-redux/actions/users';
import {getCurrentUserId, getUserSessions} from 'hkclient-redux/selectors/entities/users';

import ActivityLogModal from './activity_log_modal.jsx';

function mapStateToProps(state) {
    return {
        currentUserId: getCurrentUserId(state),
        sessions: getUserSessions(state),
        locale: getCurrentLocale(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getSessions,
            revokeSession,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLogModal);
