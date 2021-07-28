import React from 'react'
import dynamic from 'next/dynamic'

const LazyChatApp = dynamic(() => import('hk-chat/dist/app'), {
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
