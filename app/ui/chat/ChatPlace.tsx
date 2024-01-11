'use client'

import { useEffect, useState } from "react"
import { Button } from "../button"
import axios from 'axios'


const ChatPlace = () => {
  const [input, setInput] = useState('')
  const [chatArr, setChatArr] = useState([])


  const sendMessage = async () => {
    await axios.post('http://localhost:3080/new-messages', {
      text: input,
      user: sessionStorage.getItem('customer') || '1',
      id: Date.now()
    })

    setInput('')
  }

  useEffect(() => {
    getMessage()
  }, [])

  const getMessage = async () => {
    try {
      const { data } = await axios.get('http://localhost:3080/get-messages')
      setChatArr(prev => [data, ...prev] as any)
      getMessage()
    } catch(e) {
      setTimeout(() => {
        getMessage()
      }, 500)
    }
  }


  return (
    <div className="border border-gray-200">
      <div>
        {chatArr.map((message: any) => {
          return <div key={message.id} className="m-4 bg-blue-200 max-w-max">
            <div>{message.user}</div>
            <div>{message.text}</div>
          </div>
        })}
      </div>
      <div className="flex justify-between">
        <input value={input} onChange={(e)=>setInput(e.target.value)} />
        <Button onClick={sendMessage} type="submit">Отправить сообщение</Button>
      </div>
    </div>
  )
}

export default ChatPlace