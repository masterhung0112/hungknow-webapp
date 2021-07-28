import React from 'react'

import { NextAuthContainer } from '../components/NextAuthContainer'

import Layout from '../components/layout/Layout'

const Page: React.FC<{}> = ({}) => {
  return (
    <NextAuthContainer>
      <Layout>
        <h1>NextAuth.js Example</h1>
        <p>
          This is an example site to demonstrate how to use <a href={`https://next-auth.js.org`}>NextAuth.js</a> for
          authentication.
        </p>
      </Layout>
    </NextAuthContainer>
  )
}

export default Page
