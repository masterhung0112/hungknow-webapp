import React, {useEffect} from 'react';
import '../styles/styles.scss';
import {wrapper} from 'stores/redux_store';
import {IntlProvider} from 'react-intl';

import {getSiteURL} from 'utils/url';
import {AppProps} from 'next/app';
import {useDispatch} from 'react-redux';
import {loadMeAndConfig} from 'actions/views/root';
import useAsyncEffect from 'use-async-effect';

import {setUrl} from 'hkclient-redux/actions/general';

// import {Provider} from 'react-redux'
// import Root from 'components/root'

// const LazyRoot = React.lazy(() => import('components/root'));
// const Root = makeAsyncComponent(LazyRoot);

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
    const dispatch = useDispatch();

    // Set default URL for HkClient
    setUrl(getSiteURL());

    useAsyncEffect(async () => {
    // Try to load me and config
        await dispatch(loadMeAndConfig());
    }, []);

    return (
        <IntlProvider locale='en'>
            <Component {...pageProps}/>
        </IntlProvider>
    );
};

export default wrapper.withRedux(MyApp);
