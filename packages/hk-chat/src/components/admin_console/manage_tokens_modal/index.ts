// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {GlobalState} from 'types/store';

import {getUserAccessTokensForUser} from 'hkclient-redux/actions/users';
import {ActionFunc} from 'hkclient-redux/types/actions';

import ManageTokensModal, {Props} from './manage_tokens_modal';

function mapStateToProps(state: GlobalState, ownProps: Props) {
    const userId = ownProps.user ? ownProps.user.id : '';

    const userAccessTokens = state.entities.admin.userAccessTokensByUser;

    return {
        userAccessTokens: userAccessTokens === undefined ? undefined : userAccessTokens[userId],
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>({
            getUserAccessTokensForUser,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTokensModal);
