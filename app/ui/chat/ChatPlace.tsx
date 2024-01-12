'use client'

import { useEffect, useRef, useState } from "react"
import { Button } from "../button"
import axios from 'axios'


const ChatPlace = () => {
  const [input, setInput] = useState('')
  const [chatArr, setChatArr] = useState([])
  const socket: any = useRef()
  const [connected, setConnected] = useState(false)
  const [nickName, setNickName] = useState('')


  const sendMessage = async () => {
    // await axios.post('http://localhost:3080/new-messages', {
    //   text: input,
    //   user: sessionStorage.getItem('customer') || '1',
    //   id: Date.now()
    // })

    // setInput('')
    const message = {
      user: nickName,
      text: input,
      id: Date.now(),
      event: 'message'
    }
    socket.current.send(JSON.stringify(message));
    setInput('')
  }

  // useEffect(() => {

  //   getMessage()
  // }, [])

  const connect = () => {
    socket.current = new WebSocket('ws://localhost:3080')

    socket.current.onopen = () => {
      setConnected(true)
      const message = {
        event: 'connection',
        id: Date.now(),
        user: nickName,
      }
      socket.current.send(JSON.stringify(message))
    }
    socket.current.onmessage = (e: any) => {
      const message = JSON.parse(e.data)
      setChatArr(prev => [message, ...prev] as any)
    }
    socket.current.onclose = () => {
      console.log('сокет закрыт');
    }
    socket.current.onerror = () => {
      console.log('ошибка где-то в сокете');
    }
  }

  // const getMessage = async () => {
  //   try {
  //     const { data } = await axios.get('http://localhost:3080/get-messages')
  //     setChatArr(prev => [data, ...prev] as any)
  //     getMessage()
  //   } catch(e) {
  //     setTimeout(() => {
  //       getMessage()
  //     }, 500)
  //   }
  // }

  if (!connected) {
    return (
      <div>
        <input type="text" placeholder="Nickname" value={nickName} onChange={e => setNickName(e.target.value)} />
        <button onClick={connect}>Enter</button>
      </div>
    )
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