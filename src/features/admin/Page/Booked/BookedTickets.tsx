import Icon from '../../../../icons/Icon'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
const veData = UserList.map((user: any) => user.ticket).flat()

const GuestUser = JSON.parse(localStorage.getItem('guestUserInfo') || '[]')
const GuestUserTicket = GuestUser.map((user: any) => user.ticket).flat()

// hàm để gộp dữ liệu vé đã đặt của người dùng đã đăng nhập và khách
const ve = [...veData, ...GuestUserTicket]

// kiểm tra xem có vé nào đã đặt hay không userType === 1 khách hàng đã đăng nhập === 2 là khách hàng chưa đăng nhập
const vechokhach = ve.filter((item: any) => item.userType === 1)
console.log(vechokhach)

function Tickets() {
  const { t } = useTranslation('Home')

  const seats = ve
    .map((item: any) => item.seats)
    .map((item: any) => {
      return item.map((seat: any) => seat.name)
    })
  // hàm xử lý trạng thái ghế Total Booked Ticket, Total Rejected Ticket, Total Pending Ticket
  const Status = [
    { id: 1, name: 'Confirmed', colors: '#00d40e', bg: '#00ff2636' },
    { id: 2, name: 'Rejected', colors: '#f00', bg: '#ff000036' },
    { id: 3, name: 'Pending', colors: '#eeea00', bg: '#d5fb2b2d' }
  ]
  // click thông tin vé
  const [informationticket, setinformationticket] = useState(false)
  const isclick = () => {
    setinformationticket(!informationticket)
  }

  // thongtinve
  const thongtinve = JSON.parse(localStorage.getItem('thongtinve') || '{}')

  return (
    <>
      <div className='bg-[#fff] px-2 sm:px-4 md:px-10 py-6'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-[#1ba000] rounded-t-2xl text-[13px]'>
            <thead>
              <tr className='text-[#fff]  space-nowrap  '>
                <th className='py-2 px-2 text-left w-[90px]'>ID</th>
                <th className='py-2 px-2 text-left w-[90px]'>PNR</th>
                <th className='py-2 px-2 text-left  text-nowrap'>AC / Non-AC</th>
                <th className='py-2 px-2 text-left w-[120px]'>Start</th>
                <th className='py-2 px-2 text-left w-[120px]'>Drop</th>
                <th className='py-2 px-2 text-left w-[100px]'>Date</th>
                <th className='py-2 px-2 text-left w-[80px]'>Time</th>
                <th className='py-2 px-2 text-left w-[120px]'>Seats</th>
                <th className='py-2 px-2 text-left w-[100px]'>Status</th>
                <th className='py-2 px-2 text-left w-[80px]'>Fare</th>
                <th className='py-2 px-2 text-center w-[80px]'>Info</th>
              </tr>
            </thead>

            <tbody>
              {ve.length > 0 ? (
                ve.map((item: any, index: number) => (
                  <tr key={index} className='bg-[#fff] text-xs text-gray-800 text-nowrap   border-b'>
                    <td className='py-2 px-2 text-gray-500'>{item.id}</td>
                    <td className='py-2 px-2 text-[#4447ff]'>{item.ticketId}</td>
                    <td className='py-2 px-2 text-[#a7a7a7]'>{item.type}</td>
                    <td className='py-2 px-2 text-[#04b925]  '> {t(`${item.diemDen}`,{ defaultValue: item.diemden })}</td>
                    <td className='py-2 px-2 text-[#04b925]'> {t(`${item.diemDi}`,{ defaultValue: item.diemdi })} </td>
                    <td className='py-2 px-2 text-[#4c4c4c] font-medium'>{item.dateStart}</td>
                    <td className='py-2 px-2 text-[#7337ff] font-mono'>{item.starttime}</td>
                    <td className='py-2 px-2 '>{seats[index].join(', ')}</td>

                    <td className='py-2 px-2'>
                      {Status.map((status) => {
                        if (item.status === status.id) {
                          return (
                            <span
                              key={status.id}
                              className={`px-3 py-1 rounded-full text-[${status.colors}] bg-[${status.bg}] border-2`}
                            >
                              {status.name}
                            </span>
                          )
                        }
                        return null
                      })}
                    </td>

                    <td className='py-2 px-2 text-[#1645ff] text-nowrap'>
                      ${item.price} <span className=''>USD</span>
                    </td>
                    {/* thông tin vé */}

                    <td className='py-2 px-2'>
                      <button
                        onClick={() => {
                          setinformationticket(true)
                          // lưu thông tin vé đã click + trạng thái hiện tại của vé vào thotinve
                          localStorage.setItem('thongtinve', JSON.stringify([ve[index]]))
                        }}
                        className=' cursor-pointer  bg-[#2800c91b] py-1 px-3 rounded'
                      >
                        <span className='text-[#0000006c]'>
                          <Icon name='about' />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className='text-center text-gray-500  bg-[#fff] py-4'>
                    No tickets booked yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {informationticket && (
        <div>
          <div className='bg-black fixed top-0 z-90 opacity-30 h-full w-full ' onClick={isclick}></div>

          <div
            className={` fixed top-1/9   left-1/2 transform -translate-x-1/2  rounded z-900
          
          
          `}
            style={{
              animation: informationticket ? 'slideDown 0.3s ease' : 'slideUp 0.3s ease'
            }}
          >
            {thongtinve.map((item: any) => (
              <div className='bg-[#fff] w-150 rounded-3xl py-4 flex flex-col gap-5 divide-y-2 divide-gray-200'>
                <div className='flex justify-between px-4 py-2  border-b-2  '>
                  <h1 className='font-extrabold text-gray-600 text-[17px]'>Ticket Booking History</h1>
                  <span onClick={isclick}>
                    <i className=' cursor-pointer'>
                      <Icon name='close' />
                    </i>
                  </span>
                </div>
                <div className='flex justify-between px-4'>
                  <h1 className='font-extrabold text-gray-400 text-[17px]'>Ngày: </h1>
                  <p className='font-mono text-gray-600 text-[17px] '>{item.dateStart}</p>
                </div>
                <div className='flex justify-between px-4'>
                  <h1 className='font-extrabold text-gray-400 text-[17px]'>mã vé</h1>
                  <p className='font-mono text-gray-600 text-[17px] '>{item.ticketId}</p>
                </div>
                <div className='flex justify-between px-4'>
                  <h1 className='font-extrabold text-gray-400 text-[17px]'>Tuyến đường</h1>
                  <p className='font-mono text-gray-600 text-[17px] '>
                    {' '}
                    {t(`${item.diemDi}`,{ defaultValue: item.diemdi })} - {t(`${item.diemDen}`,{ defaultValue: item.diemden })}
                  </p>
                </div>
                <div className='flex justify-between px-4'>
                  <h1 className='font-extrabold text-gray-400 text-[17px]'>Giá</h1>
                  <p className='font-mono text-gray-600 text-[17px] '>{item.price} USD</p>
                </div>
                <div className='flex justify-between px-4'>
                  <h1 className='font-extrabold text-gray-400 text-[17px]'>Trạng thái</h1>
                  <p className='font-mono text-gray-600 text-[17px] '>
                    <td className='py-2 px-4 '>
                      {Status.map((status) => {
                        if (item.status === status.id) {
                          return (
                            <span
                              key={status.id}
                              className={`px-3 py-1 rounded-full text-[${status.colors}] bg-[${status.bg}] border-2`}
                            >
                              {status.name}
                            </span>
                          )
                        }
                        return
                      })}
                    </td>
                  </p>
                </div>

                <div className='pr-4'>
                  <button onClick={isclick} className='  float-end bg-red-500 px-8 py-4 rounded-2xl'>
                    {' '}
                    xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
          <style>
            {`  
              @keyframes slideDown{
              0% {
              top: 0;
                transform: traslateY(-100%); opacity: 0; 
              }
                100% {
                  transform: traslateY(-100%); opacity: 1; 
                }
              }
                @keyframes slideUp{
                0% {
                  top: 0;
                  transform: translateY(0); opacity: 1; 
                }
                100% {
                  transform: translateY(-100%); opacity: 0;
              }
            `}
          </style>
        </div>
      )}
    </>
  )
}

export default function BookedTickets() {
  // hàm đếm
  const totalBooked = ve.length
  const [countConfirmed, setCountConfirmed] = useState(0)
  const [countRejected, setCountRejected] = useState(0)
  const [countPending, setCountPending] = useState(0)

  useEffect(() => {
    const Confirmed = ve.filter((item: any) => item.status === 1).length
    const Rejected = ve.filter((item: any) => item.status === 2).length
    const Pending = ve.filter((item: any) => item.status === 3).length
    setCountConfirmed(Confirmed)
    setCountRejected(Rejected)
    setCountPending(Pending)
  })

  const countticket = ve.length

  return (
    <>
      <div className='flex flex-col  px-2 w-full   pt-2 '>
        <div className='py-3 flex justify-between px-3 items-center text-center w-full shadow-md bg-[#fff] rounded-lg  '>
          <h1 className=' text-1xl sm:text-3xl font-bold text-gray-700'>Vé đã đặt</h1>
          <div className='  flex justify-between px-2 items-center  w-15  sm:w-30 h-full rounded-lg   m-2 bg-[#4f46e5] shadow-md'>
            <i className='   text-[14px] sm:text-4xl text-[#fff]/20'>
              <Icon name='ticket' />
            </i>
            <div className='flex flex-col text-[#fff]  '>
              <span className='font-bold text-[16px] sm:text-2xl'>{countticket}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Account */}
      <div>
        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  py-3'>
          {/* số lượng vé đã đặt */}
          <div className='relative  rounded-lg overflow-hidden m-2 bg-[#4F46E5] shadow-md'>
            <i className='absolute bottom-[-5px] left-0 text-5xl text-[#fff]/20'>
              <Icon name='ticket' />
            </i>
            <div className='flex flex-col text-[#fff] items-end h-full p-4 gap-2 pl-2'>
              <span className='font-bold text-3xl'>{totalBooked}</span>
              <span className='text-[#fff]/70 text-sm'>Vé đã đặt</span>
            </div>
          </div>
          {/* Thanh toán thành công */}
          <div className='relative rounded-lg overflow-hidden m-2 bg-green-500 shadow-md'>
            <i className='absolute bottom-0 left-0 text-5xl text-[#fff]/20'>
              <Icon name='check-circle' />
            </i>
            <div className='flex flex-col text-[#fff] items-end h-full p-4 gap-2 pl-2'>
              <span className='font-bold text-3xl'> {countConfirmed} </span>
              <span className='text-[#fff]/70 text-sm'>Thanh toán thành công</span>
            </div>
          </div>
          {/* Tổng vé  chờ thanh toán */}
          <div className='relative rounded-lg overflow-hidden m-2 bg-yellow-500 shadow-md'>
            <i className='absolute bottom-0 left-0 text-5xl text-[#fff]/20'>
              <Icon name='clock' />
            </i>
            <div className='flex flex-col text-[#fff] items-end h-full p-4 gap-2 pl-2'>
              <span className='font-bold text-3xl'>{countPending}</span>
              <span className='text-[#fff]/70 text-sm'>Đang chờ thanh toán</span>
            </div>
          </div>

          {/* Tổng vé đã từ chối thanh toán */}
          <div className='relative rounded-lg overflow-hidden m-2 bg-red-500 shadow-md'>
            <i className='absolute bottom-0 left-0 text-5xl text-[#fff]/20'>
              <Icon name='x-circle' />
            </i>
            <div className='flex flex-col text-[#fff] items-end h-full p-4 gap-2 pl-2'>
              <span className='font-bold text-3xl'>{countRejected}</span>
              <span className='text-[#fff]/70 text-sm'>Thanh toán bị từ chối</span>
            </div>
          </div>
        </div>
        <div>
          <Tickets />
        </div>
      </div>
    </>
  )
}
