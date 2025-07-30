import logo from '../../assets/logo/Bus_Ticket_Header.png'
import background from '../../assets/auth/background-login.jpg'
import Icon from '../../icons/Icon'
import { useGoogleLogin } from '@react-oauth/google'

import { useState, useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
// import FacebookLoginButton from '../../services/FacebookLoginButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type UserInfo = {
  id: number
  email: string
  firstname: string
  status: number
  username?: string
  password?: string
  address?: string
  lastname: string
  googleId?: string
  imageUrl: string
  name: string
  ticket: any[]
  chats: any[]
  type: number
}

export default function Signin() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const navigate = useNavigate()
  const handleGoogleLogin = async (response: any) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
      )

      // Lấy danh sách user đã lưu
      const userList: UserInfo[] = JSON.parse(localStorage.getItem('userList') || '[]')

      // Kiểm tra xem người dùng đã tồn tại chưa (dựa vào googleId)
      const existingUser = userList.find((u) => u.email === data.email)

      let user: UserInfo

      if (existingUser) {
        // Nếu đã có, dùng lại thông tin cũ
        user = existingUser
      } else {
        // Nếu chưa có, tạo user mới và thêm vào danh sách
        user = {
          id: Date.now(), // Gán ID mới
          email: data.email,
          firstname: data.given_name,
          lastname: data.family_name,
          googleId: data.sub,
          imageUrl: data.picture,
          name: data.name,
          status: 1,
          type: 1,
          ticket: [],
          chats: []
        }

        userList.push(user)
        localStorage.setItem('userList', JSON.stringify(userList))
      }

      // Lưu thông tin user đang đăng nhập
      localStorage.setItem('userInfo', JSON.stringify(user))

      // Chuyển hướng sang dashboard
      window.location.href = '/user/dashboard'
    } catch (error) {
      console.error('Lỗi đăng nhập Google:', error)
    }
  }

  // Hàm xử lý đăng nhập thất bại với Google
  const handleGoogleLoginError = () => {
    console.error('Google Login Failed')
  }
  // Sử dụng hook useGoogleLogin để đăng nhập với Google
  const login = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: handleGoogleLoginError
  })

  // Hàm xử lý captcha
  const [captchaValue, setCaptchaValue] = useState(false)
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(!!value) // Chuyển đổi giá trị thành boolean
  }

  // const handleFacebookLogin = ( ) => {
  //   // Xử lý đăng nhập với Facebook
  // }

  // luu thông tin người dùng vào localStorage
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  }, [userInfo])
  // lưu thông tin người dùng từ localStorage khi component được mount
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo))
    }
  }, [])

  const [useremail, setUseremail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        setUseremail('')
        setPassword('')
      }
    })
  }, [])

  const handleLogin = (e: any) => {
    e.preventDefault()
    try {
      // Lấy danh sách user đã lưu
      const userList: UserInfo[] = JSON.parse(localStorage.getItem('userList') || '[]')

      // Tìm người dùng có email và mật khẩu khớp
      const user = userList.find((u) => u.email === useremail && u.password === password)
      if (user) {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('userInfo', JSON.stringify(user))
        alert('Đăng nhập thành công!')
        // Sử dụng navigate thay vì window.location.href
        navigate('/user/dashboard')
      } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng.')
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error)
      alert('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.')
    }
  }

  return (
    <div className='flex flex-col md:flex-row  min-h-screen  bg-gray-100'>
      <div className='w-full md:w-2/4  '>
        <img src={background} alt='Background' className=' object-cover object-left h-full w-full  ' />
      </div>

      <div className='  flex flex-col items-center justify-start w-full md:w-2/4 min-h-screen bg-[#fff] py-8 px-4 overflow-y-auto'>
        <img src={logo} alt='Bus Ticket Logo' className='w-32 h-32 object-contain mb-6' />
        {/* hiệu email người đăng nhập */}

        <div className='w-full max-w-md'>
          <div className='gap-4 flex flex-col  '>
            <div
              onClick={() => login()}
              className='cursor-pointer flex items-center justify-center p-1 rounded-[10px] gap-2 border border-[#8b8b8b] w-full'
            >
              <i>
                <Icon name='google' />
              </i>
              <span className='text-[12px]'>Login With Google</span>
            </div>

            {/* <FacebookLoginButton onLogin={handleFacebookLogin} /> */}
            <div className='flex items-center justify-center p-1 rounded-[10px] gap-2 border-1 border-[#8b8b8b] w-full  '>
              <i>
                <Icon name='linkedin' />
              </i>
              <span className='text-[12px]'> Login With Google</span>
            </div>
          </div>
          <div className='flex items-center justify-center my-4'>
            <div className='flex-grow border-t border-dashed border-gray-400'></div>
            <span className='mx-2 text-gray-500 text-sm'>OR</span>
            <div className='flex-grow border-t border-dashed border-gray-400'></div>
          </div>

          <div>
            <form className='flex flex-col gap-4'>
              <div>
                <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                  Email<sup className='text-red-600'>*</sup>
                </label>
                <input
                  type='username'
                  id='username'
                  autoComplete='new-username'
                  value={useremail}
                  onChange={(e) => setUseremail(e.target.value)}
                  className='mt-1   w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500 sm:text-sm'
                  placeholder='Enter Your  email'
                />
              </div>
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Password<sup className='text-red-600'>*</sup>
                </label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  autoComplete='new-password'
                  onChange={(e) => setPassword(e.target.value)}
                  className='mt-1   w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500 sm:text-sm'
                  placeholder='Enter Your password'
                />
              </div>
              <div className=' flex  '>
                <ReCAPTCHA
                  sitekey='6LfaJl8rAAAAAJJD6pV-vSh9tV8gvUeEFU6B6B5k' // Thay bằng site key của bạn
                  onChange={handleCaptchaChange}
                />
              </div>
              <div className='flex justify-between items-center mt-2'>
                <div className='flex items-center'>
                  <input type='checkbox' id='rememberme' />
                  <label htmlFor='rememberme' className='ml-2 text-sm text-gray-700'>
                    Remember me
                  </label>
                </div>
                <div>
                  <p>Forgot Password?</p>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className={`bg-[#23ff52] h-10 w-full mt-2 ${captchaValue ? 'hover:bg-[#00ff37] cursor-pointer' : 'opacity-50 cursor-not-allowed'} `}
                disabled={!captchaValue}
              >
                Đăng nhập
              </button>

              <div>
                <p className='text-sm text-gray-500 mt-2 mb-20'>
                  Don't have an account?{' '}
                  <a href='/signup' className={`text-blue-500 hover:underline    `}>
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
