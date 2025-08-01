import { useParams } from 'react-router-dom'
import Icon from '../../../../icons/Icon'
import { useState, useRef, useEffect } from 'react'

export default function ChatSupport() {
  const { id } = useParams<{ id: string }>()

  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const chats = UserList.flatMap((user: any) => user.chats)
  const chat = chats.filter((item: any) => item.id === parseInt(id || '0'))
  const messages = chat.length > 0 ? chat[0].messages : []

  const [message, setMessage] = useState('')
  const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return alert('Vui lòng nhập tin nhắn')
    const newMessage = {
      id: 1,
      sender: 'admin',
      text: message,
      timestamp: new Date().toLocaleString()
    }
    const updatedChat = {
      ...chat[0],
      messages: [...chat[0].messages, newMessage],
      lastMessage: message,
      status: 1
    }
    const updatedChats = chats.map((item: any) => (item.id === chat[0].id ? updatedChat : item))
    const updatedUserList = UserList.map((user: any) => {
      const hasChat = user.chats?.some((c: any) => c.id === chat[0].id)
      if (hasChat) {
        return { ...user, chats: updatedChats }
      }
      return user
    })
    localStorage.setItem('userList', JSON.stringify(updatedUserList))
    setMessage('')
  }

  return (
    <div className='flex flex-col h-full px-4 pt-4'>
      {/* Header */}
      <div className='py-3 px-4 flex items-center justify-between shadow-md rounded-lg bg-[#fff] mb-2 sticky top-0 z-10'>
        <h1 className='text-xl font-bold text-gray-700 truncate'>{chat[0]?.description || 'Chat hỗ trợ'}</h1>
      </div>

      {/* Chat content */}
      <div className='flex-1 overflow-y-auto bg-gray-100 rounded-lg p-4 shadow-inner'>
        {messages.length > 0 ? (
          messages.map((item: any, index: number) => (
            <div key={index} className={`flex mb-3 ${item.id === 1 ? 'justify-end' : 'justify-start'}`}>
              <div className='max-w-[70%]'>
                <div
                  className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
                    item.id === 1
                      ? 'bg-green-500 text-[#fff] rounded-br-none'
                      : 'bg-[#dadada] text-gray-800 rounded-bl-none  '
                  }`}
                >
                  <p>{item.text}</p>
                </div>
                <p className={`text-[11px] mt-1 text-gray-500 ${item.id === 1 ? 'text-right' : ''}`}>
                  {item.timestamp.split(' ')[0].slice(0, -3)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-400'>Chưa có tin nhắn</p>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input */}
      <div className='flex items-center gap-2 mt-3 pt-3 border-t'>
        <input
          type='text'
          placeholder='Nhập tin nhắn...'
          className='flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className='p-2 bg-green-500 rounded-full text-[#fff] hover:bg-green-600 transition'
        >
          <Icon name='send' />
        </button>
      </div>
    </div>
  )
}
