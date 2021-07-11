// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Post, PostType} from 'hkclient-redux/types/posts';
import {Channel} from 'hkclient-redux/types/channels';
import {UserProfile} from 'hkclient-redux/types/users';
import {FileInfo} from 'hkclient-redux/types/files';
import {$ID} from 'hkclient-redux/types/utilities';

export type SearchType = '' | 'files' | 'messages';

export type FakePost = {
    id: $ID<Post>;
    exists: boolean;
    type: PostType;
    message: string;
    channel_id: $ID<Channel>;
    user_id: $ID<UserProfile>;
};

export type PostDraft = {
    message: string;
    fileInfos: FileInfo[];
    uploadsInProgress: string[];
};

export type RhsViewState = {
    selectedPostId: $ID<Post>;
    selectedPostFocussedAt: number;
    selectedPostCardId: $ID<Post>;
    selectedChannelId: $ID<Channel>;
    highlightedPostId: $ID<Post>;
    previousRhsState: RhsState;
    filesSearchExtFilter: string[];
    rhsState: RhsState;
    searchTerms: string;
    searchType: SearchType;
    pluggableId: string;
    searchResultsTerms: string;
    isSearchingFlaggedPost: boolean;
    isSearchingPinnedPost: boolean;
    isSidebarOpen: boolean;
    isSidebarExpanded: boolean;
    isMenuOpen: boolean;
};

export type RhsState = 'mention' | 'search' | 'flag' | 'pin' | 'plugin' | null;
