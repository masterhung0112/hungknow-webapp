// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {updateUserPassword} from 'hkclient-redux/actions/users';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getCurrentUserId} from 'hkclient-redux/selectors/entities/users';
import {ActionFunc, ActionResult} from 'hkclient-redux/types/actions';

import {GlobalState} from 'types/store';

import {getPasswordConfig} from 'utils/utils.jsx';

import ResetPasswordModal from './reset_password_modal';

type Actions = {
    updateUserPassword: (userId: string, currentPassword: string, password: string) => ActionResult;
}

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    return {
        currentUserId: getCurrentUserId(state),
        passwordConfig: getPasswordConfig(config),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            updateUserPassword,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordModal);
