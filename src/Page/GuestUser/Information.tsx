import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Background from '../../assets/background.jpg'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useMediaQuery } from '@mui/material'
import Icon from '../../icons/Icon'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function InformationGuestUser() {
  const { t } = useTranslation('InformationGuestUser')
  const { id } = useParams<{ id: string }>()
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const GuestUserInfo = JSON.parse(localStorage.getItem('guestUserInfo') || '{}')

  // LẤY NĂM HIỆN TẠI - 18
  const currentYear = new Date().getFullYear() - 18

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    cccd: '',
    birthday: `${currentYear}-01-01`
  })
  const [message, setMessage] = useState('')
  const [ishandlesumit, setishandlesubmit] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleSubmit = (e: any) => {
    e.preventDefault()

    setishandlesubmit(true)
    setTimeout(() => {
      setishandlesubmit(false)
      if (
        (formData.phone.length < 10 && formData.cccd.length < 12) ||
        (formData.phone.length > 10 && formData.cccd.length > 12)
      ) {
        return setMessage(t('messages.invalid'))
      }
      if (formData.phone.length < 10) {
        return setMessage(t('messages.phoneMin'))
      }
      if (formData.cccd.length < 12) {
        return setMessage(t('messages.cccdMin'))
      }
      if (formData.phone.length > 10) {
        setMessage(t('messages.phoneMax'))
      }
      if (formData.cccd.length > 12) {
        setMessage(t('messages.cccdMax'))
      }

      const raw = localStorage.getItem('guestUserInfo')
      if (!raw) return alert(t('messages.notFound'))

      let guestList: any[] = []

      try {
        const parsed = JSON.parse(raw)
        guestList = Array.isArray(parsed) ? parsed : []
      } catch (err) {
        console.error('Lỗi parse guestUserInfo:', err)
        return alert(t('messages.parseError'))
      }

      const index = guestList.findIndex((guest) => String(guest.id) === String(name))
      if (index === -1) return alert(t('messages.guestNotFound'))

      guestList[index] = {
        ...guestList[index],
        ...formData,
        ticket: guestList[index].ticket,
        id: guestList[index].id
      }
      setIsSubmitted(true)
      localStorage.setItem('guestUserInfo', JSON.stringify(guestList))
      navigate(`/user/payment/${id}`)
    }, 3000)
  }

  // Kiểm tra xem người dùng đã submit form hay chưa
  useEffect(() => {
    const handleUnload = () => {
      if (!isSubmitted) {
        const updatedGuestList = GuestUserInfo.map((u: any) => {
          const filteredTickets = u.ticket?.filter((t: any) => t.id !== parseInt(id || '0'))
          return { ...u, ticket: filteredTickets }
        })
        localStorage.setItem('guestUserInfo', JSON.stringify(updatedGuestList))
      }
    }

    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [isSubmitted, name])
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
        <h1 className='text-sm md:text-2xl font-bold mb-3 md:mb-6 text-center'>{t('title')}</h1>
        {message && (
          <div className='text-red-500 text-sm mb-4 md:mb-6 border border-red-500 p-3 rounded-lg bg-red-100 flex justify-between'>
            <div>
              <strong className='text-[13px] '>{t('messages.note')}</strong>
              <span className='text-[12px] text-nowrap'>{message}</span>
            </div>
            <i className=' cursor-pointer text-red-500 hover:text-red-700' onClick={() => setMessage('')}>
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
            label={t('form.fullName.label')}
            value={formData.fullName}
            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
            required
            className='w-full border rounded px-3 py-2'
            placeholder={t('form.fullName.placeholder')}
          />
        </div>
        <div className='   mb-1 md:mb-4'>
          <TextField
            type='tel'
            size={isMobile ? 'small' : 'medium'}
            margin={isMobile ? 'dense' : 'none'}
            name='phone'
            label={t('form.phone.label')}
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            required
            className='w-full border rounded px-3 py-2'
            placeholder={t('form.phone.placeholder')}
          />
        </div>
        <div className=' mb-1 md:mb-4'>
          <TextField
            size={isMobile ? 'small' : 'medium'}
            margin={isMobile ? 'dense' : 'none'}
            type='email'
            name='email'
            label={t('form.email.label')}
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
            className='w-full border rounded px-3 py-2'
            placeholder={t('form.email.placeholder')}
          />
        </div>
        <div className=' mb-1 md:mb-4'>
          <TextField
            size={isMobile ? 'small' : 'medium'}
            margin={isMobile ? 'dense' : 'none'}
            type='text'
            name='cccd'
            label={t('form.cccd.label')}
            value={formData.cccd}
            onChange={(e) => setFormData((prev) => ({ ...prev, cccd: e.target.value }))}
            required
            className='w-full border rounded px-3 py-2'
            placeholder={t('form.cccd.placeholder')}
          />
        </div>
        <div className=' mb-1 md:mb-4'>
          <TextField
            size={isMobile ? 'small' : 'medium'}
            margin={isMobile ? 'dense' : 'none'}
            type='date'
            name='birthday'
            label={t('form.birthday.label')}
            variant='outlined'
            value={formData.birthday}
            onChange={(e) => setFormData((prev) => ({ ...prev, birthday: e.target.value }))}
            required
            className='w-full'
            inputProps={{ max: minAgedate }}
          />
        </div>
        <button
          type='submit'
          disabled={ishandlesumit}
          className={`w-full font-bold rounded-lg transition-all duration-300 
    ${
      ishandlesumit
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 cursor-pointer hover:to-green-700'
    } 
    ${isMobile ? 'py-2 text-base' : 'py-3 text-lg'} 
    text-[#fff] flex items-center justify-center gap-2`}
        >
          {ishandlesumit ? (
            <>
              <Icon name='loading' /> {t('form.submitting')}
            </>
          ) : (
            t('form.submit')
          )}
        </button>
      </Box>
    </div>
  )
}
