// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import {isGuest} from 'utils/utils.jsx';

import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/common';

import ErrorPage from './error_page';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const user = getCurrentUser(state);

    return {
        siteName: config.SiteName,
        asymmetricSigningPublicKey: config.AsymmetricSigningPublicKey,
        isGuest: Boolean(user && isGuest(user)),
    };
}

export default connect(mapStateToProps)(ErrorPage);
