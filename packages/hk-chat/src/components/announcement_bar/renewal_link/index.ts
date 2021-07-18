// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {openModal} from 'actions/views/modals';

import {GenericAction} from 'hkclient-redux/types/actions';

import RenewalLink from './renewal_link';

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators(
            {
                openModal,
            },
            dispatch,
        ),
    };
}

export default connect(null, mapDispatchToProps)(RenewalLink);