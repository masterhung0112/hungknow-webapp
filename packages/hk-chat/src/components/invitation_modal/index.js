// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {isEmpty} from 'lodash';

import {closeModal, openModal} from 'actions/views/modals';

import {isModalOpen} from 'selectors/views/modals';

import {ModalIdentifiers, Constants} from 'utils/constants';

import {isAdmin} from 'utils/utils';

import {sendMembersInvites, sendGuestsInvites} from 'actions/invite_actions';

import {getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';
import {getChannelsInCurrentTeam} from 'hkclient-redux/selectors/entities/channels';
import {haveIChannelPermission, haveICurrentTeamPermission} from 'hkclient-redux/selectors/entities/roles';
import {getConfig, getLicense, getSubscriptionStats} from 'hkclient-redux/selectors/entities/general';
import {getProfiles, searchProfiles as reduxSearchProfiles} from 'hkclient-redux/actions/users';
import {getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {searchChannels as reduxSearchChannels} from 'hkclient-redux/actions/channels';
import {getTeam} from 'hkclient-redux/actions/teams';
import {Permissions} from 'hkclient-redux/constants';

import InvitationModal from './invitation_modal.jsx';

const searchProfiles = (term, options = {}) => {
    if (!term) {
        return getProfiles(0, 20, options);
    }
    return reduxSearchProfiles(term, options);
};

const searchChannels = (teamId, term) => {
    return reduxSearchChannels(teamId, term);
};

export function mapStateToProps(state) {
    const config = getConfig(state);
    const license = getLicense(state);
    const channels = getChannelsInCurrentTeam(state);
    const currentTeam = getCurrentTeam(state);
    const subscriptionStats = getSubscriptionStats(state);
    const invitableChannels = channels.filter((channel) => {
        if (channel.type === Constants.DM_CHANNEL || channel.type === Constants.GM_CHANNEL) {
            return false;
        }
        if (channel.type === Constants.PRIVATE_CHANNEL) {
            return haveIChannelPermission(state, currentTeam.id, channel.id, Permissions.MANAGE_PRIVATE_CHANNEL_MEMBERS);
        }
        return haveIChannelPermission(state, currentTeam.id, channel.id, Permissions.MANAGE_PUBLIC_CHANNEL_MEMBERS);
    });
    const guestAccountsEnabled = config.EnableGuestAccounts === 'true';
    const emailInvitationsEnabled = config.EnableEmailInvitations === 'true';
    const isLicensed = license && license.IsLicensed === 'true';
    const isGroupConstrained = Boolean(currentTeam.group_constrained);
    const canInviteGuests = !isGroupConstrained && isLicensed && guestAccountsEnabled && haveICurrentTeamPermission(state, Permissions.INVITE_GUEST);
    const isCloud = license.Cloud === 'true';
    const isFreeTierWithNoFreeSeats = isCloud && !isEmpty(subscriptionStats) && subscriptionStats.is_paid_tier === 'false' && subscriptionStats.remaining_seats <= 0;

    const canAddUsers = haveICurrentTeamPermission(state, Permissions.ADD_USER_TO_TEAM);
    return {
        invitableChannels,
        currentTeam,
        canInviteGuests,
        canAddUsers,
        isFreeTierWithNoFreeSeats,
        emailInvitationsEnabled,
        show: isModalOpen(state, ModalIdentifiers.INVITATION),
        isCloud,
        userIsAdmin: isAdmin(getCurrentUser(state).roles),
        cloudUserLimit: config.ExperimentalCloudUserLimit || '10',
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            closeModal: () => closeModal(ModalIdentifiers.INVITATION),
            sendGuestsInvites,
            sendMembersInvites,
            searchProfiles,
            searchChannels,
            getTeam,
            openModal: (modalData) => openModal(modalData),
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationModal);
