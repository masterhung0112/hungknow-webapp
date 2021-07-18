// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'types/store/index.js';

import {copyToClipboard} from 'utils/utils';

import {getConfig} from 'hkclient-redux/selectors/entities/general';

import CopyUrlContextMenu from './copy_url_context_menu';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    return {
        siteURL: config.SiteURL,
    };
}

function mapDispatchToProps() {
    return {
        actions: {
            copyToClipboard,
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyUrlContextMenu);