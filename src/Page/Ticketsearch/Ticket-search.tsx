import { useEffect, useState } from 'react'
import { Box, TextField } from '@mui/material'
import Background from '../../assets/background.jpg'
import Icon from '../../icons/Icon'
import { useTranslation } from 'react-i18next'
import { getUserList } from '../../api/userApi'
import { getGuestUserList} from '../../api/guestUserApi'
export default function Ticketsearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [ticketseach, setTicketsearch] = useState<any>(null)
  const { t } = useTranslation('TicketSearch')
  const [ticketDetail, setTicketDetail] = useState(false)
  const handleticketDetail = () => {
    setTicketDetail(!ticketDetail)
  }
  // callAPI
  // const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  //  const GuestUser = JSON.parse(localStorage.getItem('guestUserInfo') || '[]')
  const  [GuestUserList, setGuestUserList] = useState<any[]>([])
  const [Userlist, setUserlist] = useState<any[]>([])
  useEffect(() => {
    const callApiGuestUser = async () => {
      try{
        const res = await getGuestUserList()
        setGuestUserList(res.data)
      } catch (error){
        console.error('Error fetching user list:', error)
      }
    }
    callApiGuestUser()
  }, [])
  useEffect(() => {
    const callApiUersList = async () => {
      try{
        const res = await getUserList()
        setUserlist(res.data)
      } catch (error){
        console.error('Error fetching user list:', error)
      }
    }
    callApiUersList()
  }, [])

  const veData = Userlist.map((user: any) => user.ticket).flat()
  const userinfo = JSON.parse(localStorage.getItem('userinfo') || '{}')
 
  const GuestUserTicket = GuestUserList.map((user: any) => user.ticket).flat()

  // hàm để gộp dữ liệu vé đã đặt của người dùng đã đăng nhập và khách
  const ve = [...veData, ...GuestUserTicket]
  const [isSearch, setisSearch] = useState(false)
  // hàm xử lý tìm kiếm vé khi nhấn sẽ tìm ra vé và ruter trên là ticketseach
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])
  const handleSearch = (e: any) => {
    if (e) e.preventDefault()

    if (!searchTerm) {
      setError(t('alerts.enterCode'))
      return
    }
    setisSearch(true)
    setTimeout(() => {
      const ticketseachs = ve.filter((item: any) => item.id === Number(searchTerm))
      if (ticketseachs.length === 0) {
        setTicketsearch(null)
        setError(t('alerts.notFound'))
      } else {
        const ticket = ticketseachs[0] // Lấy vé đầu tiên
        setTicketsearch(ticket)
        setMessage(t('alerts.found'))
      }

      setisSearch(false)
    }, 2000)
  }
  // ticketseach lấy id

  const diemdi = t(`Home:${ticketseach?.diemDi}`, { defaultValue: ticketseach?.diemDi })
  const diemden = t(`Home:${ticketseach?.diemDen}`, { defaultValue: ticketseach?.diemDen })
  const name = `${ticketseach?.type} -  ${diemdi} - ${diemden}`
  const USERID = (userinfo.name ? Userlist : GuestUserList).find((user: any) =>
    user.ticket?.some((t: any) => t.id === Number(searchTerm))
  )

  const seatsticket = ticketseach?.seats.map((s: any) => s.name)

  return (
    <>
      <div
        className='  w-full h-50 flex items-center justify-center  '
        style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000068]  '>
          <h1 className=' font-bold mb-4 text-[#fff] text-[20px] sm:text-2xl lg:text-4xl   '>{t('title')}</h1>
        </div>
      </div>
      <div className='h-[100%]'>
        <Box
          component='form'
          sx={{ '& > :not(style)': { width: '100%' } }}
          autoComplete='off'
          className='bg-[#fff]  '
          onSubmit={handleSearch}
        >
          <div className='  bg-[#fff]   w-full items-center justify-center px-5 md:px-10 xl:px-30 mt-10 border-b-2 border-dashed border-gray-400'>
            <div className=' mb-4'>
              <TextField
                label={t('form.label')}
                variant='outlined'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                className='w-full'
                placeholder={t('form.placeholder')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#16a34a' // green-600 khi hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#16a34a' // green-600 khi focus
                    }
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#16a34a' // Label màu xanh khi focus
                    }
                  }
                }}
              />
            </div>

            <div className='py-4   justify-center items-center flex  '>
              <button
                disabled={isSearch}
                className={`  text-[#fff] border  border-b-4 w-80 font-medium overflow-hidden relative px-4 py-2 rounded-md    ${isSearch ? 'bg-gray-500 hover border-gray-500 cursor-not-allowed' : 'cursor-pointer bg-green-700 hover:bg-green-700 border-green-400   hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group'}`}
              >
                <span
                  className={` absolute -top-[150%] left-0 inline-flex w-full h-[5px] rounded-md opacity-50  font-medium   shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]     ${isSearch ? 'bg-gray-500 shadow-gray-500' : 'bg-green-400 shadow-green-400 group-hover:top-[150%] duration-500 '}`}
                />
                {isSearch ? (
                  <div>
                    <i className='px-2'>
                      <Icon name='loading' />
                    </i>
                    {t('form.searching')}
                  </div>
                ) : (
                  t('form.search')
                )}
              </button>
            </div>
          </div>
        </Box>
        <div className='text-center text-gray-500 text-sm mt-2'>
          <strong>{t('note.title')}</strong>
          <span>{t('note.content')}</span>
        </div>
        <div className='text-center text-gray-500 text-sm mt-2'>
          {message && (
            <span
              className=' text-green-600 font-semibold transition-all duration-300 ease-in-out
            '
            >
              {message}
            </span>
          )}
        </div>

        <div className=' bg-[#fff] mx-10 my-10 flex   justify-center items-center'>
          {ticketseach ? (
            <div className='flex flex-col'>
              <div
                className={` transition-all duration-500  ${ticketDetail ? 'rounded-t-2xl' : 'rounded-2xl'}    bg-[#fff] shadow-md border-1  border-dashed overflow-hidden transition hover:shadow-xl`}
              >
                {/* Phần thông tin vé */}
                <div className='flex flex-col md:flex-row items-start md:items-center p-5 gap-5 bg-gray-50'>
                  {/* Trái: Tuyến */}
                  <div className='flex-1'>
                    <h1 className='text-lg font-semibold text-gray-800 line-clamp-1'>{name}</h1>
                    <p className='text-xs text-gray-500'>
                      {t('details.seatLayout')}: {ticketseach?.seatLayout}
                    </p>
                    <p className='text-sm text-amber-500 flex items-center gap-1 mt-1'>
                      <Icon name='bus' /> {ticketseach?.type}
                    </p>
                  </div>

                  {/* Giữa: Thời gian */}
                  <div className='flex justify-between w-full md:w-auto md:gap-10 text-sm text-gray-700'>
                    <div className='text-center'>
                      <p className='font-medium'>{ticketseach?.starttime}</p>
                      <p className='text-xs text-gray-500'>
                        {t(`Home:${ticketseach.diemDi}`, { defaultValue: ticketseach.diemDi })}
                      </p>
                    </div>

                    <div className='text-center'>
                      <Icon name='arrow-right' />
                      <p className='text-xs text-gray-500'>{ticketseach?.date}</p>
                      <p className='text-xs text-gray-500'>{ticketseach?.timetogo}</p>
                    </div>

                    <div className='text-center'>
                      <p className='font-medium'>{ticketseach?.endtime}</p>
                      <p className='text-xs text-gray-500'>
                        {t(`Home:${ticketseach.diemDen}`, { defaultValue: ticketseach.diemDen })}
                      </p>
                    </div>
                  </div>

                  {/* Phải: Ngày nghỉ + nút */}
                  <div className='flex flex-col items-end gap-2 md:pl-4 w-full md:w-auto'>
                    <p className='text-xs'>
                      {t('Home:offday', { defaultValue: 'Ngày nghỉ' })}:
                      <span className='ml-1 bg-blue-100 text-blue-800 border border-blue-300 px-2 py-0.5 rounded-full'>
                        {ticketseach?.offday}
                      </span>
                    </p>

                    <button
                      onClick={handleticketDetail}
                      className=' cursor-pointer relative flex items-center text-sm px-4 py-2 overflow-hidden font-medium transition-all bg-green-500 rounded-md group'
                    >
                      <span className='absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-mr-4 group-hover:-mt-4'>
                        <span className='absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#fff]' />
                      </span>
                      <span className='absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-ml-4 group-hover:-mb-4'>
                        <span className='absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#fff]' />
                      </span>
                      <span className='absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-green-600 rounded-md group-hover:translate-x-0' />
                      <span className='relative w-full text-left  text-[#fff] transition-colors duration-200 ease-in-out font-medium group-hover:text-[#fff]'>
                        {ticketDetail ? t('details.collapse') : t('details.expand')}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Tiện nghi */}
                <div className='border-t border-dashed border-gray-500 bg-[#fff] px-5 py-3 text-sm flex flex-wrap gap-2'>
                  <p className='text-gray-600'>{t('details.facilities')}</p>
                  {ticketseach?.facilities?.map((facility: any, index: number) => (
                    <span key={index} className='bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-xs'>
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className={`transition-all duration-600 ease-in-out overflow-hidden ${
                  ticketDetail ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                } bg-[#fff] border-b-1 border-r-1 border-l-1 border-dashed rounded-b-2xl p-4 shadow space-y-2`}
              >
                <div className='flex max-md:flex-col justify-between items-center'>
                  <span className='  text-[11px] md:text-sm text-gray-500'>
                    {t('details.ticketNumber')}: {ticketseach.id}
                  </span>
                  <div>
                    <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-[11px] text-xs text-nowrap font-semibold  '>
                      <strong>{t('details.departureDate')}: </strong>
                      <span className='pl-1'>{ticketseach.dateStart}</span>
                    </span>
                  </div>
                </div>

                <div className='text-xl font-bold'>{name}</div>
                <p className='text-[11px] text-gray-500'>
                  {t('details.seatLayout')}: {ticketseach.seatLayout}
                </p>

                <div className='flex justify-between items-center text-center border-t border-b py-2 border-dashed'>
                  <div>
                    <div className='text-[14px] font-medium '>{t('details.departureTime')}</div>
                    <div className='text-xl font-bold'>{ticketseach.starttime}</div>
                    <div className='text-sm font-medium'>
                      {t(`Home:${ticketseach.diemDi}`, { defaultValue: ticketseach.diemDi })}
                    </div>
                  </div>
                  <div>
                    <i className='text-green-600 border-b pl-4 pr-1'>
                      ...
                      <Icon name='bus-go' />
                    </i>
                    <div className='text-xs text-gray-500'>
                      {ticketseach.timetogo.slice(0, 2)} {t('details.hour')} {ticketseach.timetogo.slice(3, 5)}
                      {t('details.minute')}
                      <br />{' '}
                    </div>
                  </div>

                  <div>
                    <div className='text-[14px] font-medium '>{t('details.arrivalTime')}</div>
                    <div className='text-xl font-bold'> {ticketseach.endtime}</div>
                    <div className='text-sm font-medium'>
                      {t(`Home:${ticketseach.diemDen}`, { defaultValue: ticketseach.diemDen })}
                    </div>
                  </div>
                </div>

                <div className='bg-gray-100 p-3 rounded-lg text-sm'>
                  <div className='font-semibold  '>{USERID?.fullName || USERID?.name}</div>

                  <div className='text-xs text-gray-600'>{t('details.idCard')}</div>
                  <div className='text-xs text-gray-600'>{t('details.note')}</div>
                  <div className='mt-2 border-t pt-2 flex justify-between'>
                    <div className='text-green-500'>
                      {t('details.seats')}: {seatsticket.join(', ')}{' '}
                    </div>
                    <div className='font-bold text-green-600'>{ticketseach.price.toLocaleString()}đ</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center text-gray-500 py-0'>
              {error ? (
                <div className='flex flex-col items-center justify-center'>
                  <i className='text-red-500 text-2xl mb-1'>
                    <Icon name='ticket' />
                  </i>
                  <span className=' text-red-600 font-semibold transition-all duration-300 ease-in-out'>{error}</span>
                </div>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
