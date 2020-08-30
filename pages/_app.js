import styles from '../styles/Home.module.css'
import store from 'stores/redux_store.tsx'
import makeAsyncComponent from 'components/async_load'
import {Provider} from 'react-redux'
// import Root from 'components/root'

// const LazyRoot = React.lazy(() => import('components/root'));
// const Root = makeAsyncComponent(LazyRoot);

function MyApp({Component, pageProps }) {
  return (
    <Provider store={store}>
        <h1>Hello from me</h1>
        <Component {...pageProps} />
    </Provider>
)
}

export default MyApp
