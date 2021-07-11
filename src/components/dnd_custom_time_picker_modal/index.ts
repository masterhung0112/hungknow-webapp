// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {bindActionCreators, Dispatch} from 'redux';

import {GlobalState} from 'types/store';

import {setStatus} from 'hkclient-redux/actions/users';

import {getCurrentUserId} from 'hkclient-redux/selectors/entities/users';

import DndCustomTimePicker from './dnd_custom_time_picker_modal';

function mapStateToProps(state: GlobalState) {
    const userId = getCurrentUserId(state);

    return {
        userId,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators({
            setStatus,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DndCustomTimePicker);
