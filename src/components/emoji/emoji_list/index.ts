// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { connect } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux'

import { getCustomEmojiIdsSortedByName } from 'hkclient-ts/lib/selectors/entities/emojis'
import { ActionFunc, GenericAction } from 'hkclient-ts/lib/types/actions'
import { getCustomEmojis, searchCustomEmojis } from 'hkclient-ts/lib/actions/emojis'
import { GlobalState } from 'hkclient-ts/lib/types/store'
import { CustomEmoji } from 'hkclient-ts/lib/types/emojis'
import { ServerError } from 'hkclient-ts/lib/types/errors'

import EmojiList from './emoji_list'

type Actions = {
  getCustomEmojis: (
    page?: number,
    perPage?: number,
    sort?: string,
    loadUsers?: boolean
  ) => Promise<{ data: CustomEmoji[]; error: ServerError }>
  searchCustomEmojis: (
    term: string,
    options: any,
    loadUsers: boolean
  ) => Promise<{ data: CustomEmoji[]; error: ServerError }>
}

function mapStateToProps(state: GlobalState) {
  return {
    emojiIds: getCustomEmojiIdsSortedByName(state) || [],
  }
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>(
      {
        getCustomEmojis,
        searchCustomEmojis,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmojiList)
