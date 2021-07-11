// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import {getDirectTeammate} from 'hkclient-redux/selectors/entities/channels';
import {getCurrentUserId} from 'hkclient-redux/selectors/entities/users';
import {Channel} from 'hkclient-redux/types/channels';

import SearchChannelSuggestion from './search_channel_suggestion';

type OwnProps = {
    item: Channel;
}

const mapStateToProps = (state: GlobalState, ownProps: OwnProps) => {
    return {
        teammate: getDirectTeammate(state, ownProps.item.id),
        currentUser: getCurrentUserId(state),
    };
};

export default connect(mapStateToProps, null, null, {forwardRef: true})(SearchChannelSuggestion);
