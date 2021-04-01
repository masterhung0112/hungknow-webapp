// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCurrentUser} from 'hkclient-ts/lib/selectors/entities/users';
import {GlobalState} from 'hkclient-ts/lib/types/store';

import UserSettings from './user_settings';

function mapStateToProps(state: GlobalState) {
    return {
        user: getCurrentUser(state),
    };
}

export default connect(mapStateToProps)(UserSettings);
