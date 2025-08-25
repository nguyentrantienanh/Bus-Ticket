import Icon from '../../../../icons/Icon'
import { useState, useEffect } from 'react'
const UserList = JSON.parse(localStorage.getItem('userList') || '[]')

import { getUserList, updateUserStatus } from '../../../../api/userApi'

//  hiên thị danh sách tài khoản người dùng từ localStorage
// function Account() {
//   const [visiblePasswords, setVisiblePasswords] = useState<{ [userId: string]: boolean }>({})
//   const handShowPassword = (userId: string) => {
//     setVisiblePasswords((item) => ({
//       ...item,
//       [userId]: !item[userId]
//     }))
//   }

//   const handleConfirm = (userId: string) => {
//     const updateusers = UserList.map((item: any) => {
//       if (item.id === userId) {
//         return { ...item, status: 1 } // Đặt status thành 1 để kích hoạt
//       }
//       return item // Giữ nguyên các mục khác
//     })
//     localStorage.setItem('userList', JSON.stringify(updateusers)) // Cập nhật danh sách người dùng trong localStorage
//     window.location.reload() // Tải lại trang để cập nhật giao diện
//   }
//   // hàm xử lý nút "Vô hiệu hóa"
//   const handleDisable = (userId: string) => {
//     const updateusers = UserList.map((item: any) => {
//       if (item.id === userId) {
//         return { ...item, status: 0 } // Đặt status thành 0 để vô hiệu hóa
//       }
//       return item // Giữ nguyên các mục khác
//     })
//     localStorage.setItem('userList', JSON.stringify(updateusers)) // Cập nhật danh sách người dùng trong localStorage
//     window.location.reload() // Tải lại trang để cập nhật giao diện
//   }

//   return (
//     <>
//       <div className='bg-[#fff]   md:px-10 py-6'>
//         <div className='overflow-x-auto'>
//           <table className='min-w-full bg-[#1ba000] md:rounded-t-2xl text-[13px]'>
//             <thead>
//               <tr className='text-[#fff]  space-nowrap text-nowrap'>
//                 <th className='py-2 px-2 text-left w-[90px]'>ID</th>
//                 <th className='py-2 px-2 text-left w-[90px]'>Username</th>
//                 <th className='py-2 px-2 text-left  w-[90px] text-nowrap'>Mobile</th>
//                 <th className='py-2 px-2 text-left w-[120px]'>Address</th>
//                 <th className='py-2 px-2 text-left w-[120px]'>Email</th>
//                 <th className='py-2 px-2 text-left w-[100px]'>Zip Code</th>
//                 <th className='py-2 px-2 text-left w-[80px]'>City</th>
//                 <th className='py-2 px-2 text-left w-[120px]'>Password</th>
//                 <th className='py-2 px-2 text-left w-[80px]'>Info</th>
//                 <th className='py-2 px-2 text-left w-[80px]'> Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {UserList.length > 0 ? (
//                 UserList.map((user: any, index: number) => (
//                   <tr key={index} className='bg-[#fff] text-xs text-gray-800  text-nowrap space-nowrap border-b'>
//                     <td className='py-2 px-2 text-gray-500'>{user.id}</td>
//                     <td className='py-2 px-2 text-[#4447ff]'>{user.firstname + ' ' + user.lastname} </td>
//                     <td className='py-2 px-2 text-[#a7a7a7]'>
//                       {user.phone || <span className='  text-gray-400'>Trống</span>}
//                     </td>
//                     <td className='py-2 px-2 text-[#04b925]  '>
//                       {user.address || <span className='  text-gray-400'>Trống</span>}
//                     </td>
//                     <td className='py-2 px-2 text-[#04b925]'>{user.email}</td>
//                     <td className='py-2 px-2 text-[#4c4c4c] font-medium'>
//                       {user.zipcode || <span className='  text-gray-400'>Trống</span>}{' '}
//                     </td>
//                     <td className='py-2 px-2 text-[#4c4c4c] font-medium'>
//                       {user.city || <span className='  text-gray-400'>Trống</span>}
//                     </td>

//                     <td className='py-2 px-4 text-[#4c4c4c] font-medium flex items-center gap-2'>
//                       {user.password ? (
//                         <div>
//                           <input
//                             type={visiblePasswords[user.id] ? 'text' : 'password'}
//                             value={user.password}
//                             readOnly
//                             className=' w-15  px-2 py-1 rounded    cursor-default'
//                           />
//                           <button
//                             onClick={() => handShowPassword(user.id)}
//                             className='text-gray-500 hover:text-gray-700 cursor-pointer '
//                           >
//                             {visiblePasswords[user.id] ? <Icon name='eye' /> : <Icon name='eye-off' />}
//                           </button>
//                         </div>
//                       ) : (
//                         <span className=' px-2 py-1  text-gray-400'>Trống</span>
//                       )}
//                     </td>
//                     <td className='py-2 px-2'>
//                       {user.status === 0 ? (
//                         <span className='px-3 py-1 rounded-full text-red-600 bg-red-100 border border-red-400 text-xs font-medium flex items-center gap-1'>
//                           <Icon name='lock' />
//                           Đã Khóa
//                         </span>
//                       ) : (
//                         <span className='px-3 py-1 rounded-full text-green-600 bg-green-100 border border-green-400 text-xs font-medium flex items-center gap-1'>
//                           <Icon name='check-circle' />
//                           Hoạt động
//                         </span>
//                       )}
//                     </td>

//                     <td className='py-2 px-2'>
//                       <div className='   flex justify-center space-x-2'>
//                         {user.status === 1 ? (
//                           <button
//                             onClick={() => handleDisable(user.id)}
//                             className='bg-red-500 hover:bg-red-600 cursor-pointer text-[#fff] px-3 py-1 rounded-md text-xs transition'
//                           >
//                             <Icon name='x-circle' /> Vô hiệu hóa
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => handleConfirm(user.id)}
//                             className='bg-green-500 cursor-pointer hover:bg-green-600 text-[#fff] px-3 py-1 rounded-md text-xs transition whitespace-nowrap'
//                           >
//                             <Icon name='check' /> Hoạt động
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={11} className='text-center text-gray-500  bg-[#fff] py-4'>
//                     No tickets booked yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   )
// }
// export { Account }

// Định nghĩa kiểu dữ liệu cho thông tin người dùng mongodb
interface UserInfo {
  _id: string
  firstname: string
  lastname: string
  email: string
  password?: string
  phone?: string
  address?: string
  zipcode?: string
  city?: string
  imageUrl?: string
  status: number
  type: number
}

// Component hiển thị danh sách tài khoản người dùng mongodb
function Account() {
  const [users, setUsers] = useState<UserInfo[]>([])
  const [visiblePasswords, setVisiblePasswords] = useState<{ [userId: string]: boolean }>({})

  // Lấy danh sách user từ backend
  useEffect(() => {
    getUserList().then((res) => {
      setUsers(res.data)
    })
  }, [])
  console.log('Users:', users)

  const handShowPassword = (userId: string) => {
    setVisiblePasswords((item) => ({
      ...item,
      [userId]: !item[userId]
    }))
  }

  // Kích hoạt
  const handleConfirm = async (userId: string) => {
    const updated = users.map((item) => (item._id === userId ? { ...item, status: 1 } : item))
    setUsers(updated)
    await updateUserStatus(userId, 1)
  }

  // Vô hiệu hóa
  const handleDisable = async (userId: string) => {
    const updated = users.map((item) => (item._id === userId ? { ...item, status: 0 } : item))
    setUsers(updated)
    await updateUserStatus(userId, 0)
  }

  return (
    <>
      <div className='bg-[#fff]   md:px-10 py-6'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-[#1ba000] md:rounded-t-2xl text-[13px]'>
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
              {users.length > 0 ? (
                users.map((user: any, index: number) => (
                  <tr key={index} className='bg-[#fff] text-xs text-gray-800  text-nowrap space-nowrap border-b'>
                    <td className='py-2 px-2 text-gray-500'>{user._id}</td>
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
                            className=' w-15  px-2 py-1 rounded    cursor-default'
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
                      {user.status === 0 ? (
                        <span className='px-3 py-1 rounded-full text-red-600 bg-red-100 border border-red-400 text-xs font-medium flex items-center gap-1'>
                          <Icon name='lock' />
                          Đã Khóa
                        </span>
                      ) : (
                        <span className='px-3 py-1 rounded-full text-green-600 bg-green-100 border border-green-400 text-xs font-medium flex items-center gap-1'>
                          <Icon name='check-circle' />
                          Hoạt động
                        </span>
                      )}
                    </td>

                    <td className='py-2 px-2'>
                      <div className='   flex justify-center space-x-2'>
                        {user.status === 1 ? (
                          <button
                            onClick={() => handleDisable(user.id)}
                            className='bg-red-500 hover:bg-red-600 cursor-pointer text-[#fff] px-3 py-1 rounded-md text-xs transition'
                          >
                            <Icon name='x-circle' /> Vô hiệu hóa
                          </button>
                        ) : (
                          <button
                            onClick={() => handleConfirm(user.id)}
                            className='bg-green-500 cursor-pointer hover:bg-green-600 text-[#fff] px-3 py-1 rounded-md text-xs transition whitespace-nowrap'
                          >
                            <Icon name='check' /> Hoạt động
                          </button>
                        )}
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
export { Account }

function AccountVerified() {
  //  hàm đếm số lượng người dùng
  const countUsers = UserList.length
  // hàm đếm người dùng đã xác minh all
  const countVerified = UserList.filter((item: any) => item.email && item.phone).length
  // hàm đếm người dùng chưa xác minh email
  const countUnverifiedEmail = UserList.filter((item: any) => !item.email).length
  // hàm đếm chưa xác minh sms
  const countUnverifiedPhone = UserList.filter((item: any) => !item.phone).length
  return (
    <>
      <div className=' grid   grid-cols-1 sm:grid-cols-2   lg:grid-cols-4 '>
        {/* Tổng người dùng */}
        <div className='relative  rounded-lg overflow-hidden m-2 bg-[#4F46E5] shadow-md'>
          <i className='absolute bottom-0 left-0 text-5xl text-[#fff]/20'>
            <Icon name='users' />
          </i>
          <div className='flex flex-col text-[#fff] items-end h-full p-4 gap-2 pl-2'>
            <span className='font-bold text-3xl'>{countUsers}</span>
            <span className='text-[#fff]/70 text-sm'>người dùng</span>
          </div>
        </div>

        {/* Người dùng đã xác minh */}
        <div className='relative  rounded-lg overflow-hidden m-2 bg-[#10B981] shadow-md'>
          <i className='absolute bottom-0 left-0 text-5xl text-[#fff]/20'>
            <Icon name='users' />
          </i>
          <div className='flex flex-col text-[#fff] items-end h-full p-4 gap-2 pl-2'>
            <span className='font-bold text-3xl'>{countVerified}</span>
            <span className='text-[#fff]/70 text-sm'>người dùng đã xác minh</span>
          </div>
        </div>

        {/* Người chưa xác minh email */}
        <div className='relative  rounded-lg overflow-hidden m-2 bg-[#F59E0B] shadow-md'>
          <i className='absolute bottom-0 left-0 text-5xl text-[#fff]/20'>
            <Icon name='email' />
          </i>
          <div className='flex flex-col text-[#fff] items-end h-full p-4 gap-2 pl-2'>
            <span className='font-bold text-3xl'>{countUnverifiedEmail}</span>
            <span className='text-[#fff]/70 text-sm'>người dùng chưa xác minh Email</span>
          </div>
        </div>

        {/* Người chưa xác minh SMS */}
        <div className='relative  rounded-lg overflow-hidden m-2 bg-[#EF4444] shadow-md'>
          <i className='absolute bottom-0 left-0 text-5xl text-[#fff]/20'>
            <Icon name='sms' />
          </i>
          <div className='flex flex-col text-[#fff] items-end h-full p-4 gap-2 pl-2'>
            <span className='font-bold text-3xl'>{countUnverifiedPhone}</span>
            <span className='text-[#fff]/70 text-sm'>người dùng chưa xác minh SMS</span>
          </div>
        </div>
      </div>
    </>
  )
}
export { AccountVerified }

export default function UserAccount() {
  // hàm đếm user hoạt động và vô hiệu hóa
  const Activity = UserList.filter((item: any) => item.status === 1).length
  const Disable = UserList.filter((item: any) => item.status !== 1).length
  return (
    <>
      <div className='flex flex-col h-full md:px-2 w-full py-4  pt-2 '>
        <div className='py-3 flex justify-between px-3 items-center text-center w-full shadow-md bg-[#fff] md:rounded-lg  '>
          <h1 className='text-1xl sm:text-3xl font-bold text-gray-700'>Tài khoảng người dùng</h1>
        </div>
        {/* Account */}
        <div>
          <AccountVerified />
          <div className=' grid grid-cols-2  col-span-2  '>
            {/* Người dùng đã xác minh */}
            <div className='relative  rounded-lg overflow-hidden m-2 bg-[#10B981] shadow-md'>
              <i className='absolute bottom-0 left-0 text-5xl text-[#fff]/20'>
                <Icon name='users' />
              </i>
              <div className='flex flex-col text-[#fff] items-end h-full p-4 gap-2 pl-2'>
                <span className='font-bold text-3xl'>{Activity}</span>
                <span className='text-[#fff]/70 text-sm'>người dùng hoạt động</span>
              </div>
            </div>
            {/* Người chưa xác minh SMS */}
            <div className='relative  rounded-lg overflow-hidden m-2 bg-[#EF4444] shadow-md'>
              <i className='absolute bottom-0 left-0 text-5xl text-[#fff]/20'>
                <Icon name='users' />
              </i>
              <div className='flex flex-col text-[#fff] items-end h-full p-4 gap-2 pl-2'>
                <span className='font-bold text-3xl'>{Disable}</span>
                <span className='text-[#fff]/70 text-sm'>người dùng Vô hiệu hóa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account List */}
        <div>
          <Account />
        </div>
      </div>
    </>
  )
}
