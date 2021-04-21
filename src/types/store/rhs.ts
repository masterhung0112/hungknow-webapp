// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { Post, PostType } from 'hkclient-ts/lib/types/posts'
import { Channel } from 'hkclient-ts/lib/types/channels'
import { UserProfile } from 'hkclient-ts/lib/types/users'
import { FileInfo } from 'hkclient-ts/lib/types/files'
import { $ID } from 'hkclient-ts/lib/types/utilities'

export type FakePost = {
  id: $ID<Post>
  exists: boolean
  type: PostType
  message: string
  channel_id: $ID<Channel>
  user_id: $ID<UserProfile>
}

export type PostDraft = {
  message: string
  fileInfos: FileInfo[]
  uploadsInProgress: string[]
}

export type RhsViewState = {
  selectedPostId: $ID<Post>
  selectedPostFocussedAt: number
  selectedPostCardId: $ID<Post>
  selectedChannelId: $ID<Channel>
  previousRhsState: RhsState
  rhsState: RhsState
  searchTerms: string
  pluggableId: string
  searchResultsTerms: string
  isSearchingFlaggedPost: boolean
  isSearchingPinnedPost: boolean
  isSidebarOpen: boolean
  isSidebarExpanded: boolean
  isMenuOpen: boolean
}

export type RhsState = 'mention' | 'search' | 'flag' | 'pin' | 'plugin' | null
