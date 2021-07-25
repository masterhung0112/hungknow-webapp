import React from 'react'
import dynamic from 'next/dynamic'

const LazyChatApp = dynamic(() => import('hk-chat').then((mod) => mod.App), {
  loading: () => <h1>loading</h1>,
  ssr: false,
})

export default function BasicExample() {
  return <LazyChatApp />
}
