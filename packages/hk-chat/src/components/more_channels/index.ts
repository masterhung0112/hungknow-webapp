// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {searchMoreChannels} from 'actions/channel_actions.jsx';

import {openModal, closeModal} from 'actions/views/modals';

import {createSelector} from 'hkreselect';

import {RequestStatus} from 'hkclient-redux/constants';
import {Channel} from 'hkclient-redux/types/channels';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {ActionFunc, ActionResult} from 'hkclient-redux/types/actions';
import {getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';
import {getCurrentUserId} from 'hkclient-redux/selectors/entities/users';
import {getChannels, getArchivedChannels, joinChannel} from 'hkclient-redux/actions/channels';
import {getOtherChannels, getChannelsInCurrentTeam} from 'hkclient-redux/selectors/entities/channels';

import {GlobalState} from '../../types/store';

import MoreChannels from './more_channels';

const getNotArchivedOtherChannels = createSelector(
    'getNotArchivedOtherChannels',
    getOtherChannels,
    (channels: Channel[]) => channels && channels.filter((c) => c.delete_at === 0),
);

const getArchivedOtherChannels = createSelector(
    'getArchivedOtherChannels',
    getChannelsInCurrentTeam,
    (channels: Channel[]) => channels && channels.filter((c) => c.delete_at !== 0),
);

function mapStateToProps(state: GlobalState) {
    const team = getCurrentTeam(state) || {};

    return {
        channels: getNotArchivedOtherChannels(state) || [],
        archivedChannels: getArchivedOtherChannels(state) || [],
        currentUserId: getCurrentUserId(state),
        teamId: team.id,
        teamName: team.name,
        channelsRequestStarted: state.requests.channels.getChannels.status === RequestStatus.STARTED,
        canShowArchivedChannels: (getConfig(state).ExperimentalViewArchivedChannels === 'true'),
    };
}

type Actions = {
    getChannels: (teamId: string, page: number, perPage: number) => ActionFunc | void;
    getArchivedChannels: (teamId: string, page: number, channelsPerPage: number) => ActionFunc | void;
    joinChannel: (currentUserId: string, teamId: string, channelId: string) => Promise<ActionResult>;
    searchMoreChannels: (term: string, shouldShowArchivedChannels: boolean) => Promise<ActionResult>;
    openModal: (modalData: {modalId: string; dialogType: any; dialogProps?: any}) => Promise<{
        data: boolean;
    }>;
    closeModal: (modalId: string) => void;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getChannels,
            getArchivedChannels,
            joinChannel,
            searchMoreChannels,
            openModal,
            closeModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreChannels);