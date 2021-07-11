// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {verifyUserEmail, getMe} from 'hkclient-redux/actions/users';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getCurrentUserId} from 'hkclient-redux/selectors/entities/users';
import {clearErrors, logError} from 'hkclient-redux/actions/errors';

import {GenericAction} from 'hkclient-redux/types/actions';

import {GlobalState} from '../../types/store';

import DoVerifyEmail from './do_verify_email';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const siteName = config.SiteName;
    return {
        isLoggedIn: Boolean(getCurrentUserId(state)),
        siteName,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            verifyUserEmail,
            getMe,
            logError,
            clearErrors,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoVerifyEmail);
