// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {GlobalState} from 'types/store';

import {sendEmailInvitesToTeamGracefully, regenerateTeamInviteId} from 'hkclient-redux/actions/teams';
import {getConfig, getLicense, getSubscriptionStats} from 'hkclient-redux/selectors/entities/general';
import {getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';
import {GenericAction, ActionFunc} from 'hkclient-redux/types/actions';
import {ServerError} from 'hkclient-redux/types/errors';
import {TeamInviteWithError} from 'hkclient-redux/types/teams';

import InviteMembersStep from './invite_members_step';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    return {
        team: getCurrentTeam(state),
        isEmailInvitesEnabled: config.EnableEmailInvitations === 'true',
        isCloud: getLicense(state).Cloud === 'true',
        cloudUserLimit: config.ExperimentalCloudUserLimit || 10,
        subscriptionStats: getSubscriptionStats(state),
    };
}

type Actions = {
    sendEmailInvitesToTeamGracefully: (teamId: string, emails: string[]) => Promise<{ data: TeamInviteWithError[]; error: ServerError }>;
    regenerateTeamInviteId: (teamId: string) => void;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            sendEmailInvitesToTeamGracefully,
            regenerateTeamInviteId,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteMembersStep);
