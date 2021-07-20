import React, {useEffect} from 'react';
import '../styles/styles.scss';
import {wrapper} from 'hk-chat/stores/redux_store';
import {IntlProvider} from 'react-intl';

import {getSiteURL} from 'hk-chat/utils/url';
import {AppProps} from 'next/app';
import {useDispatch} from 'react-redux';
import {loadMeAndConfig} from 'hk-chat/actions/views/root';

import {setUrl} from 'hkclient-redux/actions/general';

// import {Provider} from 'react-redux'
// import Root from 'components/root'

// const LazyRoot = React.lazy(() => import('components/root'));
// const Root = makeAsyncComponent(LazyRoot);

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
    const dispatch = useDispatch();

    // Set default URL for HkClient
    setUrl(getSiteURL());

    useEffect(
        const f = async () => {
            // Try to load me and config
            await dispatch(loadMeAndConfig());
        }
        f()
    }, []);

    return (
        <IntlProvider locale='en'>
            <Component {...pageProps}/>
        </IntlProvider>
    );
};

export default wrapper.withRedux(MyApp);
