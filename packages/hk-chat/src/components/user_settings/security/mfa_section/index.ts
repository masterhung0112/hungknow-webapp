// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {deactivateMfa} from 'actions/views/mfa';

import Constants from 'utils/constants';

import {getConfig, getLicense} from 'hkclient-redux/selectors/entities/general';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {GlobalState} from 'hkclient-redux/types/store';
import {UserProfile} from 'hkclient-redux/types/users';
import {ActionFunc} from 'hkclient-redux/types/actions';

import MfaSection from './mfa_section';

type Actions = {
    deactivateMfa: () => Promise<{error?: {message: string}}>;
}

function mapStateToProps(state: GlobalState) {
    const license = getLicense(state);
    const config = getConfig(state);
    const mfaLicensed = license && license.IsLicensed === 'true' && license.MFA === 'true';
    const mfaEnabled = config.EnableMultifactorAuthentication === 'true';
    const mfaEnforced = mfaLicensed && config.EnforceMultifactorAuthentication === 'true';
    const user: UserProfile = getCurrentUser(state);
    let mfaActive = false;
    let mfaAvailable = false;
    if (user) {
        mfaActive = (user as any).mfa_active;
        mfaAvailable = mfaEnabled && (user.auth_service === '' || user.auth_service === Constants.LDAP_SERVICE);
    }
    return {
        mfaActive,
        mfaAvailable,
        mfaEnforced,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            deactivateMfa,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MfaSection);
