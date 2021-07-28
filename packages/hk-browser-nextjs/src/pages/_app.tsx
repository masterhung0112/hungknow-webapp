import React from 'react'
import { AppProps } from 'next/app'

import 'hk-chat/dist/hkchat-styles.css'
import 'katex/dist/katex.min.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div id="root">
      <Component {...pageProps} />
      <div id="root-partial"></div>
    </div>
  )
}

export default App
