// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {DoAppCall, PostEphemeralCallResponseForPost} from 'types/apps';

import {doAppCall, postEphemeralCallResponseForPost} from 'actions/apps';

import {ActionFunc, ActionResult, GenericAction} from 'hkclient-redux/types/actions';

import {getChannel} from 'hkclient-redux/actions/channels';

import SelectBinding from './select_binding';

type Actions = {
    doAppCall: DoAppCall;
    getChannel: (channelId: string) => Promise<ActionResult>;
    postEphemeralCallResponseForPost: PostEphemeralCallResponseForPost;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            doAppCall,
            getChannel,
            postEphemeralCallResponseForPost,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(SelectBinding);