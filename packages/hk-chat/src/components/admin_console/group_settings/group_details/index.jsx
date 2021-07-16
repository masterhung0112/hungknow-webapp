// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setNavigationBlocked} from 'actions/admin_actions';

import {
    linkGroupSyncable,
    unlinkGroupSyncable,
    getGroup as fetchGroup,
    getGroupStats,
    getGroupSyncables as fetchGroupSyncables,
    patchGroupSyncable,
    patchGroup,
} from 'hkclient-redux/actions/groups';
import {getProfilesInGroup} from 'hkclient-redux/actions/users';
import {getGroup, getGroupTeams, getGroupChannels, getGroupMemberCount} from 'hkclient-redux/selectors/entities/groups';
import {getProfilesInGroup as selectProfilesInGroup} from 'hkclient-redux/selectors/entities/users';

import GroupDetails from './group_details.jsx';

function mapStateToProps(state, props) {
    const groupID = props.match.params.group_id;
    const group = getGroup(state, groupID);
    const groupTeams = getGroupTeams(state, groupID);
    const groupChannels = getGroupChannels(state, groupID);
    const members = selectProfilesInGroup(state, groupID);
    const memberCount = getGroupMemberCount(state, groupID);

    return {
        groupID,
        group,
        groupTeams,
        groupChannels,
        members,
        memberCount,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setNavigationBlocked,
            getGroup: fetchGroup,
            getMembers: getProfilesInGroup,
            getGroupStats,
            getGroupSyncables: fetchGroupSyncables,
            link: linkGroupSyncable,
            unlink: unlinkGroupSyncable,
            patchGroupSyncable,
            patchGroup,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);
