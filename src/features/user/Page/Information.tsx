import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Background from '../../../assets/background.jpg'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useMediaQuery } from '@mui/material'
// import Icon from  '../../../icons/Icon'
export default function InformationUser() {
  const { id } = useParams<{ id: string }>()
  const { name } = useParams<{ name: string }>()
  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const user = UserList.find((user: any) => user.id === parseInt(name || '0'))
  const navigate = useNavigate()
  // LẤY NĂM HIỆN TẠI
  const currentYear = new Date().getFullYear()

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    cccd: user?.cccd || '',
    birthday: user?.birthday || `${currentYear}-01-01`
  })
  // Hàm xử lý thay đổi thông tin và update nếu thông tin chưa có
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Hàm xử lý submit form lưu thông tin người dùng mới up vào push thêm userList
  const handleSubmit = (e: any) => {
    e.preventDefault()
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
            onChange={handleChange}
            required
            className='w-full border rounded px-3 py-2'
            placeholder='Nguyễn Văn A'
          />
        </div>

        <div className=' mb-1 md:mb-4'>
          <TextField
            type='tel'
            size={isMobile ? 'small' : 'medium'}
            margin={isMobile ? 'dense' : 'none'}
            name='phone'
            label='Số điện thoại'
            value={formData.phone}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            required
            className='w-full'
          />
        </div>

        <button
          type='submit'
          className='bg-green-500 text-[#fff] px-6 py-2 rounded-lg hover:bg-green-600 w-full text-sm md:text-xl '
        >
          Tiếp tục thanh toán
        </button>
        
        
      </Box>
    </div>
  )
}
