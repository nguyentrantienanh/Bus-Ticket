import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '../../../../icons/Icon'
import emailjs from 'emailjs-com'

const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
const veData = UserList.map((user: any) => user.ticket).flat()

const GuestUser = JSON.parse(localStorage.getItem('guestUserInfo') || '[]')
const GuestUserTickets = GuestUser.map((user: any) => user.ticket).flat()
// hàm gộp UserList và GuestUser

// hàm để gộp dữ liệu vé đã đặt của người dùng đã đăng nhập và khách
const ve = [...veData, ...GuestUserTickets]

function TicketPending() {
  // hiện thị vé đã được duyệt
  const PendingTickets = ve.filter((item: any) => item.status === 3)

  const { t } = useTranslation('Home')

  const seats = PendingTickets.map((item: any) => item.seats).map((item: any) => {
    return item.map((seat: any) => seat.name)
  })

  // click thông tin vé
  const [informationticket, setinformationticket] = useState(false)
  const isclick = () => {
    setinformationticket(!informationticket)
  }

  // thongtinve
  const thongtinve = JSON.parse(localStorage.getItem('thongtinve') || '{}')

  // hàm xử lý xác nhận vé xách nhận status === 1   lấy id
  const handleConfirm = async (id: number) => {
    const isRegisteredUser = UserList.some((user: any) => user.ticket?.some((t: any) => t.id === id))

    if (isRegisteredUser) {
      // Cập nhật cho user đã đăng nhập
      const updatedUserList = UserList.map((user: any) => {
        const hasTicket = user.ticket?.some((t: any) => t.id === id)
        if (hasTicket) {
          return {
            ...user,
            ticket: user.ticket.map((t: any) => (t.id === id ? { ...t, status: 1 } : t))
          }
        }
        return user
      })
      localStorage.setItem('userList', JSON.stringify(updatedUserList))
    } else {
      const updatedGuestList = GuestUser.map((user: any) => {
        const hasTicket = user.ticket?.some((t: any) => t.id === id)
        if (hasTicket) {
          return {
            ...user,
            ticket: user.ticket.map((t: any) => (t.id === id ? { ...t, status: 1 } : t))
          }
        }
        return user
      })
      localStorage.setItem('guestUserInfo', JSON.stringify(updatedGuestList))
    }

    // gửi email xác nhận
    const ticket = veData.filter((item: any) => item.id === id)
    const guestUserTicket = GuestUserTickets.filter((item: any) => item.id === id)
    const userinfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    const USERID = (userinfo.name ? UserList : GuestUser).find((user: any) =>
      user.ticket?.some((t: any) => t.id === id)
    )

    try {
      const currentTicket = ticket[0] || guestUserTicket[0]

      const templateParams = {
        order_id: ticket[0]?.id || guestUserTicket[0]?.id,
        start_time: ticket[0]?.starttime || guestUserTicket[0]?.starttime,
        departure_location: t(currentTicket?.diemDi) || currentTicket?.diemDi,
        travel_time: ticket[0]?.timetogo || guestUserTicket[0]?.timetogo,
        end_time: ticket[0]?.endtime || guestUserTicket[0]?.endtime,
        destination_location: t(currentTicket?.diemDen) || guestUserTicket[0]?.diemDen,
        ticket_id: ticket[0]?.id || guestUserTicket[0]?.id,
        departure_date: ticket[0]?.dateStart || guestUserTicket[0]?.dateStart,
        bus_type: ticket[0]?.type || guestUserTicket[0]?.type,
        seat_layout: ticket[0]?.seatLayout || guestUserTicket[0]?.seatLayout,
        seat_numbers: (ticket[0]?.seats || guestUserTicket[0]?.seats).map((s: any) => s.name).join(', '),
        ticket_quantity: (ticket[0]?.seats || guestUserTicket[0]?.seats).length,
        passenger_name: USERID.fullName,
        passenger_email: USERID.email,
        passenger_phone: USERID.phone,
        passenger_id: USERID.cccd,
        total_amount: (ticket[0]?.price || guestUserTicket[0]?.price).toLocaleString() + ' VNĐ',
        payment_status: 'Đã thanh toán',
        support_phone: import.meta.env.VITE_SUPPORT_PHONE,
        support_email: import.meta.env.VITE_SUPPORT_EMAIL,
        website_url: import.meta.env.VITE_WEBSITE_URL,
        email: `${USERID.email}` || `${import.meta.env.VITE_SUPPORT_EMAIL}`
      }
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_TICKET_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      alert('Thanh toán thành công! Vé của bạn đã được gửi qua email.')
      window.location.href = '/buytickets'
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Lỗi khi gửi vé qua email. Vui lòng thử lại sau.')
    }

    window.location.reload()
  }

  // hàm xử lý hủy vé status === 2
  const handleCancel = async (id: string) => {
    const isRegisteredUser = UserList.some((user: any) => user.ticket?.some((t: any) => t.id === id))

    if (isRegisteredUser) {
      // Cập nhật cho user đã đăng nhập
      const updatedUserList = UserList.map((user: any) => {
        const hasTicket = user.ticket?.some((t: any) => t.id === id)
        if (hasTicket) {
          return {
            ...user,
            ticket: user.ticket.map((t: any) => (t.id === id ? { ...t, status: 2 } : t))
          }
        }
        return user
      })
      localStorage.setItem('userList', JSON.stringify(updatedUserList))
    } else {
      const updatedGuestList = GuestUser.map((user: any) => {
        const hasTicket = user.ticket?.some((t: any) => t.id === id)
        if (hasTicket) {
          return {
            ...user,
            ticket: user.ticket.map((t: any) => (t.id === id ? { ...t, status: 2 } : t))
          }
        }
        return user
      })
      localStorage.setItem('guestUserInfo', JSON.stringify(updatedGuestList))
    }
    // gửi email xác nhận
    const ticket = veData.filter((item: any) => item.id === id)
    const guestUserTicket = GuestUserTickets.filter((item: any) => item.id === id)
    const userinfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
    const USERID = (userinfo.name ? UserList : GuestUser).find((user: any) =>
      user.ticket?.some((t: any) => t.id === id)
    )
    try {
      const currentTicket = ticket[0] || guestUserTicket[0]

      const templateParams = {
        diemDi: t(currentTicket?.diemDi) || currentTicket?.diemDi,

        start_time: ticket[0]?.starttime || guestUserTicket[0]?.starttime,
        diemDen: t(currentTicket?.diemDen) || guestUserTicket[0]?.diemDen,
        ticket_id: ticket[0]?.id || guestUserTicket[0]?.id,
        departure_date: ticket[0]?.dateStart || guestUserTicket[0]?.dateStart,
        bus_type: ticket[0]?.type || guestUserTicket[0]?.type,
        seat_layout: ticket[0]?.seatLayout || guestUserTicket[0]?.seatLayout,
        seat_numbers: (ticket[0]?.seats || guestUserTicket[0]?.seats).map((s: any) => s.name).join(', '),
        passenger_name: USERID.fullName,

        passenger_phone: USERID.phone,

        total_amount: (ticket[0]?.price || guestUserTicket[0]?.price).toLocaleString() + ' VNĐ',

        support_phone: import.meta.env.VITE_SUPPORT_PHONE,

        website_url: import.meta.env.VITE_WEBSITE_URL,
       email: USERID.email,   
support_email: import.meta.env.VITE_SUPPORT_EMAIL,  

      }
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      alert('Hủy vé thành công! Vé của bạn đã được gửi qua email.')
    } catch (error) {
      alert('Lỗi khi gửi vé qua email. Vui lòng thử lại sau.')
    }

    window.location.reload()
  }
  const test = UserList.find(
    (user: any) =>
      user.ticket?.some((t: any) => t.id === thongtinve[0]?.id) ||
      GuestUser.find((user: any) => user.ticket?.some((t: any) => t.id === thongtinve[0]?.id))
  )
  return (
    <>
      <div className='bg-yellow-50 md:px-10 py-6 min-h-screen'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-yellow-500 md:rounded-t-2xl text-[13px]'>
            <thead>
              <tr className='text-[#fff] space-nowrap text-nowrap'>
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
                <th className='py-2 px-2 text-center'>Info</th>
                <th className='py-2 px-2 text-left w-[80px]'> Action</th>
              </tr>
            </thead>
            <tbody>
              {PendingTickets.length > 0 ? (
                PendingTickets.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className='bg-[#fff] text-xs text-gray-800 text-nowrap space-nowrap border-b even:bg-yellow-100'
                  >
                    <td className='py-2 px-2 text-gray-500'>{item.id}</td>
                    <td className='py-2 px-2 text-blue-600'>{item.ticketId}</td>
                    <td className='py-2 px-2 text-gray-500'>{item.type}</td>
                    <td className='py-2 px-2 text-green-600'>{t(item.diemDen)}</td>
                    <td className='py-2 px-2 text-green-600'>{t(item.diemDi)}</td>
                    <td className='py-2 px-2 font-medium'>{item.dateStart}</td>
                    <td className='py-2 px-2 text-purple-700 font-mono'>{item.starttime}</td>
                    <td className='py-2 px-2 font-mono'>{seats[index].join(', ')}</td>
                    <td className='py-2 px-2'>
                      <span className='px-3 py-1 rounded-full text-yellow-600 bg-yellow-100 border border-yellow-300'>
                        Pending
                      </span>
                    </td>
                    <td className='py-2 px-2 text-indigo-600 font-semibold'>
                      ${item.price.toLocaleString()} <span className='text-xs'> VNĐ</span>
                    </td>
                    <td className='py-2 px-2 text-center'>
                      <button
                        onClick={() => {
                          setinformationticket(true)
                          localStorage.setItem('thongtinve', JSON.stringify([ve[index]]))
                        }}
                        className='bg-gray-100 p-2 rounded hover:bg-gray-200 transition'
                        title='View Info'
                      >
                        <Icon name='about' />
                      </button>
                    </td>
                    <td className='py-2 px-2'>
                      <div className='flex justify-center space-x-2'>
                        <button
                          onClick={() => handleConfirm(item.id)}
                          className='bg-green-500 cursor-pointer hover:bg-green-600 text-[#fff] px-3 py-1 rounded-md text-xs transition whitespace-nowrap'
                        >
                          <Icon name='check' />
                        </button>
                        <button
                          onClick={() => handleCancel(item.id)}
                          className='bg-red-500 cursor-pointer hover:bg-red-600 text-[#fff] px-3 py-1 rounded-md text-xs transition'
                        >
                          <Icon name='cancel' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className='text-center bg-gray-100 py-4 text-gray-500'>
                    No Pending tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {informationticket && (
        <div>
          <div className='bg-black fixed top-0 left-0 z-100 opacity-30 w-screen h-screen ' onClick={isclick}></div>

          <div
            className={`  fixed top-1/9  md:w-[600px] left-1/2 transform -translate-x-1/2  rounded z-900
          
          
          `}
            style={{
              animation: informationticket ? 'slideDown 0.3s ease' : 'slideUp 0.3s ease'
            }}
          >
            {thongtinve.map((item: any) => (
              <div className='  w-full rounded-3xl py-4 flex flex-col gap-5 divide-y-2 divide-gray-200'>
                <div
                  key={item.id}
                  className='bg-[#fff]   rounded-xl p-4 shadow space-y-2
                  '
                >
                  <div className='flex justify-between px-2 py-2  border-b-2  '>
                    <h1 className='font-extrabold text-gray-600 text-nowrap text-[13px] md:text-[17px] flex max-md:flex-col items-center'>
                      Ticket Booking History{' '}
                      <p className='font-mono px-2 text-gray-600 text-[10px] max-md:mr-auto max-md:px-0 max-md:py-1 md:text[14px] '>
                        <span className='  font-bold px-3 py-1 rounded-full bg-yellow-200 text-yellow-500'>
                          Pending
                        </span>
                      </p>
                    </h1>

                    <div className='flex justify-between px-4'></div>
                    <span onClick={isclick}>
                      <i className=' cursor-pointer'>
                        <Icon name='close' />
                      </i>
                    </span>
                  </div>
                  <div className='flex max-md:flex-col justify-between items-center'>
                    <span className='  text-[11px] md:text-sm text-gray-500'>Số vé/code: {item.id}</span>
                    <div>
                      <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-[11px] text-xs text-nowrap font-semibold  '>
                        {' '}
                        <strong>Ngày xuất phát: </strong>
                        <span className='pl-1'>{item.dateStart}</span>
                      </span>
                      <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-[11px] text-xs text-nowrap font-semibold'>
                        Chiều đi
                      </span>
                    </div>
                  </div>

                  <div className=' text-[13px] md:text-xl font-bold'>
                    {item.type} - {t(item.diemDi)} - {t(item.diemDen)}{' '}
                  </div>
                  <p className='text-[11px] text-gray-500'>Sơ đồ ghế: {item.seatLayout}</p>

                  <div className='flex justify-between items-center text-center border-t border-b py-2 border-dashed'>
                    <div>
                      <div className='text-[14px] font-medium  '>Giờ khởi hành</div>
                      <div className='text-[13px] md:text-xl font-bold'>{item.starttime}</div>
                      <div className='text-[13px] md:text-sm font-medium'>{t(item.diemDi)}</div>
                    </div>
                    <div>
                      <i className='text-green-600 max-md:text-[13px] border-b pl-4 pr-1'>
                        ...
                        <Icon name='bus-go' />
                      </i>
                      <div className='text-[10px] md:text-xs text-gray-500'>
                        {item.timetogo?.slice(0, 2)} giờ {item.timetogo?.slice(3, 5)} phút
                      </div>
                    </div>

                    <div>
                      <div className='text-[14px] font-medium  '>Giờ đến nơi</div>
                      <div className='text-[13px] md:text-xl font-bold'>{item.endtime}</div>
                      <div className='text-[13px] md:text-sm font-medium'>{t(item.diemDen)}</div>
                    </div>
                  </div>

                  <div className='bg-gray-100 p-3 rounded-lg text-sm'>
                    <div className='font-semibold max-md:text-[13px] '>{test?.fullName || test?.name}</div>
                    <div className='text-xs text-gray-600 '>
                      CMND: <span className='font-normal max-md:text-[12px]'>{test?.cccd} </span>
                    </div>
                    <div className='font-semibold text-sm text-gray-700 max-md:text-[10px] '>
                      {' '}
                      <strong>{test?.type === 1 ? 'Khách hàng' : 'Khách vãng lai'}</strong>
                    </div>
                    <div className='mt-2 border-t pt-2 flex justify-between'>
                      <div className=' '>
                        {' '}
                        <strong>Ghế:</strong>{' '}
                        <span className='text-blue-600 font-medium '>
                          {item.seats.map((s: any) => s.name).join(', ')}
                        </span>{' '}
                      </div>
                      <div className='font-bold text-green-600'>{item.price.toLocaleString()} VNĐ</div>
                    </div>
                  </div>
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
export { TicketPending }

export default function Pending() {
  const totaslPending = ve.filter((item: any) => item.status === 3).length

  return (
    <>
      <div className=' bg-yellow-50 flex flex-col  md:px-2 w-full py-4  pt-2 '>
        <div className='py-3 flex justify-between px-3 items-center text-center w-full shadow-md bg-[#fff] md:rounded-lg  '>
          <h1 className=' text-1xl sm:text-3xl font-bold text-gray-700'>Vé chờ duyệt</h1>
          <div className='  flex justify-between px-2 items-center  w-15  sm:w-30 h-full rounded-lg   m-2 bg-yellow-500 shadow-md'>
            <i className='  text-[14px]  sm:text-4xl text-[#fff]/20'>
              <Icon name='ticket' />
            </i>
            <div className='flex flex-col text-[#fff]  '>
              <span className='font-bold text-[16px] sm:text-2xl'>{totaslPending}</span>
            </div>
          </div>
        </div>
      </div>
      <TicketPending />
      <div></div>
    </>
  )
}
