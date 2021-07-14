// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {GlobalState} from 'types/store';

import {getConfig} from 'hkclient-redux/selectors/entities/general';

import NotLoggedIn from './header_footer_template';

function mapStateToProps(state: GlobalState) {
    return {
        config: getConfig(state),
    };
}

export default connect(mapStateToProps)(NotLoggedIn);
