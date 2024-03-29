// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {trackEvent} from 'actions/telemetry_actions';
import * as PostUtils from 'utils/post_utils.jsx';

import InfiniteScroll from 'components/gif_picker/components/InfiniteScroll';

import {requestCategoriesList, requestCategoriesListIfNeeded, saveSearchBarText, saveSearchScrollPosition, searchTextUpdate} from 'hkclient-redux/actions/gifs';

import './Categories.scss';

function mapStateToProps(state) {
    return {
        ...state.entities.gifs.categories,
        ...state.entities.gifs.cache,
        appProps: state.entities.gifs.app,
        searchText: state.entities.gifs.search.searchText,
        searchBarText: state.entities.gifs.search.searchBarText,
        hasImageProxy: state.entities.general.config.HasImageProxy,
    };
}

const mapDispatchToProps = ({
    saveSearchBarText,
    saveSearchScrollPosition,
    searchTextUpdate,
    requestCategoriesList,
    requestCategoriesListIfNeeded,
});

export class Categories extends PureComponent {
    static propTypes = {
        appProps: PropTypes.object,
        gifs: PropTypes.object,
        hasMore: PropTypes.bool,
        onSearch: PropTypes.func,
        onTrending: PropTypes.func,
        requestCategoriesList: PropTypes.func,
        requestCategoriesListIfNeeded: PropTypes.func,
        saveSearchBarText: PropTypes.func,
        saveSearchScrollPosition: PropTypes.func,
        searchTextUpdate: PropTypes.func,
        searchBarText: PropTypes.string,
        tagsList: PropTypes.array,
        hasImageProxy: PropTypes.string,
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.requestCategoriesListIfNeeded();
        this.sendImpressions();
    }

    sendImpressions = () => {
        const {tagsList} = this.props;
        const gfycats = tagsList.map((tag) => {
            return {gfyId: tag.gfyId};
        });

        if (gfycats.length) {
            trackEvent('gfycat', 'views', {context: 'category_list', count: gfycats.length});
        }
    }

    componentWillUnmount() {
        this.props.saveSearchScrollPosition(0);
    }

    filterTagsList = () => {
        const {searchBarText, tagsList} = this.props;

        const substr = searchBarText.toLowerCase().trim().split(/ +/).join(' ');
        return tagsList && tagsList.length ? tagsList.filter((tag) => {
            if (!searchBarText || tag.tagName.indexOf(substr) !== -1) {
                return tag;
            }
            return '';
        }) : [];
    }

    loadMore = () => {
        this.props.requestCategoriesList();
    }

    render() {
        const {hasMore, tagsList, gifs, onSearch, onTrending, hasImageProxy} = this.props;

        const content = tagsList && tagsList.length ? this.filterTagsList(tagsList).map((item, index) => {
            const {tagName, gfyId} = item;

            if (!gifs[gfyId]) {
                return null;
            }

            const gfyItem = gifs[gfyId];
            const {max1mbGif, avgColor} = gfyItem;
            const url = PostUtils.getImageSrc(max1mbGif, hasImageProxy === 'true');
            const searchText = tagName.replace(/\s/g, '-');
            const backgroundImage = {backgroundImage: `url(${url}`};
            const backgroundColor = {backgroundColor: avgColor};
            const props = this.props;
            function callback() {
                props.searchTextUpdate(tagName);
                props.saveSearchBarText(tagName);
                if (searchText === 'trending') {
                    onTrending();
                } else {
                    onSearch();
                }
            }
            return (
                <a
                    onClick={callback}
                    key={index}
                >
                    <div className='category-container'>
                        <div
                            className='category'
                            style={{...backgroundImage, ...backgroundColor}}
                        >
                            <div className='category-name'>{tagName}</div>
                        </div>
                    </div>
                </a>
            );
        }) : [];

        return content && content.length ? (
            <div
                className='categories-container'
            >
                <InfiniteScroll
                    hasMore={hasMore}
                    loadMore={this.loadMore}
                    threshold={1}
                >
                    {content}
                </InfiniteScroll>
            </div>
        ) : (
            <div
                className='categories-container'
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
