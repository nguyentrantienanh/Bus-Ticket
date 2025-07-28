import { it } from 'node:test'
import Icon from '../../../../icons/Icon'
import { Link, useParams } from 'react-router-dom'

export default function Listchat() {
  const { id } = useParams<{ id: string }>()

  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const user = UserList.find((item: any) => item.id === UserInfo.id)
  const chats = user?.chats || []

  return (
    <nav className='flex flex-col w-full bg-[#fff] h-full '>
      {/* Header */}
      <div className='flex items-center justify-between px-6 py-3 bg-green-500 text-[#fff] sticky top-0 z-10 shadow'>
        <Link
          to={`/user/support-ticket`}
          className='flex items-center  md:px-1 md:py-0 max-md:hidden   border    rounded-full bg-[#fff] text-green-600 hover:bg-gray-100 '
        >
          <Icon name='arrowleft' />
        </Link>
        <h3 className='font-bold text-lg flex mx-2 items-center text-nowrap gap-2'>
          <Icon name='chat' /> Danh sách chat
        </h3>
        <Link
          to={`/user/support-ticket`}
          className='flex items-center px-3 py-1 border    rounded-full bg-[#fff] text-green-600 hover:bg-gray-100 md:hidden'
        >
          <Icon name='arrowleft' />
          <span className='text-sm pl-2 font-medium'>Trở về</span>
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
                  to={`/user/support/chat/${item.id}/${item.description}`}
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
                        Mức độ:
                        {item.priority === 1 ? (
                          <span className='text-xs text-red-500 bg-red-100  py-1 rounded-full'>Quan trọng</span>
                        ) : item.priority === 2 ? (
                          <span className='text-xs text-yellow-500 bg-yellow-100   py-1 rounded-full'>Bình thường</span>
                        ) : (
                          <span className='text-xs text-green-500 bg-green-100   py-1 rounded-full'>Thấp</span>
                        )}
                      </div>
                    </div>
                    <div className='flex justify-between items-center mt-1 text-gray-600 text-sm'>
                      <span className='truncate w-[75%] text-xs'>{lastMessage?.text || 'Chưa có tin nhắn'}</span>
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
              <span className='text-[16px]'>Thêm cuộc trò chuyện</span>
            </li>
          </Link>
        )}
      </ul>
    </nav>
  )
}
