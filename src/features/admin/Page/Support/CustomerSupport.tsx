// import { useState } from 'react'
import Icon from '../../../../icons/Icon'

import { Link } from 'react-router-dom'
const UserList = JSON.parse(localStorage.getItem('userList') || '[]')

const chats = UserList.flatMap((user: any) => user.chats || [])
function AccountSupport() {
  return (
    <>
      <div className='bg-[#fff] px-2 sm:px-4 md:px-10 py-6'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-[#1ba000] rounded-t-2xl text-[13px]'>
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
                    <td className='py-2 px-2 text-gray-500'>{item.id}</td>
                    <td className='py-2 px-2 text-gray-500'>{item.description}</td>
                    <td className='py-2 px-2 text-gray-500'>{item.lastMessage}</td>
                    <td className='py-2 px-2 text-gray-500'>{item.timestamp}</td>
                    <Link to={`/admin/support/chat/${item.id}/${item.description}`} className='py-2 px-2 text-gray-500'>
                      <td className='py-2   text-center   '>
                        <i className='cursor-pointer border-[#1ba000] bg-[#1ba0008e] border text-[15px] py-1 px-2 rounded-[10px] text-[#fff]'>
                          <Icon name='computer' />
                        </i>
                      </td>
                    </Link>
                  </tr>
                ))
              ) : (
                <tr> trốngd</tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default function CustomerSupport() {
  const countchat = chats.length
  return (
    <>
      <div className='flex flex-col  px-2 w-full py-4  pt-2 '>
        <div className='py-3 flex justify-between px-3 items-center text-center w-full shadow-md bg-[#fff] rounded-lg  '>
          <h1 className='text-3xl font-bold text-gray-700'>Hỗ trợ</h1>
          <div className='  flex justify-between px-2 items-center    w-30 h-full rounded-lg   m-2 bg-gradient-to-r to-green-400 from-green-600 shadow-md'>
            <i className='    text-4xl text-[#fff]/20'>
              <Icon name='support' />
            </i>
            <div className='flex flex-col text-[#fff]  '>
              <span className='font-bold text-2xl'>{countchat}</span>
            </div>
          </div>
        </div>
      </div>

      <AccountSupport />
    </>
  )
}
