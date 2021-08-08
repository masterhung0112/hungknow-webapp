import React, { ReactNode } from 'react'
import { AppProps } from 'next/app'

import 'hk-chat/dist/hkchat-styles.css'
import 'katex/dist/katex.min.css'
import { NextComponentType, NextPageContext } from 'next'

type AppPropsE = AppProps & {
  Component: NextComponentType<NextPageContext, any, {}> & { layout: Function }
}

const App: React.FC<AppPropsE> = ({ Component, pageProps }) => {
  const Layout = Component.layout || (({ children }: { children: ReactNode }) => <>{children}</>)

  return (
    <div id="root">
      <Layout>
        <Component {...pageProps} />
        <div id="root-partial"></div>
      </Layout>
    </div>
  )
}

export default App
