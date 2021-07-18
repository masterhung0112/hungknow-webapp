// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {goToLastViewedChannel} from 'actions/views/channel';

import {GenericAction} from 'hkclient-redux/types/actions';

import CloseChannel from './close_channel';

const mapDispatchToProps = (dispatch: Dispatch<GenericAction>) => ({
    actions: bindActionCreators({
        goToLastViewedChannel,
    }, dispatch),
});

export default connect(null, mapDispatchToProps)(CloseChannel);