import logo from '../../assets/logo/Bus_Ticket_Header.png'
import background from '../../assets/auth/background-login.jpg'
import { useTranslation } from 'react-i18next'

import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Icon from '../../icons/Icon'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
  const { t } = useTranslation('auth', { keyPrefix: 'Signup' })
  const navigate = useNavigate()
  // // Hàm xử lý captcha
  const [captchaValue, setCaptchaValue] = useState(false)
  // hàm xử lý đã check click chưa
  const [checkclick, setcheckclick] = useState(false)
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(!!value) // Chuyển đổi giá trị thành boolean
  }
  const handleCheckclick = () => {
    setcheckclick(!checkclick)
  }
  const [confirmpassword, setconfirmpassword] = useState('')

  const Userlist = JSON.parse(localStorage.getItem('userList') || '[]')

  const [fromData, setFromData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })

  const ktremail = Userlist.find((u: any) => u.email === fromData.email)
  const [isSignup, setisSignup] = useState(false)
  const handleSignup = () => {
    if (fromData.password.length < 10) {
      alert(t('messages.passwordTooShort'))
      return
    }

    if (ktremail) {
      alert(t('messages.emailExists'))
      return
    }

    if (fromData.lastname && fromData.firstname && fromData.email && fromData.password && confirmpassword) {
      if (fromData.password !== confirmpassword) {
        alert(t('messages.passwordMismatch'))
        return
      }
    } else {
      alert(t('messages.fillAllFields'))
      return
    }
    setisSignup(true)
    setTimeout(() => {
      // Lưu thông tin người dùng mới vào localStorage
      const newUser = {
        ...fromData,
        id: Date.now(),
        status: 1,
        type: 1,
        name: `${fromData.firstname} ${fromData.lastname}`,
        imageUrl: '',
        chats: [],
        ticket: []
      }
      Userlist.push(newUser)
      localStorage.setItem('userList', JSON.stringify(Userlist))
      alert(t('messages.accountCreated'))
      window.location.href = '/signin'
      setisSignup(false)
    }, 3000)
  }
  // hàm kiểm tra confirmpassword

  return (
    <div className='flex flex-col md:flex-row  min-h-screen  bg-gray-100'>
      <div className='w-full md:w-2/4  '>
        <img src={background} alt='Background' className=' object-cover object-left h-full w-full ' />
      </div>
      <div className='  flex flex-col items-center justify-start w-full md:w-2/4 max-h-screen bg-[#fff] py-4 px-4 overflow-y-auto'>
        <div
          onClick={() => navigate('/')}
          className=' cursor-pointer mr-auto ml-0 md:ml-4  text-gray-500 font-semibold  '
        >
          <i className='text-[12px]'>
            <Icon name='arrowleft' />
          </i>
          <span className='text-[12px] font-bold'> {t('navigation.goBack')}</span>
        </div>
        <img src={logo} alt='Bus Ticket Logo' className='w-32 h-32 object-contain md:mb-6' />

        <div>
          <form className='grid grid-cols-2 gap-4 md:my-4'>
            <div>
              <label htmlFor='lastname' className='block text-sm font-medium text-gray-700'>
                {t('form.lastName.label')}<sup className='text-red-600'>*</sup>
              </label>
              <input
                type='lastname'
                id='lastname'
                value={fromData.lastname}
                required
                onChange={(e) => setFromData({ ...fromData, lastname: e.target.value })}
                className='mt-1   w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500 sm:text-sm'
                placeholder={t('form.lastName.placeholder')}
              />
            </div>
            <div>
              <label htmlFor='firstname' className='block text-sm font-medium text-gray-700'>
                {t('form.firstName.label')}<sup className='text-red-600'>*</sup>
              </label>
              <input
                type='firstname'
                id='firstname'
                value={fromData.firstname}
                required
                onChange={(e) => setFromData({ ...fromData, firstname: e.target.value })}
                className='mt-1   w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500 sm:text-sm'
                placeholder={t('form.firstName.placeholder')}
              />
            </div>

            <div className='col-span-2'>
              <label htmlFor='e-mailaddress' className='block text-sm font-medium text-gray-700'>
                {t('form.email.label')}<sup className='text-red-600'>*</sup>
              </label>
              <input
                type='e-mailaddress'
                id='e-mailaddress'
                value={fromData.email}
                required
                onChange={(e) => setFromData({ ...fromData, email: e.target.value })}
                className='mt-1   w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500 sm:text-sm'
                placeholder={t('form.email.placeholder')}
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                {t('form.password.label')}<sup className='text-red-600'>*</sup>
              </label>
              <input
                type='password'
                id='password'
                value={fromData.password}
                required
                onChange={(e) => setFromData({ ...fromData, password: e.target.value })}
                className='mt-1   w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:shadow-green-300  focus:border-green-500 sm:text-sm'
                placeholder={t('form.password.placeholder')}
              />
            </div>
            <div>
              <label htmlFor='confirmpassword' className='block text-sm font-medium text-gray-700'>
                {t('form.confirmPassword.label')}<sup className='text-red-600'>*</sup>
              </label>
              <input
                type='password'
                id='confirmpassword'
                required
                value={confirmpassword}
                onChange={(e) => {
                  setconfirmpassword(e.target.value)
                }}
                className='mt-1   w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500 sm:text-sm'
                placeholder={t('form.confirmPassword.placeholder')}
              />
            </div>
            <div className=' flex mt-1  col-span-2'>
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_KEY} // Thay bằng site key của bạn
                onChange={handleCaptchaChange}
              />
            </div>
          </form>

          <div className='flex items-center mt-2'>
            <input onChange={handleCheckclick} type='checkbox' id='I agree with' />
            <label htmlFor='I agree with' className='ml-2 text-sm text-gray-700'>
              {t('agreement.text')}{' '}
              <a href='/viserbus/policy/privacy-policy' className='text-green-600 hover:underline'>
                {t('agreement.privacyPolicy')}
              </a>
              ,{' '}
              <a href='viserbus/policy/terms-of-service' className='text-green-600 hover:underline'>
                {t('agreement.termsOfService')}
              </a>
              ,{' '}
              <a href='viserbus/policy/ticket-policy' className='text-green-600 hover:underline'>
                {t('agreement.ticketPolicy')}
              </a>
              ,{' '}
              <a href='viserbus/policy/refund-policy' className='text-green-600 hover:underline'>
                {t('agreement.refundPolicy')}
              </a>
            </label>
          </div>

          <button
            onClick={handleSignup}
            className={`bg-[#23ff52] h-10 w-full mt-2 ${captchaValue && checkclick && !isSignup ? 'hover:bg-[#00ff37] cursor-pointer' : 'opacity-50 cursor-not-allowed'} text-black font-semibold rounded`}
            disabled={!captchaValue || !checkclick || isSignup}
          >
            {isSignup ? (
              <>
                <Icon name='loading' /> {t('buttons.creatingAccount')}
              </>
            ) : (
              t('buttons.signup')
            )}
          </button>
          <div>
            <p className='text-sm text-gray-500 mt-2 mb-10'>
              {t('signin.haveAccount')}{' '}
              <a href='/signin' className='text-blue-500 hover:underline'>
                {t('signin.signInLink')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
