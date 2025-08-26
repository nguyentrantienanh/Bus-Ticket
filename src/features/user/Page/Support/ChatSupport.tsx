import { useParams } from 'react-router-dom'
import Icon from '../../../../icons/Icon'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getUserChats, sendMessage } from '../../../../api/chatUserApi'
export default function ChatSupport() {
  const { t } = useTranslation('ChatSupport')
  const { id } = useParams<{ id: string }>()

  const UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const [chats, setChats] = useState<any[]>([])
  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (UserInfo.id) {
          const res = await getUserChats(UserInfo.id)
        
          setChats(res.data) // API trả về mảng chats
        }
      } catch (err) {
       
      }
    }
    fetchChats()
  }, [UserInfo.id])

   
  const chat = chats.filter((item: any) => item._id === id )

  const messages = chat.length > 0 ? chat[0].messages : []

  const [message, setMessage] = useState('')
  const messageEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
  if (!message.trim()) return alert(t('input.emptyMessage'));
  try {
    await sendMessage(UserInfo.id, id!, "user", message);
    setMessage('');
    
    // fetch lại chats để cập nhật message mới
    const res = await getUserChats(UserInfo.id);
    setChats(res.data);
  } catch (err: any) {
    alert('Lỗi : ' + (err.response?.data?.message || err.message));
  }
};

  return (
    <div className='flex flex-col w-full    bg-[#fff]  h-screen'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-3 border-b border-gray-400 bg-[#e6f4ea] sticky top-0 z-10 shadow-sm'>
        <div className='flex items-center gap-2 '>
          <Link to={`/user/support/chat`} className='  md:hidden '>
            <button
              className='bg-[#fff] py-1 border-green-400 border-dashed border text-center cursor-pointer   rounded-xl h-full relative text-black text-xl font-semibold group'
              type='button'
            >
              <div className='bg-green-400 opacity-0 hover:opacity-100 rounded-xl h-full w-1/10 flex items-center justify-center absolute top-0    group-hover:w-full z-10 duration-500'>
                <i className='   text-[#fff]  text-[12px] '>
                  <Icon name='arrowleft' />
                </i>
              </div>

              <p className=' px-1  text-nowrap text-[10px]'>{t('header.backButton')}</p>
            </button>
          </Link>

          <h1 className=' text-[15px]   md:text-xl font-semibold text-green-700 truncate'>
            {chat[0]?.description || t('header.defaultTitle')}
          </h1>
        </div>
        <div>
          {chat.map((item: any, index: any) => (
            <div key={index} className='text-xs text-gray-500 flex items-center'>
              {t('header.priority.label')}
              {item.priority === 1 ? (
                <span className='text-xs ml-1 text-green-500 bg-green-100 border px-2 py-1 rounded-full'>
                  {t('header.priority.high')}
                </span>
              ) : item.priority === 2 ? (
                <span className='text-xs ml-1 text-green-500 bg-green-100 border px-2 py-1 rounded-full'>
                  {t('header.priority.normal')}
                </span>
              ) : (
                <span className='text-xs ml-1 text-green-500 bg-green-100 border px-2 py-1 rounded-full'>
                  {t('header.priority.low')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div className='flex-1 overflow-y-auto px-4 py-4 bg-gray-100  '>
        {messages.map((item: any, index: number) => (
          <div key={index} className={`flex mb-4 ${item.id === 1 ? 'justify-end' : 'justify-start'}`}>
            <div className='max-w-[70%]'>
              <div
                className={`px-4 py-2 rounded-2xl text-sm shadow-md ${
                  item.id === 1
                    ? 'bg-green-500 text-[#fff] rounded-br-none'
                    : 'bg-[#fff] text-gray-800 rounded-bl-none border'
                }`}
              >
                {item.text}
              </div>
              <p className={`text-[11px] text-gray-500 mt-1 ${item.id === 2 ? 'text-right' : ''}`}>
                {item.timestamp.split(' ')[0].slice(0, -3)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input box */}
      <div className='border-t bg-[#fff] px-4 py-3 flex items-center gap-3 sticky bottom-0'>
        <input
          type='text'
          placeholder={t('input.placeholder')}
          className='flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage()
          }}
        />
        <button
          onClick={handleSendMessage}
          className='p-3 bg-green-500 rounded-full text-[#fff] hover:bg-green-600 transition'
        >
          <Icon name='send' />
        </button>
      </div>
    </div>
  )
}
