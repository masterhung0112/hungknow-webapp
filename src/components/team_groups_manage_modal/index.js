// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {closeModal, openModal} from 'actions/views/modals';

import {getGroupsAssociatedToTeam, unlinkGroupSyncable, patchGroupSyncable} from 'hkclient-redux/actions/groups';
import {getMyTeamMembers} from 'hkclient-redux/actions/teams';

import TeamGroupsManageModal from './team_groups_manage_modal';

const mapStateToProps = (state, ownProps) => {
    return {
        team: state.entities.teams.teams[ownProps.teamID],
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        getGroupsAssociatedToTeam,
        closeModal,
        openModal,
        unlinkGroupSyncable,
        patchGroupSyncable,
        getMyTeamMembers,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamGroupsManageModal);
