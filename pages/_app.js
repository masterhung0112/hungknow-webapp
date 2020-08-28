import '../styles/globals.css'
import store from 'stores/redux_store.tsx'

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
