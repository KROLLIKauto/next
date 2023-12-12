'use client'

import { useEffect, useState } from "react"
import { Button } from "../button"


const ChatPlace = () => {
  const [input, setInput] = useState('')
  const [chatArr, setChatArr] = useState([
    {
      text: 'sd',
      user: 'name'
    }
  ])

  const sendMessage = () => {
    console.log(chatArr, '123124');

    setChatArr([...chatArr, {
      text: input,
      user: sessionStorage.getItem('customer') || '1'
    }])

    setInput('')
  }

  return (
    <div className="border border-gray-200">
      {chatArr.map((message) => {
        return <div key={message.text} className="m-4 bg-blue-200 max-w-max">
          <div>{message.user}</div>
          <div>{message.text}</div>
        </div>
      })}
      <div className="flex justify-between">
        <input value={input} onChange={(e)=>setInput(e.target.value)} />
        <Button onClick={sendMessage} type="submit">Create Invoice</Button>
      </div>
    </div>
  )
}

export default ChatPlace