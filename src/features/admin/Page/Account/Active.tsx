import { useState } from 'react'
import Icon from '../../../../icons/Icon'
const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
function AccountActive() {
  const AccountActive = UserList.filter((item: any) => item.status === 1)
  const [visiblePasswords, setVisiblePasswords] = useState<{ [userId: string]: boolean }>({})
  const handShowPassword = (userId: string) => {
    setVisiblePasswords((item) => ({
      ...item,
      [userId]: !item[userId]
    }))
  }

  // hàm xử lý nút "Vô hiệu hóa"
  const handleDisable = (userId: string) => {
    const updateusers = UserList.map((item: any) => {
      if (item.id === userId) {
        return { ...item, status: 0 } // Đặt status thành 0 để vô hiệu hóa
      }
      return item // Giữ nguyên các mục khác
    })
    localStorage.setItem('userList', JSON.stringify(updateusers)) // Cập nhật danh sách người dùng trong localStorage
    window.location.reload() // Tải lại trang để cập nhật giao diện
  }
  return (
    <>
      <div className='bg-green-50  md:px-10 py-6 min-h-screen'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-green-600 md:rounded-t-2xl text-[13px] text-[#fff]'>
            <thead>
              <tr className='text-[#fff]  space-nowrap text-nowrap'>
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
              {AccountActive.length > 0 ? (
                AccountActive.map((user: any, index: number) => (
                  <tr key={index} className='bg-green-50 text-xs text-gray-800  text-nowrap space-nowrap border-b'>
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

                    <td className='py-2 px-4 text-[#4c4c4c] font-medium flex items-center gap-2'>
                      {user.password ? (
                        <div>
                          <input
                            type={visiblePasswords[user.id] ? 'text' : 'password'}
                            value={user.password}
                            readOnly
                            className=' w-15  px-2 py-1 rounded  cursor-default'
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
                      <span className='px-3 py-1 rounded-full text-green-600 bg-green-100 border border-green-400 text-xs font-medium flex items-center gap-1'>
                        <Icon name='check-circle' />
                        Hoạt động
                      </span>
                    </td>

                    <td className='py-2 px-2'>
                      <div className='   flex justify-center space-x-2'>
                        <button
                          onClick={() => handleDisable(user.id)}
                          className='bg-red-500 hover:bg-red-600 cursor-pointer text-[#fff] px-3 py-1 rounded-md text-xs transition'
                        >
                          <Icon name='x-circle' /> Vô hiệu hóa
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

export default function Active() {
  const countActive = UserList.filter((item: any) => item.status === 1).length

  return (
    <>
      <div className=' bg-green-50 flex flex-col h-full md:px-2 w-full py-4  pt-2 '>
        <div className='flex flex-col  md:px-2 w-full py-4  pt-2 '>
          <div className='py-3 flex justify-between px-3 items-center text-center w-full shadow-md bg-[#fff] md:rounded-lg  '>
            <h1 className='text-3xl font-bold text-gray-700'>Tài khoảng hoạt động</h1>
            <div className='  flex justify-between px-2 items-center    w-30 h-full rounded-lg   m-2 bg-green-500 shadow-md'>
              <i className='    text-4xl text-[#fff]/20'>
                <Icon name='users' />
              </i>
              <div className='flex flex-col text-[#fff]   '>
                <span className='font-bold pr-5 text-2xl'>{countActive}</span>
              </div>
            </div>
          </div>
        </div>
        <AccountActive />
      </div>
    </>
  )
}
