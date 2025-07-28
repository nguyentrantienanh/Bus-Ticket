import Background from '../../../assets/background.jpg'
import { useState, useEffect } from 'react'

export default function Changepassword() {
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [userInfo, setUserInfo] = useState<any>(null)
  const [userList, setUserList] = useState<any[]>([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo') || 'null')
    const list = JSON.parse(localStorage.getItem('userList') || '[]')
    setUserInfo(user)
    setUserList(list)
  }, [])

  const handleSubmit = (e: any) => {
    if (!userInfo) return alert('Không tìm thấy người dùng')

    // Nếu người dùng đã có mật khẩu → kiểm tra mật khẩu cũ
    if (userInfo.password) {
      if (currentPassword !== userInfo.password) {
        return alert('Mật khẩu hiện tại không đúng!')
      }
    }

    if (password.length < 10) {
      return alert('Mật khẩu mới phải có ít nhất 10 ký tự')
    }

    if (password !== confirmpassword) {
      return alert('Mật khẩu xác nhận không khớp')
    }

    // Cập nhật mật khẩu trong userList
    const updatedList = userList.map((user) => (user.id === userInfo.id ? { ...user, password } : user))
    localStorage.setItem('userList', JSON.stringify(updatedList))

    // Cập nhật userInfo
    const updatedUser = { ...userInfo, password }
    localStorage.setItem('userInfo', JSON.stringify(updatedUser))

    alert('Đổi mật khẩu thành công!')
    setPassword('')
    setConfirmPassword('')
    setCurrentPassword('')
  }

  return (
    <>
      <div
        className=' w-full h-50 flex items-center justify-center'
        style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000068]'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#fff]'>Change Password</h1>
        </div>
      </div>

      <div className=' sm:px-[5%] lg:px-[15%] xl:px-[30%] my-10'>
        <form
          onSubmit={handleSubmit}
          className='rounded-2xl shadow-[0_5px_25px_rgba(0,0,0,0.25)] p-3 flex flex-col gap-8'
        >
          {/* Nếu có mật khẩu cũ mới hiện input Current Password */}
          {userInfo?.password && (
            <div className='flex flex-col'>
              <label>
                Current Password <sup className='text-red-600'>*</sup>
              </label>
              <input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type='password'
                placeholder='Nhập mật khẩu hiện tại'
                className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:shadow-green-300 focus:border-green-500'
              />
            </div>
          )}

          <div className='flex flex-col'>
            <label>
              New Password <sup className='text-red-600'>*</sup>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Mật khẩu mới (trên 10 ký tự)'
              className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:shadow-green-300 focus:border-green-500'
            />
          </div>

          <div className='flex flex-col'>
            <label>
              Confirm Password <sup className='text-red-600'>*</sup>
            </label>
            <input
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type='password'
              placeholder='Xác nhận mật khẩu mới'
              className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:shadow-green-300 focus:border-green-500'
            />
          </div>

          <button
            type='submit'
            className={`bg-[#23ff52] h-10 w-full text-black font-semibold rounded ${password && confirmpassword ? 'hover:bg-[#00ff37]' : 'opacity-50 cursor-not-allowed'}`}
          >
            Xác nhận
          </button>
        </form>
      </div>
    </>
  )
}
