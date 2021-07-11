// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {autocompleteUsersInChannel} from 'actions/views/channel';

import {searchAssociatedGroupsForReference} from 'actions/views/group';

import {autocompleteChannels} from 'actions/channel_actions';

import {getAssociatedGroupsForReference} from 'hkclient-redux/selectors/entities/groups';
import {getLicense} from 'hkclient-redux/selectors/entities/general';
import {getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';
import {makeGetProfilesForThread} from 'hkclient-redux/selectors/entities/posts';

import {haveIChannelPermission} from 'hkclient-redux/selectors/entities/roles';
import Permissions from 'hkclient-redux/constants/permissions';

import {getCurrentUserId, makeGetProfilesInChannel} from 'hkclient-redux/selectors/entities/users';
import {makeAddLastViewAtToProfiles} from 'hkclient-redux/selectors/entities/utils';

import {GlobalState} from 'hkclient-redux/types/store';
import {GenericAction} from 'hkclient-redux/types/actions';

import Textbox from './textbox';

type Props = {
    channelId: string;
    rootId: string;
};

/* eslint-disable camelcase */

const getProfilesInChannelOptions = {active: true};

const makeMapStateToProps = () => {
    const getProfilesInChannel = makeGetProfilesInChannel();
    const addLastViewAtToProfiles = makeAddLastViewAtToProfiles();
    const getProfilesForThread = makeGetProfilesForThread();
    return (state: GlobalState, ownProps: Props) => {
        const teamId = getCurrentTeamId(state);
        const license = getLicense(state);
        const useGroupMentions = license?.IsLicensed === 'true' && license?.LDAPGroups === 'true' && haveIChannelPermission(state,
            teamId,
            ownProps.channelId,
            Permissions.USE_GROUP_MENTIONS,
        );
        const autocompleteGroups = useGroupMentions ? getAssociatedGroupsForReference(state, teamId, ownProps.channelId) : null;
        const profilesInChannel = getProfilesInChannel(state, ownProps.channelId, getProfilesInChannelOptions);
        const profilesWithLastViewAtInChannel = addLastViewAtToProfiles(state, profilesInChannel);

        return {
            currentUserId: getCurrentUserId(state),
            currentTeamId: teamId,
            profilesInChannel: profilesWithLastViewAtInChannel,
            autocompleteGroups,
            priorityProfiles: getProfilesForThread(state, ownProps),
        };
    };
};

const mapDispatchToProps = (dispatch: Dispatch<GenericAction>) => ({
    actions: bindActionCreators({
        autocompleteUsersInChannel,
        autocompleteChannels,
        searchAssociatedGroupsForReference,
    }, dispatch),
});

export default connect(makeMapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Textbox);
