// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import {canDownloadFiles} from 'utils/file_utils.jsx';

import {getConfig} from 'hkclient-redux/selectors/entities/general';

import FileInfoPreview from './file_info_preview';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    return {
        canDownloadFiles: canDownloadFiles(config),
    };
}

export default connect(mapStateToProps)(FileInfoPreview);