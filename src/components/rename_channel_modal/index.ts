// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {createSelector} from 'reselect';

import {patchChannel} from 'hkclient-redux/actions/channels';
import {getTeam} from 'hkclient-redux/selectors/entities/teams';
import {GlobalState} from 'hkclient-redux/types/store';
import {ActionFunc, GenericAction} from 'hkclient-redux/types/actions';
import {Channel} from 'hkclient-redux/types/channels';

import {getSiteURL} from 'utils/url';

import RenameChannelModal from './rename_channel_modal';

type Actions = {
    patchChannel(channelId: string, patch: Channel): Promise<{ data: Channel; error: Error }>;
};

const mapStateToPropsRenameChannel = createSelector(
    'mapStateToPropsRenameChannel',
    (state: GlobalState) => {
        const currentTeamId = state.entities.teams.currentTeamId;
        const team = getTeam(state, currentTeamId);
        const currentTeamUrl = `${getSiteURL()}/${team.name}`;
        return {
            currentTeamUrl,
            team,
        };
    },
    (teamInfo) => ({...teamInfo}),
);

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            patchChannel,
        }, dispatch),
    };
}

export default connect(mapStateToPropsRenameChannel, mapDispatchToProps)(RenameChannelModal);
