import background from '../../../assets/background.jpg'

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { googleLogout } from '@react-oauth/google'
import Icon from '../../../icons/Icon'
export default function ProfileSetting() {
  const handleGoogleLogout = () => {
    googleLogout()
    localStorage.removeItem('userInfo') // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('userthongtin') // Xóa thông tin người dùng khỏi localStorage
    window.location.href = '/'
  }
  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const { id } = useParams<{ id: string }>()
  const userlist = UserList.find((user: any) => user.id === parseInt(id || '0'))
  const UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

  // profile setting
  const [nameValue, setnameValue] = useState(userlist?.name || `${UserInfo.firstname} ${UserInfo.lastname}`) // Lấy tên người dùng từ localStorage hoặc mặc định
  const [countryValue, setCountryValue] = useState(userlist?.country || UserInfo.country || 'vietnam')
  const [countryCode, setCountryCode] = useState(userlist?.countryCode || UserInfo.countryCode || '84 +')
  const [phoneValue, setPhoneValue] = useState(userlist?.phone || UserInfo.phone || '')
  const [addressValue, setaddressValue] = useState(userlist?.address || UserInfo.address || '')
  const [emailValue, setemailValue] = useState(userlist?.state || UserInfo.email || `${UserInfo.email}`) //
  const [zipcodeValue, setzipcodeValue] = useState(userlist?.zipcode || UserInfo.zipcode || '')
  const [cityValue, setcityValue] = useState(userlist?.city || UserInfo.city || '')

  const countryOptions = [
    { id: '1', maqg: '84 +', value: 'vietnam', label: 'Vietnam' },
    { id: '2', maqg: '29 +', value: 'usa', label: 'USA' },
    { id: '3', maqg: '81 +', value: 'japan', label: 'Japan' },
    { id: '4', maqg: '82 +', value: 'korea', label: 'Korea' }
  ]
  // Hàm xử lý thay đổi quốc gia
  const handleCountryChange = (e: any) => {
    const selectedCountryValue = e.target.value // Lấy giá trị quốc gia đã chọn
    setCountryValue(selectedCountryValue) // Cập nhật giá trị state cho quốc gia
    const selectedOption = countryOptions.find((option) => option.value === selectedCountryValue)
    if (selectedOption) {
      setCountryCode(selectedOption.maqg) // Cập nhật mã quốc gia tương ứng
    } else {
      setCountryCode('')
    }
  }
  // Hàm xử lý thay đổi tên người dùng
  const handleChange = (e: any) => {
    setnameValue(e.target.value) // Cập nhật giá trị state khi người dùng nhập
  }
  // Hàm xử lý thong tin
  const handlePhoneChange = (e: any) => {
    // Loại bỏ các ký tự không phải số
    setPhoneValue(e.target.value.replace(/\D/g, '')) // Cập nhật giá trị state khi người dùng nhập
  }
  const handleAddressChange = (e: any) => {
    setaddressValue(e.target.value)
  }
  const handleEmailChange = (e: any) => {
    setemailValue(e.target.value)
  }
  const handleZipcodeChange = (e: any) => {
    setzipcodeValue(e.target.value)
  }
  const handleCityChange = (e: any) => {
    setcityValue(e.target.value)
  }

  // hàm xử lý nhập thông tin đầy đủ chưa
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
      window.alert('Vui lòng nhập đầy đủ thông tin!')
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

    localStorage.setItem('userInfo', JSON.stringify(updatedUser)) // Lưu thông tin người dùng đã cập nhật vào localStorage
    // Cập nhật thông tin người dùng trong userList
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

    window.alert('Thông tin đã được cập nhật!')
    window.location.reload()
  }
  // hàm upload ảnh
  const handleImageupload = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader() // Tạo một đối tượng FileReader để đọc file
      reader.onload = (
        event // Khi đọc file thành công
      ) => {
        const imageUrl = event.target?.result as string // Lấy URL của ảnh đã đọc
        // Cập nhật UserInfo (không cần map vì UserInfo là object, không phải array)
        const updatedUser = {
          ...UserInfo,
          imageUrl: imageUrl // Sửa từ imageUrls thành imageUrl
        }
        localStorage.setItem('userInfo', JSON.stringify(updatedUser)) // Lưu thông tin người dùng đã cập nhật vào localStorage

        // Cập nhật thông tin người dùng trong userList
        const updatedUserList = UserList.map((user: any) => {
          if (user.id === parseInt(id || '0')) {
            return {
              ...user,
              imageUrl: imageUrl
            }
          }
          return user
        })
        localStorage.setItem('userList', JSON.stringify(updatedUserList))
        window.alert('Ảnh đã được cập nhật!')
        window.location.reload()
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <div
        className=' w-full h-50 flex items-center justify-center  '
        style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000049]  '>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#fff]  '>Profile Setting</h1>
        </div>
      </div>
      <div className='flex flex-col  max-sm:items-center mx-10 rounded-2xl    bg-[#fff]  '>
        <h1 className='font-black pt-5 text-1xl sm:text-2xl'>Thông tin cá nhân</h1>
        <div className='h-full py-5 '>
          <div className='p-4   rounded-2xl bg-[#fff] shadow-[0_5px_25px_rgba(0,0,0,0.25)]'>
            <div className=' flex max-sm:flex-col max-sm:items-center md:gap-5  '>
              <div className=' justify-center items-center flex flex-col w-1/3  gap-2 p-4 rounded-md'>
                <img
                  src={
                    UserInfo.imageUrl ||
                    UserList?.imageUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(nameValue)}&background=30fd4f&color=fff`
                  }
                  className=' border-2 border-green-500 w-10 h-10 sm:w-20 sm:h-20 lg:w-30 lg:h-30 xl:w-40 xl:h-40 object-cover rounded-2xl '
                />
                <button className='flex border items-center justify-center gap-2 bg-gray-200  rounded-sm px-1  '>
                  <input type='file' id='img' accept='image/*' onChange={handleImageupload} className='hidden' />
                 
                  <label htmlFor={`img`} className=' flex items-center cursor-pointer text-[10px] md:text-[15px]'>
                    upload  <i className='pl-1'><Icon name='download' /></i>
                  </label>
                </button>
            
                 
                <p className='text-nowrap font-medium'>
                  {userlist?.name || `${UserInfo.firstname} ${UserInfo.lastname}`}
                </p>
              </div>

              <form className=' grid grid-cols-1 sm:grid-cols-2 w-full gap-1 md:gap-4 sm:my-4'>
                <div className='flex flex-col col-span-1 sm:col-span-2 md:gap-2 text-[15px] sm:text-[18px]'>
                  <label htmlFor=''>
                    Username <sup className='text-red-600'>*</sup>
                  </label>
                  <input
                    type='text'
                    value={nameValue}
                    onChange={handleChange}
                    className='text-[14px] sm:text-[18px] p-2 border-1 border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500  '
                  />
                </div>

                <div className='flex flex-col text-[15px] sm:text-[18px]  md:gap-2'>
                  <label htmlFor=''>
                    Country <sup className='text-red-600'>*</sup>
                  </label>
                  <select
                    value={countryValue}
                    onChange={handleCountryChange}
                    className=' text-[14px] sm:text-[18px] p-2 border-1 border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500  '
                  >
                    {countryOptions.map((option) => (
                      <option key={option.id} value={option.value} id={option.id} className='  text-[10px] md:text-[18px]  hover'>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col md:gap-2 text-[15px] sm:text-[18px]'>
                  <label htmlFor=''>
                    Mobile<sup className='text-red-600'>*</sup>
                  </label>
                  <div className='flex flex-col '>
                    <div className='flex items-center border-1 border-gray-300 rounded-md shadow-sm '>
                      <span className='text-[14px] sm:text-[18px] p-2 border-1 w-20 bg-[#e2e2e2] border-gray-300 rounded-l-md   text-nowrap'>
                        {countryCode}
                      </span>
                      <input
                        type='text'
                        value={phoneValue}
                        onChange={handlePhoneChange}
                        maxLength={10} // giới hạn độ dài
                        className={`p-2 border-1 text-[14px] sm:text-[18px] border-gray-300 rounded-r-md shadow-sm w-full 
                               focus:outline-none focus:ring-green-500 focus:shadow-green-300 focus:border-green-500
                                   ${phoneValue.length > 0 && phoneValue.length !== 10 ? 'border-red-500' : ''}
                                      `}
                        placeholder='Nhập số điện thoại...'
                    
                      />
                    </div>

                    {phoneValue.length > 0 && phoneValue.length !== 10 && (
                      <span className='text-red-500   mt-1 text-[14px] sm:text-[18px]'>
                        Số điện thoại phải có đúng 10 chữ số.
                      </span>
                    )}
                  </div>
                </div>
                <div className='flex flex-col text-[15px] sm:text-[18px] md:gap-2'>
                  <label htmlFor=''>Address</label>
                  <input
                    type='text'
                    value={addressValue}
                    onChange={handleAddressChange}
                    className='p-2 border-1 text-[14px] sm:text-[18px] border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500  '
                    placeholder='Nhập  địa chỉ'
                  
                    
                  />
                </div>
                <div className='flex flex-col text-[15px] sm:text-[18px] md:gap-2'>
                  <label htmlFor=''>Email</label>
                  <input
                    type='text'
                    value={emailValue}
                    onChange={handleEmailChange}
                    className='p-2 border-1 text-[14px] sm:text-[18px] cursor-no-drop bg-gray-200  border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500  '
                    placeholder={` ${UserInfo.email}`}
                     disabled
                  />
                </div>
                <div className='flex flex-col text-[15px] sm:text-[18px] md:gap-2'>
                  <label htmlFor=''>Zip Code</label>
                  <input
                    type='text'
                    value={zipcodeValue}
                    onChange={handleZipcodeChange}
                    className='p-2 border-1 border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500  '
                    placeholder='Nhập mã thành phố'
                  />
                </div>

                <div className='flex flex-col text-[15px] sm:text-[18px] md:gap-2'>
                  <label htmlFor=''>City</label>
                  <input
                    type='text'
                    value={cityValue} // Liên kết giá trị với state
                    onChange={handleCityChange} // Lắng nghe sự kiện thay đổi
                    placeholder='Nhập thành phố'
                    className='p-2 border-1 border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-green-500 focus:shadow-green-300 focus:border-green-500  '
                  />
                </div>
              </form>
            </div>
            <div className='sm:px-10 px-2 md:mt-2 mt-4 flex  gap-4 max-sm:justify-between'>
              <button
                onClick={handleSaveUserthonin}
                className='rounded-lg relative w-full h-10 cursor-pointer  flex items-center justify-center border   border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500'
              >
                <span className='text-gray-200 text-[12px] md:text-[15px]  font-semibold md:ml-8 transform group-hover:translate-x-20 group-hover:opacity-0 transition-all duration-300'>
                  {' '}
                  Cập nhật
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
                <span className='text-gray-200 text-[12px] md:text-[15px] font-semibold md:ml-8 transform group-hover:translate-x-20 group-hover:opacity-0 transition-all duration-300'>
                  Đăng xuất
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
        </div>
      </div>
    </>
  )
}
