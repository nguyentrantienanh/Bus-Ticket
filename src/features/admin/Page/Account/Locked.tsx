import { useState } from 'react'
import Icon from '../../../../icons/Icon'
const UserList = JSON.parse(localStorage.getItem('userList') || '[]')

export function AccountLocked() {
  const AccountLocked = UserList.filter((item: any) => item.status === 0)
  const [visiblePasswords, setVisiblePasswords] = useState<{ [userId: string]: boolean }>({})
  const handShowPassword = (userId: string) => {
    setVisiblePasswords((item) => ({
      ...item,
      [userId]: !item[userId]
    }))
  }
  // hàm xử lý nút "Kích hoạt"
  const handleActivate = (userId: string) => {
    const updateusers = UserList.map((item: any) => {
      if (item.id === userId) {
        return { ...item, status: 1 } // Đặt status thành 1 để kích hoạt
      }
      return item // Giữ nguyên các mục khác
    })
    localStorage.setItem('userList', JSON.stringify(updateusers)) // Cập nhật danh sách người dùng trong localStorage
    window.location.reload() // Tải lại trang để cập nhật giao diện
  }
  return (
    <>
      <div className='bg-red-50 px-2 sm:px-4 md:px-10 py-6 min-h-screen'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-red-600 rounded-t-2xl text-[13px] text-[#fff]'>
            <thead>
              <tr className='text-[#fff]  text-nowrap space-nowrap'>
                <th className='py-2 px-2 text-left w-[90px]'>ID</th>
                <th className='py-2 px-2 text-left w-[90px]'>Username</th>
                <th className='py-2 px-2 text-left  w-[90px] text-nowrap'>Mobile</th>
                <th className='py-2 px-2 text-left w-[120px]'>Address</th>
                <th className='py-2 px-2 text-left w-[120px]'>Email</th>
                <th className='py-2 px-2 text-left w-[100px]'>Zip Code</th>
                <th className='py-2 px-2 text-left w-[80px]'>City</th>
                <th className='py-2 px-2 text-left w-[120px]'>Password</th>
                <th className='py-2 px-2 text-left w-[80px]'>Info</th>
                <th className='py-2 px-2 text-left w-[80px]'> Action</th>
              </tr>
            </thead>

            <tbody>
              {AccountLocked.length > 0 ? (
                AccountLocked.map((user: any, index: number) => (
                  <tr key={index} className='bg-red-50 text-xs text-gray-800 border-b text-nowrap  '>
                    <td className='py-2 px-2 text-gray-500'>{user.id}</td>
                    <td className='py-2 px-2 text-[#4447ff]'>{user.firstname + ' ' + user.lastname} </td>
                    <td className='py-2 px-2 text-[#a7a7a7]'>
                      {user.phone || <span className='  text-gray-400'>Trống</span>}
                    </td>
                    <td className='py-2 px-2 text-[#04b925]  '>
                      {user.address || <span className='  text-gray-400'>Trống</span>}
                    </td>
                    <td className='py-2 px-2 text-[#04b925]'>{user.email}</td>
                    <td className='py-2 px-2 text-[#4c4c4c] font-medium'>
                      {user.zipcode || <span className='  text-gray-400'>Trống</span>}{' '}
                    </td>
                    <td className='py-2 px-2 text-[#4c4c4c] font-medium'>
                      {user.city || <span className='  text-gray-400'>Trống</span>}
                    </td>

                    <td className='py-2 px-2   text-[#4c4c4c] font-medium flex items-center gap-2'>
                      {user.password ? (
                        <div>
                          <input
                            type={visiblePasswords[user.id] ? 'text' : 'password'}
                            value={user.password}
                            readOnly
                            className='   w-15 px-2 py-1 rounded   cursor-default'
                          />
                          <button
                            onClick={() => handShowPassword(user.id)}
                            className='text-gray-500 hover:text-gray-700 cursor-pointer '
                          >
                            {visiblePasswords[user.id] ? <Icon name='eye' /> : <Icon name='eye-off' />}
                          </button>
                        </div>
                      ) : (
                        <span className=' px-2 py-1  text-gray-400'>Trống</span>
                      )}
                    </td>
                    <td className='py-2 px-2'>
                      <span className='px-3 py-1 rounded-full text-red-600 bg-red-100 border border-red-400 text-xs font-medium flex items-center gap-1'>
                        <Icon name='lock' />
                        Khóa
                      </span>
                    </td>

                    <td className='py-2 px-2'>
                      <div className='   flex justify-center space-x-2'>
                        <button
                          onClick={() => handleActivate(user.id)}
                          className='bg-green-500 cursor-pointer hover:bg-green-600 text-[#fff] px-3 py-1 rounded-md text-xs transition whitespace-nowrap'
                        >
                          <Icon name='check' /> Kích hoạt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className='text-center text-gray-500  bg-[#fff] py-4'>
                    No tickets booked yet.
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

export default function Locked() {
  const countLocked = UserList.filter((item: any) => item.status === 0).length
  return (
    <>
      <div className=' bg-red-50 flex flex-col h-full px-2 w-full py-4  pt-2 '>
        <div className='flex flex-col  px-2 w-full py-4  pt-2 '>
          <div className='py-3 flex justify-between px-3 items-center text-center w-full shadow-md bg-[#fff] rounded-lg  '>
            <h1 className='text-3xl font-bold text-gray-700'>Tài khoảng khóa</h1>
            <div className='  flex justify-between px-2 items-center    w-30 h-full rounded-lg   m-2 bg-red-500 shadow-md'>
              <i className='    text-4xl text-[#fff]/20'>
                <Icon name='users' />
              </i>
              <div className='flex flex-col text-[#fff]   '>
                <span className='font-bold pr-5 text-2xl'>{countLocked}</span>
              </div>
            </div>
          </div>
        </div>
        <AccountLocked />
      </div>
    </>
  )
}
