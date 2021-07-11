// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getCustomEmojiIdsSortedByName} from 'hkclient-redux/selectors/entities/emojis';
import {ActionFunc, GenericAction} from 'hkclient-redux/types/actions';
import {getCustomEmojis, searchCustomEmojis} from 'hkclient-redux/actions/emojis';
import {GlobalState} from 'hkclient-redux/types/store';
import {CustomEmoji} from 'hkclient-redux/types/emojis';
import {ServerError} from 'hkclient-redux/types/errors';

import EmojiList from './emoji_list';

type Actions = {
    getCustomEmojis: (page?: number, perPage?: number, sort?: string, loadUsers?: boolean) => Promise<{ data: CustomEmoji[]; error: ServerError }>;
    searchCustomEmojis: (term: string, options: any, loadUsers: boolean) => Promise<{ data: CustomEmoji[]; error: ServerError }>;
}

function mapStateToProps(state: GlobalState) {
    return {
        emojiIds: getCustomEmojiIdsSortedByName(state) || [],
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getCustomEmojis,
            searchCustomEmojis,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmojiList);
