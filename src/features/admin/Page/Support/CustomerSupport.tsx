// import { useState } from 'react'
import Icon from '../../../../icons/Icon'
import { useEffect, useState } from 'react'
import { getUserList } from '../../../../api/userApi'
import { Link } from 'react-router-dom'
 

 
function AccountSupport() {
const [UserList, setUserList] = useState<any[]>([])
  
   useEffect(() => {
    getUserList().then((res) => {
      setUserList(res.data)
    })
  }, [])

const chats = UserList.flatMap((user: any) => user.chats || [])
  return (
    <>
      <div className='bg-[#fff]  md:px-10 py-6'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-[#1ba000] md:rounded-t-2xl text-[13px]'>
            <thead>
              <th className='py-2 px-2 text-left w-[90px]'>ID</th>
              <th className='py-2 px-2 text-left w-[120px]'>Description</th>
              <th className='py-2 px-2 text-left w-[120px]'>lastMessage</th>
              <th className='py-2 px-2 text-left w-[120px]'>timestamp</th>
              <th className='py-2 px-2 text-left w-[100px]'>Action</th>
            </thead>

            <tbody>
              {chats.length > 0 ? (
                chats.map((item: any, index: number) => (
                  <tr key={index} className='bg-[#fff] text-xs text-gray-800  text-nowrap space-nowrap border-b'>
                    <td className='py-2 px-2 text-gray-500'>{item._id}</td>
                    <td className='py-2 px-2 text-gray-500'>{item.description}</td>
                    <td className='py-2 px-2 text-gray-500'>{item.lastMessage}</td>
                    <td className='py-2 px-2 text-gray-500'>{item.timestamp}</td>
                    <Link to={`/admin/support/chat/${item._id}/${item.description}`} className='py-2 px-2 text-gray-500'>
                      <td className='py-2   text-center   '>
                        <i className='cursor-pointer border-[#1ba000] bg-[#1ba0008e] border text-[15px] py-1 px-2 rounded-[10px] text-[#fff]'>
                          <Icon name='computer' />
                        </i>
                      </td>
                    </Link>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='text-center text-gray-500  bg-[#fff] py-4'>
                    No chat support
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

export default function CustomerSupport() {
  const [UserList, setUserList] = useState<any[]>([])
  
   useEffect(() => {
    getUserList().then((res) => {
      setUserList(res.data)
    })
  }, [])

const chats = UserList.flatMap((user: any) => user.chats || [])
  const countchat =  chats.length
  return (
    <>
      <div className='flex flex-col  md:px-2 w-full py-4  pt-2 '>
        <div className='py-3 flex justify-between px-3 items-center text-center w-full shadow-md bg-[#fff] md:rounded-lg  '>
          <h1 className='text-1xl sm:text-3xl font-bold text-gray-700'>Hỗ trợ</h1>

          <div className='   flex justify-between px-2 items-center  w-10  sm:w-30 h-full rounded-lg bg-gradient-to-r to-green-400 from-green-600 shadow-md'>
            <i className='   text-[10px] sm:text-4xl text-[#fff]/20'>
              <Icon name='ticket' />
            </i>
            <div className='flex flex-col text-[#fff]  '>
              <span className='font-bold text-[12px] sm:text-2xl'>{countchat}</span>
            </div>
          </div>
        </div>
      </div>

      <AccountSupport />
    </>
  )
}
