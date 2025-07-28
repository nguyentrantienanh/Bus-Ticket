import Icon from '../../../../icons/Icon'
import avatar from '../../../../assets/avatar.jpg'
import Statistics from './Statistics'
import { ticket } from '../../../../Data/Ticket'
import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'
export default function Dashboard() {
  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const veData = UserList.map((user: any) => user.ticket).flat()

  const GuestUser = JSON.parse(localStorage.getItem('guestUserInfo') || '[]')
  const GuestUserTicket = GuestUser.map((user: any) => user.ticket).flat()

  // hàm để gộp dữ liệu vé đã đặt của người dùng đã đăng nhập và khách
  const ve = [...veData, ...GuestUserTicket]
  // hàm đếm
  const [countConfirmed, setCountConfirmed] = useState(0)

  useEffect(() => {
    const Confirmed = ve.filter((item: any) => item.status === 1).length

    setCountConfirmed(Confirmed)
  })

  // hàm tính tổng doanh thu
  const totalConfirmed = ve
    .reduce((total: number, item: any) => {
      if (item.status === 1) {
        return total + item.price
      }
      return total
    }, 0)
    .toLocaleString('vi', { style: 'currency', currency: 'VND' })
  const ticketcount = ticket().length

  const totalBooked = ve.length
  // hàm tính %  tỷ lệ thanh toán thành công
  const percent = ((countConfirmed / totalBooked) * 100).toFixed(2) + '%'

  return (
    <>
      <div className='bg-[#f0f0f0] min-h-screen'>
        <div className='sm:py-3 py-1 flex justify-between px-1 sm:px-3 items-center text-center w-full shadow-md bg-[#fff] rounded-lg  '>
          <h1 className='text-1xl sm:text-2xl font-bold text-gray-700'>Dashboard</h1>
          <div className='flex items-center gap-2'>
            <i className='text-1xl sm:text-2xl my-1 text-gray-700 cursor-pointer relative'>
              <Icon name='notification' />
              <sup className='absolute -right-2 bg-red-500 text-[#fff] text-xs rounded-full px-1'>0</sup>
            </i>

            <img src={avatar} alt='' className=' ml-2 w-5 h-5 sm:w-10 sm:h-10 rounded-full' />
            <span className='text-gray-700 px-1 font-semibold'>Admin </span>
          </div>
        </div>

        {/* các thông tin  */}
        <div>
          <div className=' bg-[#fff]  my-4  grid  grid-cols-1 sm:grid-cols-2   lg:grid-cols-4   py-6'>
            {/* số lượng vé   */}
            <div className='relative  rounded-lg overflow-hidden m-2 bg-blue-500 shadow-md'>
              <i className='absolute bottom-[-5px] left-0 text-4xl sm:text-5xl  text-[#fff]/20'>
                <Icon name='ticket' />
              </i>
              <div className='flex flex-col text-[#fff] items-end h-full p-2   gap-2 pl-2'>
                <span className='font-bold text-1xl sm:text-2xl lg:text-3xl'>{ticketcount}</span>
                <span className='text-[#fff] text-[10px] sm:text-[11px] xl:text-[14px]  '>Tổng số vé</span>
                <Link to={`/admin/booked-tickets`}>
                  <button className='text-[10px] sm:text-[11px] xl:text-[14px]   cursor-pointer px-3 py-1 bg-[#fff] text-blue-500 rounded-md text-sm font-semibold shadow-sm hover:bg-gray-100'>
                    View All
                  </button>
                </Link>
              </div>
            </div>
            {/*  Vé đã đặt  */}
            <div className='relative rounded-lg overflow-hidden m-2 bg-orange-400 shadow-md'>
              <i className='absolute bottom-0 left-0 text-5xl text-[#fff]/20'>
                <Icon name='check-circle' />
              </i>
              <div className='flex flex-col text-[#fff] items-end h-full p-2 gap-2 pl-2'>
                <span className='font-bold text-1xl sm:text-2xl lg:text-3xl'>{totalBooked}</span>
                <span className='text-[#fff] text-[10px] sm:text-[11px] xl:text-[14px]  '>Vé đã đặt</span>
                <Link to={`/admin/booked-tickets`}>
                  <button className='text-[10px] sm:text-[11px] xl:text-[14px]  cursor-pointer px-3 py-1 bg-[#fff] text-orange-400 rounded-md text-sm font-semibold shadow-sm hover:bg-gray-100'>
                    View All
                  </button>
                </Link>
              </div>
            </div>

            {/* Thanh toán thành công */}
            <div className='relative rounded-lg overflow-hidden m-2 bg-emerald-500 hadow-md'>
              <i className='absolute bottom-[-5px] left-0 text-5xl text-[#fff]/20'>
                <Icon name='money' />
              </i>
              <div className='flex flex-col text-[#fff] items-end h-full p-2 gap-2 pl-2'>
                <span className='font-bold text-1xl sm:text-2xl lg:text-3xl'>{totalConfirmed}</span>
                <span className='text-[#fff] text-[10px] sm:text-[11px] xl:text-[14px]  '>
                  Số tiền thanh toán thành công
                </span>
                <Link to={`/admin/booked-tickets`}>
                  <button className='text-[10px] sm:text-[11px] xl:text-[14px]  cursor-pointer px-3 py-1 bg-[#fff] text-emerald-500 rounded-md text-sm font-semibold shadow-sm hover:bg-gray-100'>
                    View All
                  </button>
                </Link>
              </div>
            </div>
            {/* Thanh toán thành công */}
            <div className='relative rounded-lg overflow-hidden m-2 bg-purple-500 shadow-md'>
              <i className='absolute bottom-0 left-0 text-5xl text-[#fff]/20'>
                <Icon name='check-circle' />
              </i>
              <div className='flex flex-col text-[#fff] items-end h-full p-2 gap-2 pl-2'>
                <span className='font-bold text-1xl sm:text-2xl lg:text-3xl'>{percent}</span>
                <span className='text-[#fff] text-[10px] sm:text-[11px] xl:text-[14px]  '>
                  Tỷ lệ thanh toán thành công
                </span>
                <Link to={`/admin/booked-tickets`}>
                  <button className=' text-[10px] sm:text-[11px] xl:text-[14px]   cursor-pointer px-3 py-1 bg-[#fff] text-purple-500 rounded-md text-sm font-semibold shadow-sm hover:bg-gray-100'>
                    View All
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Statistics />
      </div>
    </>
  )
}
