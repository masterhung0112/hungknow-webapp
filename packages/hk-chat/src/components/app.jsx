// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// import {hot} from 'react-hot-loader/root';
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {browserHistory} from 'utils/browser_history';
import store from 'stores/redux_store';

import {makeAsyncComponent} from 'components/async_load';

import CRTPostsChannelResetWatcher from 'components/threading/channel_threads/posts_channel_reset_watcher';
const LazyRoot = React.lazy(() => import('components/root'));

const Root = makeAsyncComponent(LazyRoot);

import '../sass/styles.scss';

class App extends React.PureComponent {
    render() {
        if (typeof window === 'undefined') {
            return null;
        }
        return (
            <Provider store={store}>
                <CRTPostsChannelResetWatcher/>
                <BrowserRouter history={browserHistory}>
                    <Routes>
                        <Route
                            path='/'
                            component={Root}
                        />
                    </Routes>
                </BrowserRouter>
            </Provider>);
    }
}

export default App;//hot(App);
