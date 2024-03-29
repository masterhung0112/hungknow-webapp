// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {getExternalBotAccounts} from 'hkclient-redux/selectors/entities/bots';
import {getConfig} from 'hkclient-redux/selectors/entities/general';
import {loadBots, disableBot, enableBot} from 'hkclient-redux/actions/bots';
import {getAppsBotIDs as fetchAppsBotIDs} from 'hkclient-redux/actions/integrations';
import {getAppsBotIDs} from 'hkclient-redux/selectors/entities/integrations';
import {createUserAccessToken, revokeUserAccessToken, enableUserAccessToken, disableUserAccessToken, getUserAccessTokensForUser, getUser} from 'hkclient-redux/actions/users';
import * as UserSelectors from 'hkclient-redux/selectors/entities/users';
import {GlobalState} from 'hkclient-redux/types/store';
import {GenericAction, ActionResult, ActionFunc} from 'hkclient-redux/types/actions';
import {Bot as BotType} from 'hkclient-redux/types/bots';
import {UserProfile} from 'hkclient-redux/types/users';

import {appsEnabled} from 'hkclient-redux/selectors/entities/apps';

import Bots from './bots';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const createBots = config.EnableBotAccountCreation === 'true';
    const bots = getExternalBotAccounts(state);
    const botValues = Object.values(bots);
    const owners = botValues.
        reduce((result: Record<string, UserProfile>, bot: BotType) => {
            result[bot.user_id] = UserSelectors.getUser(state, bot.owner_id);
            return result;
        }, {});
    const users = botValues.
        reduce((result: Record<string, UserProfile>, bot: BotType) => {
            result[bot.user_id] = UserSelectors.getUser(state, bot.user_id);
            return result;
        }, {});

    return {
        createBots,
        bots,
        accessTokens: state.entities.admin.userAccessTokensByUser,
        owners,
        users,
        appsBotIDs: getAppsBotIDs(state),
        appsEnabled: appsEnabled(state),
    };
}

type Actions = {
    fetchAppsBotIDs: () => Promise<{data: string[]}>;
    loadBots: (page?: number, perPage?: number) => Promise<{data: BotType[]; error?: Error}>;
    getUserAccessTokensForUser: (userId: string, page?: number, perPage?: number) => void;
    createUserAccessToken: (userId: string, description: string) => Promise<{
        data: {token: string; description: string; id: string; is_active: boolean} | null;
        error?: Error;
    }>;
    revokeUserAccessToken: (tokenId: string) => Promise<{data: string; error?: Error}>;
    enableUserAccessToken: (tokenId: string) => Promise<{data: string; error?: Error}>;
    disableUserAccessToken: (tokenId: string) => Promise<{data: string; error?: Error}>;
    getUser: (userId: string) => void;
    disableBot: (userId: string) => Promise<ActionResult>;
    enableBot: (userId: string) => Promise<ActionResult>;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            fetchAppsBotIDs,
            loadBots,
            getUserAccessTokensForUser,
            createUserAccessToken,
            revokeUserAccessToken,
            enableUserAccessToken,
            disableUserAccessToken,
            getUser,
            disableBot,
            enableBot,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Bots);
