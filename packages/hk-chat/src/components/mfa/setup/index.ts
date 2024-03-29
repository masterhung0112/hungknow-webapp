// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {activateMfa, generateMfaSecret} from 'actions/views/mfa';

import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {GlobalState} from 'hkclient-redux/types/store';
import {GenericAction, ActionFunc} from 'hkclient-redux/types/actions';

import Setup from './setup';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    const siteName = config.SiteName;
    const enforceMultifactorAuthentication = config.EnforceMultifactorAuthentication === 'true';

    return {
        currentUser: getCurrentUser(state),
        siteName,
        enforceMultifactorAuthentication,
    };
}

type Actions = {
    activateMfa: (code: string) => Promise<{ error?: { server_error_id: string; message: string } }>;
    generateMfaSecret: () => Promise<{data: { secret: string; qr_code: string }; error?: { message: string }}>;
};

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            activateMfa,
            generateMfaSecret,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
