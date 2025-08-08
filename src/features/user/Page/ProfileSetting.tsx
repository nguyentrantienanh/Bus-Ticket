import background from '../../../assets/background.jpg'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import Icon from '../../../icons/Icon'
import { useTranslation } from 'react-i18next'

export default function ProfileSetting() {
  const { t } = useTranslation('ProfileSetting')
  const handleGoogleLogout = () => {
    googleLogout()
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userthongtin')
    window.location.href = '/'
  }

  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const { id } = useParams<{ id: string }>()
  const userlist = UserList.find((user: any) => user.id === parseInt(id || '0'))
  const UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

  const [nameValue, setnameValue] = useState(userlist?.name || `${UserInfo.firstname} ${UserInfo.lastname}`)
  const [countryValue, setCountryValue] = useState(userlist?.country || UserInfo.country || 'vietnam')
  const [countryCode, setCountryCode] = useState(userlist?.countryCode || UserInfo.countryCode || '84 +')
  const [phoneValue, setPhoneValue] = useState(userlist?.phone || UserInfo.phone || '')
  const [addressValue, setaddressValue] = useState(userlist?.address || UserInfo.address || '')
  const [emailValue, setemailValue] = useState(userlist?.state || UserInfo.email || `${UserInfo.email}`)
  const [zipcodeValue, setzipcodeValue] = useState(userlist?.zipcode || UserInfo.zipcode || '')
  const [cityValue, setcityValue] = useState(userlist?.city || UserInfo.city || '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const countryOptions = [
    { id: '1', maqg: '84 +', value: 'vietnam', label: t('form.country.options.vietnam') },
    { id: '2', maqg: '29 +', value: 'usa', label: t('form.country.options.usa') },
    { id: '3', maqg: '81 +', value: 'japan', label: t('form.country.options.japan') },
    { id: '4', maqg: '82 +', value: 'korea', label: t('form.country.options.korea') }
  ]

  const handleCountryChange = (e: any) => {
    const selectedCountryValue = e.target.value
    setCountryValue(selectedCountryValue)
    const selectedOption = countryOptions.find((option) => option.value === selectedCountryValue)
    if (selectedOption) {
      setCountryCode(selectedOption.maqg)
    } else {
      setCountryCode('')
    }
  }

  const handleChange = (e: any) => setnameValue(e.target.value)
  const handlePhoneChange = (e: any) => setPhoneValue(e.target.value.replace(/\D/g, ''))
  const handleAddressChange = (e: any) => setaddressValue(e.target.value)
  const handleEmailChange = (e: any) => setemailValue(e.target.value)
  const handleZipcodeChange = (e: any) => setzipcodeValue(e.target.value)
  const handleCityChange = (e: any) => setcityValue(e.target.value)

  const isFormValid = () => {
    return (
      nameValue.trim() !== '' &&
      countryValue.trim() !== '' &&
      phoneValue.trim().length === 10 &&
      (addressValue.trim() !== '' || emailValue.trim() !== '' || zipcodeValue.trim() !== '' || cityValue.trim() !== '')
    )
  }

  const handleSaveUserthonin = () => {
    if (!isFormValid()) {
      setError(t('messages.error'))
      return
    }
    const updatedUser = {
      id: UserInfo.id,
      email: emailValue,
      firstname: nameValue.split(' ')[1] || '',
      lastname: nameValue.split(' ')[0] || '',
      googleId: UserInfo.googleId,
      imageUrl: UserInfo.imageUrl,
      name: nameValue,
      country: countryValue,
      countryCode,
      phone: phoneValue,
      address: addressValue,
      zipcode: zipcodeValue,
      city: cityValue
    }

    localStorage.setItem('userInfo', JSON.stringify(updatedUser))
    const updatedUserList = UserList.map((user: any) => {
      if (user.id === parseInt(id || '0')) {
        return {
          ...user,
          name: nameValue,
          country: countryValue,
          countryCode,
          phone: phoneValue,
          address: addressValue,
          email: emailValue,
          zipcode: zipcodeValue,
          city: cityValue
        }
      }
      return user
    })
    localStorage.setItem('userList', JSON.stringify(updatedUserList))

    setSuccess(t('messages.successUpdate'))
  }

  const handleImageupload = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        const updatedUser = { ...UserInfo, imageUrl }
        localStorage.setItem('userInfo', JSON.stringify(updatedUser))
        const updatedUserList = UserList.map((user: any) => {
          if (user.id === parseInt(id || '0')) {
            return { ...user, imageUrl }
          }

          return user
        })
        localStorage.setItem('userList', JSON.stringify(updatedUserList))
        setSuccess(t('messages.successImage'))
      }
      reader.readAsDataURL(file) // để đọc file ảnh
    }
  }

  return (
    <>
      {/* Banner */}
      <div
        className='w-full h-48 flex items-center justify-center bg-cover bg-center relative'
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className='absolute inset-0 bg-black/40' />
        <h1 className='relative z-10 text-[#fff] text-2xl sm:text-3xl lg:text-4xl font-bold'>{t('title')}</h1>
      </div>

      {/* Main Card */}
      <div className=' border-dashed border-green-300 md:border  md:mx-20 p-6 sm:p-10 bg-[#fff] rounded-2xl shadow-xl  md:my-5 relative z-20'>
        <div className='flex max-md:flex-col justify-between items-center mb-6'>
          <h2 className='text-xl sm:text-2xl font-bold  1'>{t('personalInfo')}</h2>

          {error && <div className='bg-red-100 text-red-600 p-2 rounded-lg text-sm  '>{error}
            <i 
              onClick={() => setError('')}
              className='cursor-pointer ml-2 text-red-500 hover:text-red-700 transition'
            >
              <Icon name='close' />
            </i>
          </div>}
          {success && <div className='bg-green-100 text-green-600 p-2 rounded-lg text-sm  '>{success}
             <i 
            onClick={() => setSuccess('')}
              className='cursor-pointer ml-2 text-green-500 hover:text-green-700 transition'
            >
              <Icon name='close' />
            </i>
            </div>}
        </div>

        <div className='flex flex-col md:flex-row gap-8  '>
          {/* Avatar */}
          <div className='   flex flex-col items-center md:w-1/3 gap-4 justify-center '>
            <img
              src={
                UserInfo.imageUrl ||
                userlist?.imageUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(nameValue)}&background=30fd4f&color=fff`
              }
              className='w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-cover rounded-xl border-4 border-green-500 shadow-md'
            />
            <label
              htmlFor='img'
              className='flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg cursor-pointer text-sm font-medium transition'
            >
              <Icon name='download' /> {t('upload')}
            </label>
            <input
              type='file'
              id='img'
              onChange={handleImageupload}
              className='hidden'
              //chỉ cho phép chọn file ảnh
              accept='image/png, image/jpeg, image/jpg, image/webp'
            />
            <p className='font-medium text-center'>{nameValue}</p>
          </div>

          {/* Form */}
          <form className='   grid grid-cols-1 md:grid-cols-2 gap-4 flex-1'>
            <div className='md:col-span-2'>
              <label className='font-medium'>
                {t('form.username.label')} <sup className='text-red-500'>{t('form.username.required')}</sup>
              </label>
              <input
                type='text'
                value={nameValue}
                onChange={handleChange}
                className='mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none'
              />
            </div>

            <div>
              <label className='font-medium'>
                {t('form.country.label')} <sup className='text-red-500'>{t('form.country.required')}</sup>
              </label>
              <select
                value={countryValue}
                onChange={handleCountryChange}
                className='mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none'
              >
                {countryOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='font-medium'>
                {t('form.mobile.label')} <sup className='text-red-500'>{t('form.mobile.required')}</sup>
              </label>
              <div className='flex mt-1'>
                <span className='px-3 py-2 bg-gray-200 border border-gray-300 rounded-l-lg'>{countryCode}</span>
                <input
                  type='text'
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  placeholder={t('form.mobile.placeholder')}
                  className={`flex-1 border border-gray-300 rounded-r-lg p-2 focus:ring-2 focus:ring-green-400 outline-none ${
                    phoneValue.length > 0 && phoneValue.length !== 10 ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {phoneValue.length > 0 && phoneValue.length !== 10 && (
                <span className='text-red-500 text-sm mt-1'>{t('form.mobile.validation')}</span>
              )}
            </div>

            <div>
              <label className='font-medium'>{t('form.address.label')}</label>
              <input
                type='text'
                value={addressValue}
                onChange={handleAddressChange}
                className='mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none'
                placeholder={t('form.address.placeholder')}
              />
            </div>

            <div>
              <label className='font-medium'>{t('form.email.label')}</label>
              <input
                type='text'
                value={emailValue}
                onChange={handleEmailChange}
                className='mt-1 w-full border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed'
                placeholder={UserInfo.email}
                disabled
              />
            </div>

            <div>
              <label className='font-medium'>{t('form.zipCode.label')}</label>
              <input
                type='text'
                value={zipcodeValue}
                onChange={handleZipcodeChange}
                className='mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none'
                placeholder={t('form.zipCode.placeholder')}
              />
            </div>

            <div>
              <label className='font-medium'>{t('form.city.label')}</label>
              <input
                type='text'
                value={cityValue}
                onChange={handleCityChange}
                className='mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none'
                placeholder={t('form.city.placeholder')}
              />
            </div>
          </form>
        </div>

        {/* Buttons */}
        <div className='sm:px-10 px-2 md:mt-4 mt-2 flex   gap-4 max-sm:justify-between'>
          <button
            onClick={handleSaveUserthonin}
            className='rounded-lg relative w-full h-10 cursor-pointer  flex items-center justify-center border   border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500'
          >
            <span className='text-gray-200 text-[13px] md:text-[15px]  font-semibold md:ml-8 transform group-hover:translate-x-20 group-hover:opacity-0 transition-all duration-300'>
              {t('buttons.update')}
            </span>
            <span className='absolute right-0 h-full max-md:hover:opacity-100 max-md:opacity-0  w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300'>
              <i className='text-[#fff]'>
                <Icon name='upload' />
              </i>
            </span>
          </button>

          <button
            onClick={handleGoogleLogout}
            className='rounded-lg relative w-full h-10 cursor-pointer  flex items-center justify-center border   border-red-500 bg-red-500 group hover:bg-red-500 active:bg-red-500 active:border-red-500'
          >
            <span className='text-gray-200 text-[13px] md:text-[15px] font-semibold md:ml-8 transform group-hover:translate-x-20 group-hover:opacity-0 transition-all duration-300'>
              {t('buttons.logout')}
            </span>
            <span className='absolute right-0 h-full   max-md:hover:opacity-100 max-md:opacity-0  w-10 rounded-lg bg-red-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300'>
              <i className='text-[#fff]'>
                {' '}
                <Icon name='logout' />
              </i>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
