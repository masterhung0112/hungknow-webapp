// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react'

import Permissions from 'hkclient-ts/lib/constants/permissions'
import { Client4 } from 'hkclient-ts/lib/client'
import { CustomEmoji } from 'hkclient-ts/lib/types/emojis'
import { ActionFunc } from 'hkclient-ts/lib/types/actions'

import DeleteEmoji from 'components/emoji/delete_emoji_modal'
import AnyTeamPermissionGate from 'components/permissions_gates/any_team_permission_gate'

export type Props = {
  emoji: CustomEmoji
  emojiId?: string
  currentUserId: string
  creatorDisplayName: string
  creatorUsername?: string
  onDelete?: (emojiId: string) => void
  actions: {
    deleteCustomEmoji: (emojiId: string) => ActionFunc
  }
}

export default class EmojiListItem extends React.PureComponent<Props> {
  static defaultProps = {
    emoji: {} as CustomEmoji,
    currentUserId: '',
    creatorDisplayName: '',
  }

  handleDelete = (): void => {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.emoji.id)
    }

    this.props.actions.deleteCustomEmoji(this.props.emoji.id)
  }

  render(): JSX.Element {
    const emoji = this.props.emoji
    const creatorUsername = this.props.creatorUsername
    let creatorDisplayName = this.props.creatorDisplayName

    if (creatorUsername && creatorUsername !== creatorDisplayName) {
      creatorDisplayName += ' (@' + creatorUsername + ')'
    }

    let deleteButton: JSX.Element
    if (emoji.creator_id === this.props.currentUserId) {
      deleteButton = (
        <AnyTeamPermissionGate permissions={[Permissions.DELETE_EMOJIS]}>
          <DeleteEmoji onDelete={this.handleDelete} />
        </AnyTeamPermissionGate>
      )
    } else {
      deleteButton = (
        <AnyTeamPermissionGate permissions={[Permissions.DELETE_EMOJIS]}>
          <AnyTeamPermissionGate permissions={[Permissions.DELETE_OTHERS_EMOJIS]}>
            <DeleteEmoji onDelete={this.handleDelete} />
          </AnyTeamPermissionGate>
        </AnyTeamPermissionGate>
      )
    }

    return (
      <tr className="backstage-list__item">
        <td className="emoji-list__name">{':' + emoji.name + ':'}</td>
        <td className="emoji-list__image">
          <span
            className="emoticon"
            style={{ backgroundImage: 'url(' + Client4.getCustomEmojiImageUrl(emoji.id) + ')' }}
          />
        </td>
        <td className="emoji-list__creator">{creatorDisplayName}</td>
        <td className="emoji-list-item_actions">{deleteButton}</td>
      </tr>
    )
  }
}