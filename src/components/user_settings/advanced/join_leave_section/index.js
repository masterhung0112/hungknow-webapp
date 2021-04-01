// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {savePreferences} from 'hkclient-ts/lib/actions/preferences';
import {Preferences} from 'hkclient-ts/lib/constants';
import {get as getPreference} from 'hkclient-ts/lib/selectors/entities/preferences';
import {getCurrentUserId} from 'hkclient-ts/lib/selectors/entities/users';

import JoinLeaveSection from './join_leave_section.jsx';

function mapStateToProps(state) {
    const joinLeave = getPreference(
        state,
        Preferences.CATEGORY_ADVANCED_SETTINGS,
        Preferences.ADVANCED_FILTER_JOIN_LEAVE,
        'true',
    );

    return {
        currentUserId: getCurrentUserId(state),
        joinLeave,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            savePreferences,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinLeaveSection);
