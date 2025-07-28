
import backgruond from '../../../../assets/background.jpg'
import Icon from '../../../../icons/Icon'
import { Link } from 'react-router-dom'

export default function SupportTicket() {
  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const user = UserList.find((item: any) => item.id === UserInfo.id)
  const chats = user.chats
  return (
    <>
      <div
        className=' w-full h-50 flex items-center justify-center  '
        style={{ backgroundImage: `url(${backgruond})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000041]  '>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#fff]  '>Support Ticket</h1>
        </div>
      </div>
      <div className=' bg-[#ececec]  sm:px-4 md:px-10 py-6'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-[#1ba000]  text-sm md:text-[13px] sm:rounded-t-2xl  '>
            <thead>
              <tr className='  text-[#fff] space-nowrap text-nowrap'>
                <th className='py-2 px-4   text-start '>Subject</th>
                <th className='py-2 px-2   '>Status</th>
                <th className='py-2 px-4  '>Priority</th>
                <th className='py-2 px-4  '>Last Reply</th>
                <th className='py-2 px-4  text-end'>Info</th>
              </tr>
            </thead>

            <tbody>
              {chats.length > 0 ? (
                chats.map((item: any, index: number) => (
                  <tr key={index} className='text-[#000] bg-[#fff] text-nowrap '>
                    <td className='py-2 px-4 text-start'>{item.description}</td>
                    <td className='py-2 px-4 text-center'>
                      {item.status === 2 ? (
                        <span className='border-1 border-red-600 text-red-600 bg-red-100 px-2 py-1 rounded-[10px] text-[12px] font-bold '>
                          No Responded
                        </span>
                      ) : (
                        <span className='border-1 border-green-600 text-green-600 bg-green-100 px-2 py-1 rounded-[10px] text-[12px] font-bold'>
                          Responded
                        </span>
                      )}
                    </td>
                    <td className='py-2 px-4 text-center'>
                      {item.priority === 1 ? (
                        <span className='border-1 border-red-600 text-red-600 bg-red-100 px-2 py-1 rounded-[10px] text-[12px] font-bold '>
                          Hight
                        </span>
                      ) : item.priority === 2 ? (
                        <span className='border-1 border-yellow-600 text-yellow-600 bg-yellow-100 px-2 py-1 rounded-[10px] text-[12px] font-bold '>
                          Medium
                        </span>
                      ) : (
                        <span className='border-1 border-green-600 text-green-600 bg-green-100 px-2 py-1 rounded-[10px] text-[12px] font-bold '>
                          Low
                        </span>
                      )}
                    </td>
                    <td className='py-2 px-4 text-center font-medium text-gray-500'>{item.timestamp}</td>
                    <td className='py-2 px-5 text-end cursor-pointer'>
                      <Link to={`/user/support/chat/${item.id}/${item.description}`}>
                        <i className='bg-[#1ba000] text-[15px] py-2 px-3 rounded-[10px] text-[#fff]'>
                          <Icon name='computer' />
                        </i>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='text-center py-4 bg-gray-300 text-gray-500'>
                    No tickets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
