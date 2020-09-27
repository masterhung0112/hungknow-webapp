import React from 'react'
import '../styles/styles.scss'
import { wrapper } from 'stores/redux_store'
import { IntlProvider } from 'react-intl'
import { useDispatch } from 'react-redux'
import { loadMeAndConfig } from 'actions/views/root'
import { setUrl } from 'hkclient-ts/lib/actions/general'
import { getSiteURL } from 'utils/url'

// import {Provider} from 'react-redux'
// import Root from 'components/root'

// const LazyRoot = React.lazy(() => import('components/root'));
// const Root = makeAsyncComponent(LazyRoot);

interface MyAppProps extends Object {
  Component: React.ComponentType
}

const MyApp: React.FC<MyAppProps> = ({ Component, ...pageProps }) => {
  // const dispatch = useDispatch()

  // dispatch(loadMeAndConfig())

  // Set default URL for HkClient
  setUrl(getSiteURL())

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
