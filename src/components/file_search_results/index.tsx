// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import {getChannel} from 'hkclient-redux/selectors/entities/channels';

import FileSearchResultItem from './file_search_result_item';

type OwnProps = {
    channelId: string;
};

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const channel = getChannel(state, ownProps.channelId);

    return {
        channelDisplayName: '',
        channelType: channel.type,
    };
}

export default connect(mapStateToProps)(FileSearchResultItem);
