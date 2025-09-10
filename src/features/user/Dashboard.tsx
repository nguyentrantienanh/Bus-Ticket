import Icon from '../../icons/Icon'
import background from '../../assets/background.jpg'
import { useState, useEffect, useMemo } from 'react'
import { Booking } from './Page/Bookinghistory'
import { useTranslation } from 'react-i18next'
import { getUserList } from '../../api/userApi'

export default function Dashboard() {
  const { t } = useTranslation('Dashboard')
  const UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

  const [UserList, setUserList] = useState<any[]>([])

  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await getUserList()
        setUserList(res.data)
      } catch (error) {
        console.error('Error fetching user list:', error)
      }
    }
    callApi()
  }, [])

  // currentUser ổn định theo UserList & UserInfo.id
  const currentUser = useMemo(() => UserList.find((u: any) => u._id === UserInfo.id), [UserList, UserInfo.id])

  // tickets ổn định; nếu không có thì dùng cùng 1 EMPTY array (không tạo [] mỗi render)
  const EMPTY: any[] = useMemo(() => [], [])
  const tickets: any[] = useMemo(() => (currentUser?.tickets ? currentUser.tickets : EMPTY), [currentUser, EMPTY])

  // Tính số lượng theo trạng thái (không setState, không useEffect)
  const { countBooked, countRejected, countPending } = useMemo(() => {
    let booked = 0,
      rejected = 0,
      pending = 0
    for (const it of tickets) {
      if (it.status === 1) booked++
      else if (it.status === 2) rejected++
      else if (it.status === 3) pending++
    }
    return { countBooked: booked, countRejected: rejected, countPending: pending }
  }, [tickets])

  return (
    <div className='flex flex-col w-full h-full bg-gray-100'>
      {/* Banner */}
      <div
        className='w-full h-48 flex items-center justify-center'
        style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-black/50'>
          <h1 className='text-3xl sm:text-4xl font-bold text-[#fff] drop-shadow-lg'>{t('title')}</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5'>
        <div className='bg-[#fff] rounded-xl shadow-md hover:shadow-lg transition p-5 flex justify-between items-center border-t-4 border-green-400'>
          <div>
            <h2 className='font-semibold text-gray-600 text-lg'>{t('stats.totalBookedTicket')}</h2>
            <p className='text-2xl font-bold text-gray-800'>{countBooked}</p>
          </div>
          <div className='px-4 bg-gradient-to-tr from-green-400 to-green-500 p-3 rounded-full text-[#fff] shadow-md'>
            <i className='text-[30px]'>
              <Icon name='ticket' />
            </i>
          </div>
        </div>

        <div className='bg-[#fff] rounded-xl shadow-md hover:shadow-lg transition p-5 flex justify-between items-center border-t-4 border-red-500'>
          <div>
            <h2 className='font-semibold text-gray-600 text-lg'>{t('stats.totalRejectedTicket')}</h2>
            <p className='text-2xl font-bold text-gray-800'>{countRejected}</p>
          </div>
          <div className='px-4 bg-gradient-to-tr from-red-400 to-red-500 p-3 rounded-full text-[#fff] shadow-md'>
            <i className='text-[30px]'>
              <Icon name='ticket' />
            </i>
          </div>
        </div>

        <div className='bg-[#fff] rounded-xl shadow-md hover:shadow-lg transition p-5 flex justify-between items-center border-t-4 border-yellow-400'>
          <div>
            <h2 className='font-semibold text-gray-600 text-lg'>{t('stats.totalPendingTicket')}</h2>
            <p className='text-2xl font-bold text-gray-800'>{countPending}</p>
          </div>
          <div className='px-4 bg-gradient-to-tr from-yellow-300 to-yellow-400 p-3 rounded-full text-[#fff] shadow-md'>
            <i className='text-[30px]'>
              <Icon name='ticket' />
            </i>
          </div>
        </div>
      </div>

      {/* Booking history */}
      <div className='py-10 bg-[#fff] shadow-inner'>
        <Booking />
      </div>
    </div>
  )
}
