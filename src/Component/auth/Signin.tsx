import logo from '@assets/logo/Bus_Ticket_Header.png'
import background from '@assets/auth/background-login.jpg'
import Icon from '../../icons/Icon'
import { useGoogleLogin } from '@react-oauth/google'
import { useTranslation } from 'react-i18next'
import { loginUsergoogle, loginUsersignin } from '../../api/userApi'
import { useState, useEffect } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
// import FacebookLoginButton from '../../services/FacebookLoginButton'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
// Signin.tsx - import với relative path
import type { UserInfo } from '../../types/userInfo'
const AdminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}')
export default function Signin() {
  const { t } = useTranslation('Signin')
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const navigate = useNavigate()
  // hàm xử lý đăng nhập với Google lưu thông tin người dùng vào localStorage
  // const handleGoogleLogin = async (response: any) => {
  //   try {
  //     if (AdminInfo) {
  //       localStorage.removeItem('adminInfo')
  //     }
  //     const { data } = await axios.get(
  //       `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
  //     )

  //     // Lấy danh sách user đã lưu
  //     const userList: UserInfo[] = JSON.parse(localStorage.getItem('userList') || '[]')

  //     // Kiểm tra xem người dùng đã tồn tại chưa (dựa vào googleId)
  //     const existingUser = userList.find((u) => u.email === data.email)

  //     let user: UserInfo

  //     if (existingUser) {
  //       // Nếu đã có, dùng lại thông tin cũ
  //       user = existingUser
  //     } else {
  //       // Nếu chưa có, tạo user mới và thêm vào danh sách
  //       user = {
  //         id: Date.now(), // Gán ID mới
  //         email: data.email,
  //         firstname: data.given_name,
  //         lastname: data.family_name,
  //         googleId: data.sub,
  //         imageUrl: data.picture,
  //         name: data.name,
  //         status: 1,
  //         type: 1,
  //         ticket: [],
  //         chats: []
  //       }

  //       userList.push(user)
  //       localStorage.setItem('userList', JSON.stringify(userList))
  //     }

  //     // Lưu thông tin user đang đăng nhập
  //     localStorage.setItem('userInfo', JSON.stringify(user))

  //     // Chuyển hướng sang dashboard
  //     navigate('/user/dashboard') // React Router
  //   } catch (error) {
  //     console.error('Lỗi đăng nhập Google:', error)
  //   }
  // }
  // Hàm xử lý đăng nhập với Google lưu thông tin người dùng vào  mongoDB
  const handleGoogleLogin = async (response: any) => {
    try {
      if (AdminInfo) {
        localStorage.removeItem('adminInfo')
      }

      // Lấy info từ Google API
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
      )

      // Gửi thông tin user Google về backend để lưu vào Mongo
      const res = await loginUsergoogle({
        email: data.email,
        firstname: data.given_name,
        lastname: data.family_name,
        googleId: data.sub,
        imageUrl: data.picture,
        name: data.name
      })

      // Nhận token + user từ backend
      const { token, user } = res.data

      // Lưu token và user vào localStorage
      localStorage.setItem('userInfo', JSON.stringify(user))
      localStorage.setItem('token', token)

      navigate('/user/dashboard')
    } catch (error) {
      console.error('Lỗi đăng nhập Google:', error)
    }
  }

  // Hàm xử lý đăng nhập thất bại với Google
  const handleGoogleLoginError = () => {}
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

  const [message, setMessage] = useState('')
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

  const [islogin, setlogin] = useState(false)

  // Hàm xử lý đăng nhập localStorage
  // const handleLogin = (e: any) => {
  //   e.preventDefault()
  //   if (AdminInfo) {
  //     localStorage.removeItem('adminInfo')
  //   }
  //   if (!captchaValue) {
  //     setMessage(t('messages.captchaRequired'))
  //     return
  //   }
  //   if (!useremail || !password) {
  //     setMessage(t('messages.fieldsRequired'))
  //     return
  //   }

  //   setlogin(true)
  //   setTimeout(() => {
  //     try {
  //       // Lấy danh sách user đã lưu
  //       const userList: UserInfo[] = JSON.parse(localStorage.getItem('userList') || '[]')

  //       // Tìm người dùng có email và mật khẩu khớp
  //       const user = userList.find((u) => u.email === useremail && u.password === password)
  //       if (user) {
  //         if (user.status === 0) { //status 0 là tài khoản bị khóa
  //           setMessage(t('messages.accountLocked'))
  //           setlogin(false)
  //           return
  //         }
  //         // Lưu thông tin người dùng vào localStorage
  //         localStorage.setItem('userInfo', JSON.stringify(user))
  //         alert(t('messages.loginSuccess'))
  //         // Sử dụng navigate thay vì window.location.href
  //         navigate('/user/dashboard')
  //       } else {
  //         setMessage(t('messages.invalidCredentials'))
  //       }
  //     } catch (error) {
  //       console.error('Lỗi đăng nhập:', error)
  //       alert(t('messages.loginError'))
  //     }
  //     setlogin(false)
  //   }, 3000)
  // }

  // Hàm xử lý đăng nhập với server data mongodb
  const handleLogin = async (e: any) => {
    e.preventDefault()

    if (!captchaValue) {
      setMessage(t('messages.captchaRequired'))
      return
    }
    if (!useremail || !password) {
      setMessage(t('messages.fieldsRequired'))
      return
    }

    setlogin(true)
    try {
      const res = await loginUsersignin({ email: useremail, password })

      // Lưu user + token vào localStorage
      localStorage.setItem('userInfo', JSON.stringify(res.data.user))
      localStorage.setItem('token', res.data.token)

      alert(t('messages.loginSuccess'))
      navigate('/user/dashboard')
    } catch (error: any) {
      console.error('Lỗi đăng nhập:', error)
      setMessage(error.response?.data?.message || t('messages.loginError'))
    } finally {
      setlogin(false)
    }
  }

  return (
    <div className='flex flex-col md:flex-row  min-h-screen  bg-gray-100'>
      <div className='w-full md:w-2/4  '>
        <img src={background} alt='Background' className=' object-cover object-left h-full w-full  ' />
      </div>

      <div className='  flex flex-col items-center justify-start w-full md:w-2/4 max-h-screen bg-[#fff] py-4 px-4 overflow-y-auto'>
        <div
          onClick={() => navigate('/')}
          className=' cursor-pointer mr-auto ml-0 md:ml-4  text-gray-500  font-semibold  '
        >
          <i className='text-[12px]'>
            <Icon name='arrowleft' />
          </i>
          <span className='text-[12px] font-bold'> {t('navigation.goBack')}</span>
        </div>
        <img src={logo} alt='Bus Ticket Logo' className='w-32 h-32 object-contain md:mb-6' />
        {/* hiệu email người đăng nhập */}

        <div className='  w-full max-w-md'>
          <div className='gap-4 flex flex-col  '>
            <div
              onClick={() => login()}
              className='cursor-pointer flex items-center justify-center p-1 rounded-[10px] gap-2 border border-[#8b8b8b] w-full'
            >
              <i>
                <Icon name='google' />
              </i>
              <span className='text-[12px]'>{t('buttons.loginWithGoogle')}</span>
            </div>

            {/* <FacebookLoginButton onLogin={handleFacebookLogin} /> */}
            {/* <div className='flex items-center justify-center p-1 rounded-[10px] gap-2 border-1 border-[#8b8b8b] w-full  '>
              <i>
                <Icon name='linkedin' />
              </i>
              <span className='text-[12px]'> Login With Google</span>
            </div> */}
          </div>
          <div className='flex items-center justify-center my-2 md:my-4'>
            <div className='flex-grow border-t border-dashed border-gray-400'></div>
            <span className='mx-2 text-gray-500 text-sm'>{t('divider')}</span>
            <div className='flex-grow border-t border-dashed border-gray-400'></div>
          </div>
          {message && (
            <div className='text-red-500 text-sm mb-4 md:mb-6 border border-red-50 p-1 rounded-lg bg-red-100 flex justify-between'>
              <div>
                <strong className='text-[13px] '>{t('messages.note')} </strong>
                <span className='text-[12px] text-nowrap'>{message}</span>
              </div>
              <i className=' cursor-pointer text-[12px] text-red-500 hover:text-red-700' onClick={() => setMessage('')}>
                {' '}
                <Icon name='close' />
              </i>
            </div>
          )}

          <div className=''>
            <form className='flex flex-col gap-4'>
              <div>
                <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                  {t('form.email.label')}
                  <sup className='text-red-600'>*</sup>
                </label>
                <input
                  type='username'
                  id='username'
                  autoComplete='new-username'
                  value={useremail}
                  onChange={(e) => setUseremail(e.target.value)}
                  className='mt-1   w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500 sm:text-sm'
                  placeholder={t('form.email.placeholder')}
                />
              </div>
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  {t('form.password.label')}
                  <sup className='text-red-600'>*</sup>
                </label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  autoComplete='new-password'
                  onChange={(e) => setPassword(e.target.value)}
                  className='mt-1   w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500 sm:text-sm'
                  placeholder={t('form.password.placeholder')}
                />
              </div>
              <div className=' flex  '>
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_KEY} // Thay bằng site key của bạn
                  onChange={handleCaptchaChange}
                />
              </div>
              <div className='   flex justify-between items-center mt-2'>
                <div className='flex items-center'>
                  <input className='cursor-pointer' type='checkbox' id='rememberme' />
                  <label htmlFor='rememberme' className=' cursor-pointer ml-2 text-[15px] text-gray-700'>
                    {t('form.rememberMe')}
                  </label>
                </div>
                <Link to='/forgot-password' className='text-[15px] text-gray-500'>
                  <div>
                    <p className=' cursor-pointer text-[15px] text-gray-500'>{t('form.forgotPassword')}</p>
                  </div>
                </Link>
              </div>

              <button
                onClick={handleLogin}
                className={`bg-[#23ff52] h-10 w-full mt-1 ${
                  captchaValue && !islogin ? 'hover:bg-[#00ff37] cursor-pointer' : 'opacity-50 cursor-not-allowed'
                }   text-black font-semibold rounded`}
                disabled={!captchaValue || islogin}
              >
                {islogin ? (
                  <div className='flex items-center justify-center'>
                    <i className='fa-solid fa-spinner animate-spin mr-2'></i>
                    <span>{t('buttons.loggingIn')}</span>
                  </div>
                ) : (
                  t('buttons.login')
                )}
              </button>

              <div>
                <p className='text-sm text-gray-500 mt-2 mb-10'>
                  {t('signup.noAccount')}{' '}
                  <a href='/signup' className={`text-blue-500 hover:underline    `}>
                    {t('signup.signUpLink')}
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
