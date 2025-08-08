import Background from '../../../assets/background.jpg'
import { useState, useEffect } from 'react'
import Icon from '../../../icons/Icon'
import { useTranslation } from 'react-i18next'

export default function Changepassword() {
  const { t } = useTranslation('Changepassword')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [userInfo, setUserInfo] = useState<any>(null)
  const [userList, setUserList] = useState<any[]>([])
  const [error, setError] = useState('') // error và success message
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo') || 'null')
    const list = JSON.parse(localStorage.getItem('userList') || '[]')
    setUserInfo(user)
    setUserList(list)
  }, [])

  const validateForm = () => {
    if (!userInfo) return t('messages.userNotFound')
    if (!password || !confirmpassword) {
      return t('messages.fillAllFields')
    }
    if (userInfo.password && currentPassword !== userInfo.password) {
      return t('messages.currentPasswordIncorrect')
    }
    if (password.length < 10) {
      return t('messages.passwordMinLength')
    }
    if (password !== confirmpassword) {
      return t('messages.passwordMismatch')
    }

    return ''
  }
  // hàm delay 3s
  const [delay, setDelay] = useState(false)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    const errorMsg = validateForm()
    if (errorMsg) {
      setError(errorMsg)
      return
    }
    setDelay(true)
    setTimeout(() => {
      // Cập nhật userList
      const updatedList = userList.map((user) => (user.id === userInfo.id ? { ...user, password } : user))
      localStorage.setItem('userList', JSON.stringify(updatedList))

      // Cập nhật userInfo
      const updatedUser = { ...userInfo, password }
      localStorage.setItem('userInfo', JSON.stringify(updatedUser))

      setError('')
      setSuccess(t('messages.changePasswordSuccess'))

      setPassword('')
      setConfirmPassword('')
      setCurrentPassword('')
      setDelay(false)
    }, 3000)
  }

  return (
    <>
      {/* Banner */}
      <div
        className='w-full h-48 flex items-center justify-center bg-cover bg-center relative'
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className='absolute inset-0 bg-black/50' />
        <h1 className='relative z-10 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#fff]'>{t('title')}</h1>
      </div>

      {/* Form */}
      <div className='sm:px-[5%] lg:px-[15%] xl:px-[30%] my-6'>
        <form onSubmit={handleSubmit} className='rounded-2xl md:shadow-lg p-6 flex flex-col gap-6 bg-[#fff]'>
          {error && <div className='bg-red-100 text-red-600 p-3 rounded-lg text-sm'>{error}</div>}
          {success && <div className='bg-green-100 text-green-600 p-3 rounded-lg text-sm'>{success}</div>}

          {userInfo?.password && (
            <div className='flex flex-col'>
              <label className='font-medium'>
                {t('form.currentPassword.label')}{' '}
                <sup className='text-red-500'>{t('form.currentPassword.required')}</sup>
              </label>
              <input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type='password'
                placeholder={t('form.currentPassword.placeholder')}
                className='mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400'
              />
            </div>
          )}

          <div className='flex flex-col'>
            <label className='font-medium'>
              {t('form.newPassword.label')} <sup className='text-red-500'>{t('form.newPassword.required')}</sup>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder={t('form.newPassword.placeholder')}
              className='mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400'
            />
          </div>

          <div className='flex flex-col'>
            <label className='font-medium'>
              {t('form.confirmPassword.label')} <sup className='text-red-500'>{t('form.confirmPassword.required')}</sup>
            </label>
            <input
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type='password'
              placeholder={t('form.confirmPassword.placeholder')}
              className='mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400'
            />
          </div>

          <button
            type='submit'
            disabled={delay}
            className={`h-11 rounded-lg font-semibold transition ${
              !delay
                ? 'bg-green-500 hover:bg-green-600 text-[#fff] cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {delay ? (
              <>
                <i className=' mr-2'>
                  <Icon name='loading' />
                </i>
                {t('button.processing')}
              </>
            ) : (
              t('button.submit')
            )}
          </button>
        </form>
      </div>
    </>
  )
}
