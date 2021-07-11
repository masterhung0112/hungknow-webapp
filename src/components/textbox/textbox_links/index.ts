// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import Constants from 'utils/constants';
import {isFeatureEnabled} from 'utils/utils';

import {GlobalState} from 'hkclient-redux/types/store';

import TextboxLinks from './textbox_links';

const PreReleaseFeatures = Constants.PRE_RELEASE_FEATURES;

const mapStateToProps = (state: GlobalState) => {
    return ({
        isMarkdownPreviewEnabled: isFeatureEnabled(PreReleaseFeatures.MARKDOWN_PREVIEW, state),
    });
};

export default connect(mapStateToProps)(TextboxLinks);
