// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getTheme} from 'hkclient-redux/selectors/entities/preferences';
import {GlobalState} from 'hkclient-redux/types/store';

import NavigationRow from './navigation_row';

function mapStateToProps(state: GlobalState) {
    return {
        theme: getTheme(state),
    };
}

export default connect(mapStateToProps)(NavigationRow);
