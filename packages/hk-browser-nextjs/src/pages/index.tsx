import React from 'react'
import dynamic from 'next/dynamic'

const LazyChatApp = dynamic(() => import('hk-chat').then((m) => m.App), {
  loading: () => <h1>loading</h1>,
  ssr: false,
})

export default function ChatPage() {
  return (
    <div id="chat_container">
      <style jsx global>{`
        #chat_container,
        #__next {
          height: 100%;
        }
      `}</style>
      <LazyChatApp />
    </div>
  )
}
