// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'hkreselect';

import {getAllChannels} from 'hkclient-redux/selectors/entities/channels';

export const getChannelsForChannelSelector = createSelector(
    'getChannelsForChannelSelector',
    (state) => state.views.channelSelectorModal.channels,
    getAllChannels,
    (channelIds, channels) => {
        if (channelIds) {
            return channelIds.map((id) => channels[id]);
        }
        return [];
    },
);