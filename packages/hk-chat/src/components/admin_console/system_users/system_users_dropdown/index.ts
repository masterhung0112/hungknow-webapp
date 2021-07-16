// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {GlobalState} from 'types/store';

import {ActionFunc} from 'hkclient-redux/types/actions';

import {updateUserActive, revokeAllSessionsForUser, promoteGuestToUser, demoteUserToGuest} from 'hkclient-redux/actions/users';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {getExternalBotAccounts} from 'hkclient-redux/selectors/entities/bots';
import {loadBots} from 'hkclient-redux/actions/bots';

import {getLicense} from 'hkclient-redux/selectors/entities/general';

import * as Selectors from 'hkclient-redux/selectors/entities/admin';

import SystemUsersDropdown, {Props} from './system_users_dropdown';

function mapStateToProps(state: GlobalState) {
    const bots = getExternalBotAccounts(state);
    const license = getLicense(state);
    return {
        isLicensed: license && license.IsLicensed === 'true',
        config: Selectors.getConfig(state),
        currentUser: getCurrentUser(state),
        bots,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>({
            updateUserActive,
            revokeAllSessionsForUser,
            promoteGuestToUser,
            demoteUserToGuest,
            loadBots,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemUsersDropdown);
