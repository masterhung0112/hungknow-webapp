// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getConfig} from 'hkclient-ts/lib/selectors/entities/general';
import {getCurrentUser} from 'hkclient-ts/lib/selectors/entities/users';
import {get, makeGetCategory} from 'hkclient-ts/lib/selectors/entities/preferences';
import {savePreferences} from 'hkclient-ts/lib/actions/preferences';
import {updateUserActive, revokeAllSessionsForUser} from 'hkclient-ts/lib/actions/users';

import {Preferences} from 'utils/constants';

import AdvancedSettingsDisplay from './user_settings_advanced.jsx';

function makeMapStateToProps() {
    const getAdvancedSettingsCategory = makeGetCategory();

    return (state) => {
        const config = getConfig(state);

        const enablePreviewFeatures = config.EnablePreviewFeatures === 'true';
        const enableUserDeactivation = config.EnableUserDeactivation === 'true';

        return {
            advancedSettingsCategory: getAdvancedSettingsCategory(state, Preferences.CATEGORY_ADVANCED_SETTINGS),
            sendOnCtrlEnter: get(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'send_on_ctrl_enter', 'false'),
            codeBlockOnCtrlEnter: get(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'code_block_ctrl_enter', 'true'),
            formatting: get(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'formatting', 'true'),
            joinLeave: get(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'join_leave', 'true'),
            currentUser: getCurrentUser(state),
            enablePreviewFeatures,
            enableUserDeactivation,
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            savePreferences,
            updateUserActive,
            revokeAllSessionsForUser,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(AdvancedSettingsDisplay);
