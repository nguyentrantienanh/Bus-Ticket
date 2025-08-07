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
  const guestUserTicket = GuestUserTickets.filter((item: any) => item.id ===  id)
  const userinfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const USERID = (userinfo.name ? UserList : GuestUser).find((user: any) =>
    user.ticket?.some((t: any) => t.id === id)
  )

    try{
       const currentTicket = ticket[0] || guestUserTicket[0]
    
      const templateParams = {
          order_id: ticket[0]?.id || guestUserTicket[0]?.id,
          start_time: ticket[0]?.starttime || guestUserTicket[0]?.starttime,
          departure_location:  t(currentTicket?.diemDi) || currentTicket?.diemDi,
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
          email: `${USERID.email}, ${import.meta.env.VITE_SUPPORT_EMAIL}`
      }
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_TICKET_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      console.log('Email sent successfully:', result.text)
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
  const guestUserTicket = GuestUserTickets.filter((item: any) => item.id ===  id)
  const userinfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const USERID = (userinfo.name ? UserList : GuestUser).find((user: any) =>
    user.ticket?.some((t: any) => t.id === id)
  )
   try{
       const currentTicket = ticket[0] || guestUserTicket[0]
    
      const templateParams = {
 
 
          diemDi:  t(currentTicket?.diemDi) || currentTicket?.diemDi,
          
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
          email: `${USERID.email}, ${import.meta.env.VITE_SUPPORT_EMAIL}`
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
                    {t(`${item.diemDi}`, { defaultValue: item.diemdi })} -{' '}
                    {t(`${item.diemDen}`, { defaultValue: item.diemden })}
                  </p>
                </div>
                <div className='flex justify-between px-4'>
                  <h1 className='font-extrabold text-gray-400 text-[17px]'>Giá</h1>
                  <p className='font-mono text-gray-600 text-[17px] '>{item.price.toLocaleString()} VNĐ</p>
                </div>
                <div className='flex justify-between px-4'>
                  <h1 className='font-extrabold text-gray-400 text-[17px]'>Trạng thái</h1>
                  <p className='font-mono text-gray-600 text-[17px] '>
                    <td className='py-2 px-4 '>
                      <span className='px-3 py-1 rounded-full text-[#eeea00] bg-[#d5fb2b2d] border-2'>Pending</span>
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
