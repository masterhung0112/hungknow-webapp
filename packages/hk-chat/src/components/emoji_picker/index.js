// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {incrementEmojiPickerPage, setUserSkinTone} from 'actions/emoji_actions';
import {getEmojiMap, getRecentEmojis, getUserSkinTone} from 'selectors/emojis';

import {getCustomEmojis, searchCustomEmojis} from 'hkclient-redux/actions/emojis';
import {getCurrentTeam} from 'hkclient-redux/selectors/entities/teams';

import EmojiPicker from './emoji_picker.jsx';

function mapStateToProps(state) {
    const currentTeam = getCurrentTeam(state);
    return {
        customEmojisEnabled: state.entities.general.config.EnableCustomEmoji === 'true',
        customEmojiPage: state.views.emoji.emojiPickerCustomPage,
        emojiMap: getEmojiMap(state),
        recentEmojis: getRecentEmojis(state),
        userSkinTone: getUserSkinTone(state),
        currentTeamName: currentTeam.name,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getCustomEmojis,
            searchCustomEmojis,
            incrementEmojiPickerPage,
            setUserSkinTone,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmojiPicker);
