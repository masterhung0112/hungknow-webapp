// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {createSelector} from 'reselect';

import {getMyChannels} from 'hkclient-redux/selectors/entities/channels';
import {getCurrentUserLocale} from 'hkclient-redux/selectors/entities/i18n';
import {sortChannelsByTypeAndDisplayName} from 'hkclient-redux/utils/channel_utils';

import {GlobalState} from 'hkclient-redux/types/store';

import ChannelSelect from './channel_select';

const getMyChannelsSorted = createSelector(
    'getMyChannelsSorted',
    getMyChannels,
    getCurrentUserLocale,
    (channels, locale) => {
        return [...channels].sort(sortChannelsByTypeAndDisplayName.bind(null, locale));
    },
);

function mapStateToProps(state: GlobalState) {
    return {
        channels: getMyChannelsSorted(state),
    };
}

export default connect(mapStateToProps)(ChannelSelect);
