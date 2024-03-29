// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {IntlShape} from 'react-intl';

import {SearchType} from 'types/store/rhs';

import {Post} from 'hkclient-redux/types/posts';
import {FileInfo} from 'hkclient-redux/types/files';

import {SearchFilterType} from '../search/types';

export type OwnProps = {
    [key: string]: any;
    isSideBarExpanded: boolean;
    isMentionSearch: boolean;
    isFlaggedPosts: boolean;
    isPinnedPosts: boolean;
    updateSearchTerms: (terms: string) => void;
    getMorePostsForSearch: () => void;
    getMoreFilesForSearch: () => void;
    shrink: () => void;
    isCard?: boolean;
    isOpened?: boolean;
    channelDisplayName?: string;
    children?: React.ReactNode;
    searchType: SearchType;
    setSearchType: (searchType: SearchType) => void;
    searchFilterType: SearchFilterType;
    setSearchFilterType: (filterType: SearchFilterType) => void;
}

export type StateProps = {
    results: Post[];
    fileResults: FileInfo[];
    matches: Record<string, string[]>;
    searchTerms: string;
    isSearchingTerm: boolean;
    isSearchingFlaggedPost: boolean;
    isSearchingPinnedPost: boolean;
    isSearchGettingMore: boolean;
    isSearchAtEnd: boolean;
    isSearchFilesAtEnd: boolean;
    compactDisplay: boolean;
}

export type IntlProps = {
    intl: IntlShape;
}

export type Props = OwnProps & StateProps & IntlProps;

