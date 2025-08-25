import Icon from '../../../../icons/Icon'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {getUserChats} from '../../../../api/chatUserApi'
import { useEffect, useState } from 'react'
export default function Listchat() {
  const { t } = useTranslation('ListSupport')
  const { id } = useParams<{ id: string }>()
    const [chats, setChats] = useState<any[]>([])
    const UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    console.log('UserInfo:', UserInfo.id)
    useEffect(() => {
      const fetchChats = async () => {
        try {
          if (UserInfo.id) {
            const res = await getUserChats(UserInfo.id)
            console.log('Chats fetched:', res.data)
            setChats(res.data) // API trả về mảng chats
          }
        } catch (err) {
          console.error('Lỗi khi lấy chats:', err)
        }
      }
      fetchChats()
    }, [UserInfo.id])
 

  return (
    <nav className='flex flex-col w-full bg-[#fff] h-full '>
      {/* Header */}
      <div className='flex items-center justify-between px-3 md:px-6 py-3 bg-green-500 text-[#fff] sticky top-0 z-10 shadow'>
        <Link to={`/user/support-ticket`} className='   max-md:hidden  '>
          <button
            className='bg-[#fff]  text-center cursor-pointer  w-full rounded-2xl   relative text-black text-xl font-semibold group'
            type='button'
          >
            <div className='bg-green-400 rounded-xl   opacity-0 hover:opacity-100   max-md:hidden   h-full w-1/10 flex items-center justify-center absolute     group-hover:w-full z-10 duration-500'>
              <i className='   text-[#fff]  '>
                <Icon name='arrowleft' />
              </i>
            </div>
            <p className=' py-2 px-1 text-nowrap text-[14px]'>{t('header.backButton')}</p>
          </button>
        </Link>

        <h3 className='font-bold text-lg flex mx-2 items-center text-nowrap gap-2'>
          <Icon name='chat' /> {t('header.title')}
        </h3>

        <Link to={`/user/support-ticket`} className='     md:hidden  '>
          <button
            className='bg-[#fff] px-2 w-full  text-center cursor-pointer    rounded-2xl   relative text-black text-xl font-semibold group'
            type='button'
          >
            <div className='bg-green-400 rounded-xl   opacity-0 hover:opacity-100   max-md:hidden   h-full w-1/10 flex items-center justify-center absolute     group-hover:w-full z-10 duration-500'>
              <i className='   text-[#fff]  '>
                <Icon name='arrowleft' />
              </i>
            </div>
            <p className=' py-2 px-1 text-nowrap text-[14px]'>{t('header.backButton')}</p>
          </button>
        </Link>
      </div>

      {/* Chat list */}
      <ul className={`flex flex-col px-2 py-2 overflow-y-auto ${chats.length > 0 ? 'h-[calc(100vh-64px)]' : 'h-full'}`}>
        {chats.length > 0 ? (
          chats.map((item: any) => {
            const lastMessage = item.messages?.[item.messages.length - 1] || null
            const isSelected = item.id === parseInt(id || '0')

            return (
              <li key={item.id} className='mb-1'>
                <Link
                  to={`/user/support/chat/${item._id}/${item.description}`}
                  className={`flex items-center gap-3 p-3 rounded-xl transition ${
                    isSelected ? 'bg-green-100 border border-green-400' : 'hover:bg-gray-100'
                  }`}
                >
                  {/* Avatar placeholder */}
                  <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-[#fff] font-bold'>
                    <Icon name='user' />
                  </div>

                  {/* Chat content */}
                  <div className='flex-1 min-w-0'>
                    <div className='flex justify-between items-center'>
                      <h4 className='font-semibold text-gray-800 text-sm truncate'>{item.description}</h4>
                      <div className='text-xs text-gray-500 flex items-center'>
                        {t('priority.label')}
                        {item.priority === 1 ? (
                          <span className='text-xs text-red-500 bg-red-100  py-1 rounded-full'>
                            {t('priority.high')}
                          </span>
                        ) : item.priority === 2 ? (
                          <span className='text-xs text-yellow-500 bg-yellow-100   py-1 rounded-full'>
                            {t('priority.normal')}
                          </span>
                        ) : (
                          <span className='text-xs text-green-500 bg-green-100   py-1 rounded-full'>
                            {t('priority.low')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='flex justify-between items-center mt-1 text-gray-600 text-sm'>
                      <span className='truncate w-[75%] text-xs'>{lastMessage?.text || t('messages.noMessages')}</span>
                      <span className='text-[11px] [#fff]space-nowrap'>
                        {lastMessage?.timestamp ? lastMessage.timestamp.split(' ')[0].slice(0, -3) : ''}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })
        ) : (
          <Link to={`/user/ticket/createnew`}>
            <li className='p-5 bg-gray-100 hover:bg-gray-200 transition rounded-xl text-gray-600 flex items-center justify-center mt-10'>
              <Icon name='plus' />
              <span className='text-[16px]'>{t('messages.addNewChat')}</span>
            </li>
          </Link>
        )}
      </ul>
    </nav>
  )
}
