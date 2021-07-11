// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {connect} from 'react-redux';

import {setNavigationBlocked} from 'actions/admin_actions';

import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {getChannel, getChannelModerations} from 'hkclient-redux/selectors/entities/channels';
import {getAllGroups, getGroupsAssociatedToChannel} from 'hkclient-redux/selectors/entities/groups';
import {getScheme} from 'hkclient-redux/selectors/entities/schemes';
import {getScheme as loadScheme} from 'hkclient-redux/actions/schemes';
import {
    addChannelMember,
    deleteChannel,
    getChannel as fetchChannel,
    getChannelModerations as fetchChannelModerations,
    membersMinusGroupMembers,
    patchChannel,
    patchChannelModerations,
    removeChannelMember,
    unarchiveChannel,
    updateChannelMemberSchemeRoles,
    updateChannelPrivacy,
} from 'hkclient-redux/actions/channels';
import {getTeam as fetchTeam} from 'hkclient-redux/actions/teams';

import {
    getGroupsAssociatedToChannel as fetchAssociatedGroups,
    linkGroupSyncable,
    patchGroupSyncable,
    unlinkGroupSyncable,
} from 'hkclient-redux/actions/groups';

import {getTeam} from 'hkclient-redux/selectors/entities/teams';
import {GlobalState} from 'hkclient-redux/types/store';

import {ActionFunc} from 'hkclient-redux/types/actions';

import ChannelDetails, {ChannelDetailsActions} from './channel_details';

type OwnProps = {
    match: {
        params: {
            channel_id: string;
        };
    };
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const config = getConfig(state);
    const guestAccountsEnabled = config.EnableGuestAccounts === 'true';
    const channelID = ownProps.match.params.channel_id;
    const channel = getChannel(state, channelID) || {};
    const team = getTeam(state, channel.team_id) || {};
    const groups = getGroupsAssociatedToChannel(state, channelID);
    const totalGroups = groups.length;
    const allGroups = getAllGroups(state);
    const channelPermissions = getChannelModerations(state, channelID);
    const teamScheme = getScheme(state, team.scheme_id);
    return {
        channelID,
        channel,
        team,
        groups,
        totalGroups,
        allGroups,
        channelPermissions,
        teamScheme,
        guestAccountsEnabled,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, ChannelDetailsActions>({
            getGroups: fetchAssociatedGroups,
            linkGroupSyncable,
            unlinkGroupSyncable,
            membersMinusGroupMembers,
            setNavigationBlocked: setNavigationBlocked as any,
            getChannel: fetchChannel,
            getTeam: fetchTeam,
            getChannelModerations: fetchChannelModerations,
            patchChannel,
            updateChannelPrivacy,
            patchGroupSyncable,
            patchChannelModerations,
            loadScheme,
            addChannelMember,
            removeChannelMember,
            updateChannelMemberSchemeRoles,
            deleteChannel,
            unarchiveChannel,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetails);
