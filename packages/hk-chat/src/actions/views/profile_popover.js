// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {getTeamMember} from 'hkclient-redux/actions/teams';
import {getChannelMember} from 'hkclient-redux/actions/channels';

export function getMembershipForEntities(teamId, userId, channelId) {
    return async (dispatch) => {
        return Promise.all([
            dispatch(getTeamMember(teamId, userId)),
            channelId && dispatch(getChannelMember(channelId, userId)),
        ]);
    };
}