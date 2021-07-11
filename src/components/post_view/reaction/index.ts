// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {createSelector} from 'reselect';

import {removeReaction} from 'hkclient-redux/actions/posts';
import {getMissingProfilesByIds} from 'hkclient-redux/actions/users';
import {getCurrentUserId, getCurrentUser} from 'hkclient-redux/selectors/entities/users';
import {getChannel} from 'hkclient-redux/selectors/entities/channels';
import {getCustomEmojisByName} from 'hkclient-redux/selectors/entities/emojis';
import {getEmojiImageUrl} from 'hkclient-redux/utils/emoji_utils';
import {haveIChannelPermission} from 'hkclient-redux/selectors/entities/roles';
import Permissions from 'hkclient-redux/constants/permissions';
import Constants from 'hkclient-redux/constants/general';
import {getConfig, getLicense} from 'hkclient-redux/selectors/entities/general';
import {GlobalState} from 'hkclient-redux/types/store';
import {ClientConfig, ClientLicense} from 'hkclient-redux/types/config';
import {GenericAction} from 'hkclient-redux/types/actions';
import {Emoji as EmojiType} from 'hkclient-redux/types/emojis';
import {UserProfile} from 'hkclient-redux/types/users';
import {Post} from 'hkclient-redux/types/posts';
import {Reaction as ReactionType} from 'hkclient-redux/types/reactions';

import {addReaction} from 'actions/post_actions.jsx';

import * as Emoji from 'utils/emoji.jsx';

import Reaction from './reaction';

type Props = {
    emojiName: string;
    post: Post;
    reactions: ReactionType[];
};

function makeMapStateToProps() {
    const didCurrentUserReact = createSelector(
        'didCurrentUserReact',
        getCurrentUserId,
        (state: GlobalState, reactions: ReactionType[]) => reactions,
        (currentUserId: string, reactions: ReactionType[]) => {
            return reactions.some((reaction) => reaction.user_id === currentUserId);
        },
    );

    return function mapStateToProps(state: GlobalState, ownProps: Props) {
        const config = getConfig(state);
        const license = getLicense(state);
        const currentUser = getCurrentUser(state);

        let emoji;
        if (Emoji.EmojiIndicesByAlias.has(ownProps.emojiName)) {
            emoji = Emoji.Emojis[Emoji.EmojiIndicesByAlias.get(ownProps.emojiName) as number];
        } else {
            const emojis = getCustomEmojisByName(state);
            emoji = emojis.get(ownProps.emojiName);
        }

        let emojiImageUrl = '';
        if (emoji) {
            emojiImageUrl = getEmojiImageUrl(emoji as EmojiType);
        }
        const channel = getChannel(state, ownProps.post.channel_id) || {};
        const channelIsArchived = channel.delete_at !== 0;
        const teamId = channel.team_id;
        const currentUserId = getCurrentUserId(state);
        let canAddReaction = false;
        let canRemoveReaction = false;

        if (!channelIsArchived) {
            canAddReaction = checkReactionAction(state, teamId, ownProps.post.channel_id, channel.name, config, license, currentUser, Permissions.REMOVE_REACTION);
            canRemoveReaction = checkReactionAction(state, teamId, ownProps.post.channel_id, channel.name, config, license, currentUser, Permissions.ADD_REACTION);
        }

        return {
            currentUserId,
            reactionCount: ownProps.reactions.length,
            canAddReaction,
            canRemoveReaction,
            emojiImageUrl,
            currentUserReacted: didCurrentUserReact(state, ownProps.reactions),
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            addReaction,
            removeReaction,
            getMissingProfilesByIds,
        }, dispatch),
    };
}

function checkReactionAction(
    state: GlobalState,
    teamId: string,
    channelId: string,
    channelName: string,
    config: Partial<ClientConfig>,
    license: ClientLicense,
    user: UserProfile,
    permission: string,
) {
    if (!haveIChannelPermission(state, teamId, channelId, permission)) {
        return false;
    }

    if (channelName === Constants.DEFAULT_CHANNEL && config.ExperimentalTownSquareIsReadOnly === 'true' && license.IsLicensed === 'true' && !user.roles.includes('system_admin')) {
        return false;
    }

    return true;
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Reaction);
