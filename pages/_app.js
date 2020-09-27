import React from 'react'
import '../styles/styles.scss'
import { wrapper } from 'stores/redux_store.tsx'
import { IntlProvider } from 'react-intl'
// import {Provider} from 'react-redux'
// import Root from 'components/root'

// const LazyRoot = React.lazy(() => import('components/root'));
// const Root = makeAsyncComponent(LazyRoot);

function MyApp({ Component, pageProps }) {
  return (
    <IntlProvider locale="en">
      <Component {...pageProps} />
    </IntlProvider>
  )
}

// export default const WrappedApp = ({ Component, pageProps }) => {
//   return <Component {...pageProps} />
// }

export default wrapper.withRedux(MyApp)