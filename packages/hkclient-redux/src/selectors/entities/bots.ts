// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'hkreselect';
import {Bot} from 'types/bots';
import {GlobalState} from 'types/store';
import {Dictionary} from 'types/utilities';
import {getUsers} from 'selectors/entities/common';

export const ExternalBotAccountNames: string[] = ['mattermost-advisor'];

export function getBotAccounts(state: GlobalState) {
    return state.entities.bots.accounts;
}

export const getExternalBotAccounts: (state: GlobalState) => Dictionary<Bot> = createSelector(
    'getExternalBotAccounts',
    getBotAccounts,
    getUsers,
    (botAccounts, userProfiles) => {
        const nextState: Dictionary<Bot> = {};
        Object.values(botAccounts).forEach((botAccount) => {
            const botUser = userProfiles[botAccount.user_id];
            if (botUser && !ExternalBotAccountNames.includes(botUser.username)) {
                nextState[botAccount.user_id] = botAccount;
            }
        });

        return nextState;
    },
);
