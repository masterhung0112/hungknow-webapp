import React from 'react'
import { getSession, useSession } from 'next-auth/client'

import { NextAuthContainer } from '../components/NextAuthContainer'

import Layout from '../components/layout/Layout'

const ServerPage = () => {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  // This is possible because of the shared context configured in `_app.js` that
  // is used by `useSession()`.
  const [session, loading] = useSession()

  return (
    <NextAuthContainer>
      <Layout>
        <h1>Server Side Rendering</h1>
        <h1>Hello {session?.user?.name}</h1>
        <p>
          This page uses the universal <strong>getSession()</strong> method in <strong>getServerSideProps()</strong>.
        </p>
        <p>
          Using <strong>getSession()</strong> in <strong>getServerSideProps()</strong> is the recommended approach if
          you need to support Server Side Rendering with authentication.
        </p>
        <p>The advantage of Server Side Rendering is this page does not require client side JavaScript.</p>
        <p>The disadvantage of Server Side Rendering is that this page is slower to render.</p>
      </Layout>
    </NextAuthContainer>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

export default ServerPage
