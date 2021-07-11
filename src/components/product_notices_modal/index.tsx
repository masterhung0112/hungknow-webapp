// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {ActionFunc} from 'hkclient-redux/types/actions';
import {ProductNotices} from 'hkclient-redux/types/product_notices';
import {WebsocketStatus} from 'hkclient-redux/types/websocket';
import {getInProductNotices, updateNoticesAsViewed} from 'hkclient-redux/actions/teams';
import {getCurrentTeamId} from 'hkclient-redux/selectors/entities/teams';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {ClientConfig} from 'hkclient-redux/types/config';

import {getSocketStatus} from 'selectors/views/websocket';
import {GlobalState} from 'types/store';

import ProductNoticesModal from './product_notices_modal';

type Actions = {
    getInProductNotices: (teamId: string, client: string, clientVersion: string) => Promise<{
        data: ProductNotices;
    }>;
    updateNoticesAsViewed: (noticeIds: string[]) => Promise<Record<string, unknown>>;
}

function mapStateToProps(state: GlobalState) {
    const config: Partial<ClientConfig> = getConfig(state);
    const version: string = config.Version || ''; //this should always exist but TS throws error
    const socketStatus: WebsocketStatus = getSocketStatus(state);

    return {
        currentTeamId: getCurrentTeamId(state),
        version,
        socketStatus,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getInProductNotices,
            updateNoticesAsViewed,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductNoticesModal);
