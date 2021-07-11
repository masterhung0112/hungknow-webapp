// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import LocalStorageStore from 'stores/local_storage_store';

import {Constants, Preferences} from 'utils/constants';

import {getItemFromStorage} from 'selectors/storage';

import EmojiMap from 'utils/emoji_map';

import {createSelector} from 'reselect';

import {getCustomEmojisByName} from 'hkclient-redux/selectors/entities/emojis';
import {getCurrentUserId} from 'hkclient-redux/selectors/entities/users';
import {getConfig} from 'hkclient-redux/selectors/entities/general';

import {get} from 'hkclient-redux/selectors/entities/preferences';

export const getEmojiMap = createSelector(
    'getEmojiMap',
    getCustomEmojisByName,
    (customEmojisByName) => {
        return new EmojiMap(customEmojisByName);
    },
);

export const getShortcutReactToLastPostEmittedFrom = (state) => state.views.emoji.shortcutReactToLastPostEmittedFrom;

export const getRecentEmojis = createSelector(
    'getRecentEmojis',
    (state) => state.storage,
    getCurrentUserId,
    (storage, currentUserId) => {
        const recentEmojis = LocalStorageStore.getRecentEmojis(currentUserId) ||
            JSON.parse(getItemFromStorage(storage.storage, Constants.RECENT_EMOJI_KEY, null)); // Prior to release v5.9, recent emojis were saved as object in localforage.

        if (!recentEmojis) {
            return [];
        }

        return recentEmojis;
    },
);

export function getUserSkinTone(state) {
    return get(state, Preferences.CATEGORY_EMOJI, Preferences.EMOJI_SKINTONE, 'default');
}

export function isCustomEmojiEnabled(state) {
    const config = getConfig(state);
    return config && config.EnableCustomEmoji === 'true';
}
