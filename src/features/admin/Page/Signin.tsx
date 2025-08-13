import React, { useState, useEffect } from 'react'
import logo from '../../../assets/logo/Bus_Ticket_Header.png'
import ReCAPTCHA from 'react-google-recaptcha'
const ADMIN_USERNAME = 'admin123456'
const ADMIN_PASSWORD = 'admin123456'

const Signin: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (UserInfo) {
      localStorage.removeItem('userInfo')
    }
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('adminInfo', JSON.stringify({ adminId: 'admin123456' }))

      alert('Đăng nhập thành công!')
      window.location.href = '/admin/dashboard'
    } else {
      alert('Tên đăng nhập hoặc mật khẩu không đúng.')
    }
  }
  useEffect(() => {
    setUsername('')
    setPassword('')
    setCaptchaValue(false)
    localStorage.removeItem('adminInfo')
  }, [])
  // Hàm xử lý captcha
  const [captchaValue, setCaptchaValue] = useState(false)
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(!!value) // Chuyển đổi giá trị thành boolean
  }
  return (
    <div className='max-w-md mx-auto mt-10 p-6     rounded-lg shadow-sm shadow-emerald-300 border-1 border-dotted border-emerald-300 bg-[#fff]'>
      <div className='flex justify-center  '>
        <img src={logo} alt='Logo' className='w-24 h-24  ' />
      </div>
      <h2 className=" className='block text-3xl text-center pb-5  text-balance font-medium text-gray-700'">
        Đăng nhập Admin
      </h2>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <div>
          <label htmlFor='username' className='text-[18px] text-sm font-medium text-gray-700'>
            Username<sup className='text-red-600'>*</sup>
          </label>
          <input
            type='text'
            className='mt-1   w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500 sm:text-sm'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='new-username'
            placeholder='Nhập tên đăng nhập'
            required
          />
        </div>
        <div>
          <label htmlFor='password' className=' text-[18px]   text-sm font-medium text-gray-700'>
            Password<sup className='text-red-600'>*</sup>
          </label>
          <input
            type='password'
            className='mt-1   w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500 sm:text-sm'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='new-password'
            placeholder='Nhập mật khẩu'
            required
          />
        </div>
        <div className=' flex py-2 '>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_KEY} // Thay bằng site key của bạn
            onChange={handleCaptchaChange}
          />
        </div>
        <button
          className={`bg-[#23ff52] h-10 w-full mt-2 ${captchaValue ? 'hover:bg-[#00ff37] cursor-pointer' : 'opacity-50 cursor-not-allowed'} text-black font-semibold rounded`}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  )
}

export default Signin
