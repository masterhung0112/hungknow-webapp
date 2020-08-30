// import styles from '../styles/Home.module.css'
import wrapper from 'stores/redux_store.tsx'
import makeAsyncComponent from 'components/async_load'
import { IntlProvider } from 'react-intl'
// import {Provider} from 'react-redux'
// import Root from 'components/root'

// const LazyRoot = React.lazy(() => import('components/root'));
// const Root = makeAsyncComponent(LazyRoot);

function MyApp({Component, pageProps }) {
  return (
    <IntlProvider>
        <Component {...pageProps} />
    </IntlProvider>
)
}

// export default const WrappedApp = ({ Component, pageProps }) => {
//   return <Component {...pageProps} />
// }

export default wrapper.withRedux(MyApp)
