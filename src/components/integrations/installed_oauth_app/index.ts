// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getDisplayNameByUser} from 'utils/utils';

import {getUser} from 'hkclient-redux/selectors/entities/users';
import {GlobalState} from 'hkclient-redux/types/store';

import InstalledOAuthApp, {InstalledOAuthAppProps} from './installed_oauth_app';

function mapStateToProps(state: GlobalState, ownProps: InstalledOAuthAppProps) {
    const oauthApp = ownProps.oauthApp || {};
    return {
        creatorName: getDisplayNameByUser(state, getUser(state, oauthApp.creator_id)),
    };
}

export default connect(mapStateToProps)(InstalledOAuthApp);
