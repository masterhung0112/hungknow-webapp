// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import {getConfig} from 'hkclient-redux/selectors/entities/general';

import FileThumbnail from './file_thumbnail';

function mapStateToProps(state: GlobalState) {
    return {
        enableSVGs: getConfig(state).EnableSVGs === 'true',
    };
}

export default connect(mapStateToProps)(FileThumbnail);
