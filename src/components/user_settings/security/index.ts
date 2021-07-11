// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getPasswordConfig} from 'utils/utils.jsx';

import {Preferences} from 'utils/constants';

import {getMe, updateUserPassword} from 'hkclient-redux/actions/users';
import {getAuthorizedOAuthApps, deauthorizeOAuthApp} from 'hkclient-redux/actions/integrations';
import * as UserUtils from 'hkclient-redux/utils/user_utils';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getBool} from 'hkclient-redux/selectors/entities/preferences';
import {GlobalState} from 'hkclient-redux/types/store';
import {UserProfile} from 'hkclient-redux/types/users';
import {ActionFunc, ActionResult} from 'hkclient-redux/types/actions';

import SecurityTab from './user_settings_security';

type Actions = {
    getMe: () => void;
    updateUserPassword: (userId: string, currentPassword: string, newPassword: string) => Promise<ActionResult>;
    getAuthorizedOAuthApps: () => Promise<ActionResult>;
    deauthorizeOAuthApp: (clientId: string) => Promise<ActionResult>;
};

type Props = {
    user: UserProfile;
    activeSection?: string;
    updateSection: (section: string) => void;
    closeModal: () => void;
    collapseModal: () => void;
    setRequireConfirm: () => void;
};

function mapStateToProps(state: GlobalState, ownProps: Props) {
    const config = getConfig(state);

    const tokensEnabled = config.EnableUserAccessTokens === 'true';
    const userHasTokenRole = UserUtils.hasUserAccessTokenRole(ownProps.user.roles) || UserUtils.isSystemAdmin(ownProps.user.roles);

    const enableOAuthServiceProvider = config.EnableOAuthServiceProvider === 'true';
    const enableSignUpWithEmail = config.EnableSignUpWithEmail === 'true';
    const enableSignUpWithGitLab = config.EnableSignUpWithGitLab === 'true';
    const enableSignUpWithGoogle = config.EnableSignUpWithGoogle === 'true';
    const enableSignUpWithOpenId = config.EnableSignUpWithOpenId === 'true';
    const enableLdap = config.EnableLdap === 'true';
    const enableSaml = config.EnableSaml === 'true';
    const enableSignUpWithOffice365 = config.EnableSignUpWithOffice365 === 'true';
    const experimentalEnableAuthenticationTransfer = config.ExperimentalEnableAuthenticationTransfer === 'true';

    return {
        canUseAccessTokens: tokensEnabled && userHasTokenRole,
        enableOAuthServiceProvider,
        enableSignUpWithEmail,
        enableSignUpWithGitLab,
        enableSignUpWithGoogle,
        enableSignUpWithOpenId,
        enableLdap,
        enableSaml,
        enableSignUpWithOffice365,
        experimentalEnableAuthenticationTransfer,
        passwordConfig: getPasswordConfig(config),
        militaryTime: getBool(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.USE_MILITARY_TIME, false),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getMe,
            updateUserPassword,
            getAuthorizedOAuthApps,
            deauthorizeOAuthApp,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityTab);
