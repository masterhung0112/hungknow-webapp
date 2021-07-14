// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {getEmojiMap} from 'selectors/emojis';

import {GlobalState} from 'types/store';

import {createCustomEmoji} from 'hkclient-redux/actions/emojis';

import {ActionFunc, ActionResult, GenericAction} from 'hkclient-redux/types/actions';
import {CustomEmoji} from 'hkclient-redux/types/emojis';

import AddEmoji from './add_emoji';

type Actions = {
    createCustomEmoji: (emoji: CustomEmoji, imageData: File) => Promise<ActionResult>;
};

function mapStateToProps(state: GlobalState) {
    return {
        emojiMap: getEmojiMap(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            createCustomEmoji,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEmoji);
