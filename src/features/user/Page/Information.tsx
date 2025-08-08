import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Background from '../../../assets/background.jpg'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useMediaQuery } from '@mui/material'

import Icon from '../../../icons/Icon'
export default function InformationUser() {
  const { id } = useParams<{ id: string }>()
  const { name } = useParams<{ name: string }>()
  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const user = UserList.find((user: any) => user.id === parseInt(name || '0'))
  const navigate = useNavigate()
  // LẤY NĂM HIỆN TẠI
  const currentYear = new Date().getFullYear() - 18

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    cccd: user?.cccd || '',
    birthday: user?.birthday || `${currentYear}-01-01`
  })
  const [message, setMessage] = useState('')
  const [ishandlesumit, setishandlesubmit] = useState(false)
  // Hàm xử lý submit form lưu thông tin người dùng mới up vào push thêm userList
  const handleSubmit = (e: any) => {
    e.preventDefault()
    setishandlesubmit(true)
    setTimeout(() => {
      setishandlesubmit(false)
      if (
        (formData.phone.length < 10 && formData.cccd.length < 12) ||
        (formData.phone.length > 10 && formData.cccd.length > 12)
      ) {
        return setMessage('Số điện thoại và CCCD/CMND không hợp lệ')
      }
      // phone trên 10 ký tự
      if (formData.phone.length < 10) {
        return setMessage('Số điện thoại phải có ít nhất 10 ký tự')
      }
      if (formData.cccd.length < 12) {
        return setMessage('CCCD/CMND phải có ít nhất 12 ký tự')
      }
      if (formData.phone.length > 10) {
        setMessage('Số điện thoại không được quá 10 ký tự')
      }
      if (formData.cccd.length > 12) {
        setMessage('CCCD/CMND không được quá 12 ký tự')
      }
      const raw = localStorage.getItem('userList')
      if (!raw) return alert('Không tìm thấy dữ liệu')

      console.log('userList', UserList)

      // Tìm index người dùng có id khớp
      const index = UserList.findIndex((user: any) => user.id === parseInt(name || '0'))
      if (index === -1) return alert('Không tìm thấy người dùng')
      // Cập nhật thông tin người dùng
      UserList[index] = {
        ...UserList[index], // giữ nguyên thông tin cũ
        ...formData, // cập nhật thông tin mới
        ticket: UserList[index].ticket, // giữ nguyên vé
        id: UserList[index].id // giữ nguyên id
      }

      // Lưu lại vào localStorage dạng mảng []
      localStorage.setItem('userList', JSON.stringify(UserList))
      // Điều hướng đến trang thanh toán
      navigate(`/user/payment/${id}`)
    }, 3000)
  }

  // repository
  const isMobile = useMediaQuery('(max-width: 768px)')
  // chặn ngày tương lai
  const today = new Date()
  const minAgedate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0]
  return (
    <div className='w-full min-h-screen flex items-center justify-center relative   bg-gray-400 bg-center '>
      <div
        className='absolute inset-0 bg-center bg-cover bg-no-repeat  '
        style={{ backgroundImage: `url(${Background})` }}
      ></div>

      <div className='absolute inset-0 backdrop-blur-md bg-black/20'></div>

      <Box
        component='form'
        autoComplete='off'
        onSubmit={handleSubmit}
        className='bg-[#fff] my-[10%] mx-[5%] p-6 rounded-lg shadow-lg w-full max-w-lg z-10 relative '
      >
        <h1 className='text-sm md:text-2xl font-bold mb-3 md:mb-6 text-center'>Xác nhận thông tin </h1>
        {message && (
          <div className='text-red-500 text-sm mb-4 md:mb-6 border border-red-500 p-3 rounded-lg bg-red-100 flex justify-between'>
            <div>
              <strong className='text-[13px] '>Chú ý: </strong>
              <span className='text-[12px] text-nowrap'>{message}</span>
            </div>
            <i className=' cursor-pointer text-red-500 hover:text-red-700' onClick={() => setMessage('')}>
              {' '}
              <Icon name='close' />
            </i>
          </div>
        )}
        <div className=' mb-1 md:mb-4'>
          <TextField
            margin={isMobile ? 'dense' : 'none'}
            size={isMobile ? 'small' : 'medium'}
            type='text'
            name='fullName'
            label='Họ và tên'
            value={formData.fullName}
            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
            required
            className='w-full border rounded px-3 py-2'
            placeholder='Nguyễn Văn A'
          />
        </div>

        <div className=' mb-1 md:mb-4'>
          <TextField
            type='text'
            size={isMobile ? 'small' : 'medium'}
            margin={isMobile ? 'dense' : 'none'}
            name='phone'
            label='Số điện thoại'
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            required
            className='w-full border rounded px-3 py-2'
            placeholder='0901234567'
          />
        </div>
        <div className=' mb-1 md:mb-4'>
          <TextField
            size={isMobile ? 'small' : 'medium'}
            margin={isMobile ? 'dense' : 'none'}
            type='email'
            name='email'
            label='Email'
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
            className='w-full border rounded px-3 py-2'
            placeholder='example@gmail.com'
          />
        </div>

        <div className=' mb-1 md:mb-4'>
          <TextField
            size={isMobile ? 'small' : 'medium'}
            margin={isMobile ? 'dense' : 'none'}
            type='text'
            name='cccd'
            label='CCCD/CMND'
            value={formData.cccd}
            onChange={(e) => setFormData((prev) => ({ ...prev, cccd: e.target.value }))}
            required
            className='w-full border rounded px-3 py-2'
            placeholder='012345678901'
          />
        </div>

        <div className=' mb-1 md:mb-4'>
          <TextField
            size={isMobile ? 'small' : 'medium'}
            margin={isMobile ? 'dense' : 'none'}
            type='date'
            name='birthday'
            label='Ngày sinh'
            variant='outlined'
            value={formData.birthday}
            onChange={(e) => setFormData((prev) => ({ ...prev, birthday: e.target.value }))}
            required
            className='w-full'
            inputProps={{ max: minAgedate }} // Chặn ngày sinh không được quá 18 tuổi
          />
        </div>

        <button
          type='submit'
          disabled={ishandlesumit}
          className={`w-full font-bold rounded-lg transition-all duration-300 
    ${
      ishandlesumit
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-gradient-to-r from-green-500 to-green-600  cursor-pointer hover:from-green-600 hover:to-green-700'
    } 
    ${isMobile ? 'py-2 text-base' : 'py-3 text-lg'} 
    text-[#fff] flex items-center justify-center gap-2`}
        >
          {ishandlesumit ? (
            <>
              <Icon name='loading' /> Đang xử lý...
            </>
          ) : (
            'Xác nhận thông tin'
          )}
        </button>
      </Box>
    </div>
  )
}
