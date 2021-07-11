// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import {getTeammateNameDisplaySetting} from 'hkclient-redux/selectors/entities/preferences';
import {getCurrentUserId, getUsersByUsername} from 'hkclient-redux/selectors/entities/users';
import {getAllGroupsForReferenceByName} from 'hkclient-redux/selectors/entities/groups';

import AtMention from './at_mention';

function mapStateToProps(state: GlobalState) {
    return {
        currentUserId: getCurrentUserId(state),
        teammateNameDisplay: getTeammateNameDisplaySetting(state),
        usersByUsername: getUsersByUsername(state),
        groupsByName: getAllGroupsForReferenceByName(state),
    };
}

export default connect(mapStateToProps)(AtMention);
