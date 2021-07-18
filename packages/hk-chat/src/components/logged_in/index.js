// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {browserHistory} from 'utils/browser_history';

import {checkIfMFARequired} from 'utils/route';

import {getChannelURL} from 'utils/utils';

import {autoUpdateTimezone} from 'hkclient-redux/actions/timezone';
import {getCurrentChannelId} from 'hkclient-redux/selectors/entities/channels';
import {getLicense, getConfig} from 'hkclient-redux/selectors/entities/general';
import {getCurrentUser, shouldShowTermsOfService} from 'hkclient-redux/selectors/entities/users';

import LoggedIn from './logged_in.jsx';

function mapStateToProps(state, ownProps) {
    const license = getLicense(state);
    const config = getConfig(state);
    const showTermsOfService = shouldShowTermsOfService(state);

    return {
        currentUser: getCurrentUser(state),
        currentChannelId: getCurrentChannelId(state),
        mfaRequired: checkIfMFARequired(getCurrentUser(state), license, config, ownProps.match.url),
        enableTimezone: config.ExperimentalTimezone === 'true',
        showTermsOfService,
    };
}

// NOTE: suggestions where to keep this welcomed
const getChannelURLAction = (channel, teamId) => (dispatch, getState) => browserHistory.push(getChannelURL(getState(), channel, teamId));

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            autoUpdateTimezone,
            getChannelURLAction,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);