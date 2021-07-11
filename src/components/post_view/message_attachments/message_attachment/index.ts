// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {doPostActionWithCookie} from 'hkclient-redux/actions/posts';
import {getCurrentRelativeTeamUrl} from 'hkclient-redux/selectors/entities/teams';
import {GlobalState} from 'hkclient-redux/types/store';
import {ActionFunc, ActionResult, GenericAction} from 'hkclient-redux/types/actions';

import MessageAttachment from './message_attachment';

function mapStateToProps(state: GlobalState) {
    return {
        currentRelativeTeamUrl: getCurrentRelativeTeamUrl(state),
    };
}

type Actions = {
    doPostActionWithCookie: (postId: string, actionId: string, actionCookie: string, selectedOption?: string | undefined) => Promise<ActionResult>;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            doPostActionWithCookie,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageAttachment);
