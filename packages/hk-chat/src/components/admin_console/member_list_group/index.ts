// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {setModalSearchTerm} from 'actions/views/search';

import {GlobalState} from 'types/store';

import {getGroupStats} from 'hkclient-redux/actions/groups';
import {searchProfiles, getProfilesInGroup} from 'hkclient-redux/actions/users';

import {getGroupMemberCount} from 'hkclient-redux/selectors/entities/groups';
import {getProfilesInGroup as selectProfiles, searchProfilesInGroup} from 'hkclient-redux/selectors/entities/users';

import {ActionFunc, GenericAction} from 'hkclient-redux/types/actions';

import MemberListGroup, {Props as MemberListGroupProps} from './member_list_group';

type Props = {
    groupID: string;
}

function mapStateToProps(state: GlobalState, ownProps: Props) {
    const {groupID} = ownProps;
    const searchTerm = state.views.search.modalSearch;
    let users;
    if (searchTerm) {
        users = searchProfilesInGroup(state, groupID, searchTerm);
    } else {
        users = selectProfiles(state, groupID);
    }

    return {
        searchTerm,
        users,
        total: getGroupMemberCount(state, groupID) || 0,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, MemberListGroupProps['actions']>({
            getProfilesInGroup,
            searchProfiles,
            setModalSearchTerm,
            getGroupStats,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberListGroup);
