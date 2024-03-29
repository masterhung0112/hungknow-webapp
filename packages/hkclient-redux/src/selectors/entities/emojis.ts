// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'hkreselect';

import {getConfig} from 'selectors/entities/general';

import {CustomEmoji} from 'types/emojis';
import {GlobalState} from 'types/store';
import {IDMappedObjects} from 'types/utilities';

import {createIdsSelector} from 'utils/helpers';

export const getCustomEmojis: (state: GlobalState) => IDMappedObjects<CustomEmoji> = createSelector(
    'getCustomEmojis',
    getConfig,
    (state) => state.entities.emojis.customEmoji,
    (config, customEmoji) => {
        if (config.EnableCustomEmoji !== 'true') {
            return {};
        }

        return customEmoji;
    },
);

export const getCustomEmojisAsMap: (state: GlobalState) => Map<string, CustomEmoji> = createSelector(
    'getCustomEmojisAsMap',
    getCustomEmojis,
    (emojis) => {
        const map = new Map();
        Object.keys(emojis).forEach((key: string) => {
            map.set(key, emojis[key]);
        });
        return map;
    },
);

export const getCustomEmojisByName: (state: GlobalState) => Map<string, CustomEmoji> = createSelector(
    'getCustomEmojisByName',
    getCustomEmojis,
    (emojis: IDMappedObjects<CustomEmoji>): Map<string, CustomEmoji> => {
        const map: Map<string, CustomEmoji> = new Map();

        Object.keys(emojis).forEach((key: string) => {
            map.set(emojis[key].name, emojis[key]);
        });

        return map;
    },
);

export const getCustomEmojiIdsSortedByName: (state: GlobalState) => string[] = createIdsSelector(
    'getCustomEmojiIdsSortedByName',
    getCustomEmojis,
    (emojis: IDMappedObjects<CustomEmoji>): string[] => {
        return Object.keys(emojis).sort(
            (a: string, b: string): number => emojis[a].name.localeCompare(emojis[b].name),
        );
    },
);
