// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {GlobalState} from 'types/store';

import {
    updateMe,
    setDefaultProfileImage,
    uploadProfileImage,
} from 'hkclient-redux/actions/users';
import {getConfig} from 'hkclient-redux/selectors/entities/general';

import CompleteProfileStep from './complete_profile_step';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    return {
        maxFileSize: parseInt(config.MaxFileSize!, 10),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators({
            updateMe,
            setDefaultProfileImage,
            uploadProfileImage,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfileStep);