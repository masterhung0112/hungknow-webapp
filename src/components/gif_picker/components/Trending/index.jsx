// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import SearchGrid from 'components/gif_picker/components/SearchGrid';

import {
    searchCategory,
    searchIfNeededInitial,
    saveSearchScrollPosition,
} from 'hkclient-redux/actions/gifs';

const mapDispatchToProps = ({
    searchCategory,
    searchIfNeededInitial,
    saveSearchScrollPosition,
});

export class Trending extends PureComponent {
    static propTypes = {
        handleItemClick: PropTypes.func,
        onCategories: PropTypes.func,
        searchCategory: PropTypes.func,
        searchIfNeededInitial: PropTypes.func,
        saveSearchScrollPosition: PropTypes.func,
    }

    componentDidMount() {
        this.props.searchIfNeededInitial('trending');
    }

    componentWillUnmount() {
        this.props.saveSearchScrollPosition(0);
    }

    loadMore = () => {
        this.props.searchCategory({tagName: 'trending'});
    }

    render() {
        const {handleItemClick, onCategories} = this.props;
        return (
            <SearchGrid
                keyword='trending'
                handleItemClick={handleItemClick}
                onCategories={onCategories}
                loadMore={this.loadMore}
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(Trending);
