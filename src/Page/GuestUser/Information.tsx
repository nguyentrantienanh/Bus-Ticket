import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Background from '../../assets/background.jpg'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useMediaQuery } from '@mui/material'
import Icon from '../../icons/Icon'

export default function InformationGuestUser() {
  const { id } = useParams<{ id: string }>()
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  // LẤY NĂM HIỆN TẠI
  const currentYear = new Date().getFullYear()

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    cccd: '',
    birthday: `${currentYear}-01-01`
  })
const [ishandlesumit, setishandlesubmit] = useState(false)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    setishandlesubmit(true)
    setTimeout(() => {
    // phone trên 10 ký tự
    if (formData.phone.length < 10) {
      return alert('Số điện thoại phải có ít nhất 10 ký tự')
    }
    if (formData.cccd.length < 12) {
      return alert('CCCD/CMND phải có ít nhất 12 ký tự')
    }

    e.preventDefault()
    const raw = localStorage.getItem('guestUserInfo')
    if (!raw) return alert('Không tìm thấy dữ liệu')

    let guestList: any[] = []

    try {
      const parsed = JSON.parse(raw)
      guestList = Array.isArray(parsed) ? parsed : []
    } catch (err) {
      console.error('Lỗi parse guestUserInfo:', err)
      return alert('Dữ liệu không hợp lệ')
    }

    // Tìm index khách có id khớp
    const index = guestList.findIndex((guest) => String(guest.id) === String(name))
    if (index === -1) return alert('Không tìm thấy khách')

    // Cập nhật thông tin khách
    guestList[index] = {
      ...guestList[index],
      ...formData,
      ticket: guestList[index].ticket, // giữ nguyên vé
      id: guestList[index].id // giữ nguyên id
    }

    // Lưu lại vào localStorage dạng mảng []
    localStorage.setItem('guestUserInfo', JSON.stringify(guestList))

    // Điều hướng đến trang thanh toán
    navigate(`/user/payment/${id}`)
    setishandlesubmit(false)
    }, 3000)
  }

  // repository
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className='w-full min-h-screen flex items-center justify-center relative   bg-gray-400 bg-center '>
      <div
        className='absolute inset-0 bg-center bg-cover bg-no-repeat  '
        style={{ backgroundImage: `url(${Background})` }}
      ></div>

      <div className='absolute inset-0 backdrop-blur-md bg-black/20'></div>

      <Box
        component='form'
        sx={{ '& > :not(style)': { width: '100%' } }}
        autoComplete='off'
        onSubmit={handleSubmit}
        className='bg-[#fff] my-[10%] mx-[10%] p-6 rounded-lg shadow-lg w-full max-w-md z-10 relative'
      >
        <h1 className='text-sm md:text-2xl font-bold mb-3 md:mb-6 text-center'>Thông Tin Khách Vãng Lai</h1>
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

        <div className='   mb-1 md:mb-4'>
          <TextField
            type='tel'
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
          />
        </div>

        <button
          type='submit'
          className={`bg-green-500 text-[#fff] px-6 py-2 rounded-lg  w-full text-sm md:text-2xl 
            ${ishandlesumit ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'hover:bg-green-600 bg-green-500'}
            `}
            disabled={ishandlesumit}
        >
          {ishandlesumit ?  <><Icon name='loading'/> Đang xử lý...</> : 'Xác nhận thông tin'}
        </button>
      </Box>
    </div>
  )
}
