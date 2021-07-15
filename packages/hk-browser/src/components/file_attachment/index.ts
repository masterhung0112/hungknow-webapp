// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getFilesDropdownPluginMenuItems} from 'selectors/plugins';
import {GlobalState} from 'types/store';
import {canDownloadFiles} from 'utils/file_utils';

import {getConfig} from 'hkclient-redux/selectors/entities/general';

import FileAttachment from './file_attachment';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    return {
        canDownloadFiles: canDownloadFiles(config),
        enableSVGs: config.EnableSVGs === 'true',
        enablePublicLink: config.EnablePublicLink === 'true',
        pluginMenuItems: getFilesDropdownPluginMenuItems(state),
    };
}

export default connect(mapStateToProps)(FileAttachment);
