// import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '../../../../icons/Icon'
const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
const veData = UserList.map((user: any) => user.ticket).flat()

const GuestUser = JSON.parse(localStorage.getItem('guestUserInfo') || '[]')
const GuestUserTicket = GuestUser.map((user: any) => user.ticket).flat()

// hàm để gộp dữ liệu vé đã đặt của người dùng đã đăng nhập và khách
const ve = [...veData, ...GuestUserTicket]

function TicketRejected() {
  // hiện thị vé đã được duyệt
  const RejectedTickets = ve.filter((item: any) => item.status === 2)

  const { t } = useTranslation('Home')

  const seats = RejectedTickets.map((item: any) => item.seats).map((item: any) => {
    return item.map((seat: any) => seat.name)
  })

  // hàm xóa vé
  const handleDeleteTicket = (ticketId: number) => {
    const isRegisteredUser = UserList.some((user: any) => user.ticket?.some((t: any) => t.id === ticketId))
    // const updatedTickets = RejectedTickets.filter((item: any) => item.id !== ticketId)
    // localStorage.setItem('vedadat', JSON.stringify(updatedTickets))
    // window.location.reload()
    if (isRegisteredUser) {
      // Cập nhật cho user đã đăng nhập
      const updatedUserList = UserList.map((user: any) => {
        const hasTicket = user.ticket?.some((t: any) => t.id === ticketId)
        if (hasTicket) {
          return {
            ...user,
            ticket: user.ticket.filter((t: any) => t.id !== ticketId)
          }
        }
        return user
      })
      localStorage.setItem('userList', JSON.stringify(updatedUserList))
    } else {
      const updatedGuestList = GuestUser.map((user: any) => {
        const hasTicket = user.ticket?.some((t: any) => t.id === ticketId)
        if (hasTicket) {
          return {
            ...user,
            ticket: user.ticket.filter((t: any) => t.id !== ticketId)
          }
        }
        return user
      })
      localStorage.setItem('guestUserInfo', JSON.stringify(updatedGuestList))
    }
    window.location.reload()
  }
  return (
    <>
      <div className='bg-red-50 px-2 sm:px-4 md:px-10 py-6 min-h-screen'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-red-500 table-fixed rounded-t-2xl text-[13px]'>
            <thead>
              <tr className='text-[#fff] space-nowrap text-nowrap'>
                <th className='py-2 px-2 text-left w-[90px]'>ID</th>
                <th className='py-2 px-2 text-left w-[90px]'>PNR</th>
                <th className='py-2 px-2 text-left w-[90px]'>AC / Non-AC</th>
                <th className='py-2 px-2 text-left w-[120px]'>Start</th>
                <th className='py-2 px-2 text-left w-[120px]'>Drop</th>
                <th className='py-2 px-2 text-left w-[100px]'>Date</th>
                <th className='py-2 px-2 text-left w-[80px]'>Time</th>
                <th className='py-2 px-2 text-left w-[120px]'>Seats</th>
                <th className='py-2 px-2 text-left w-[100px]'>Status</th>
                <th className='py-2 px-2 text-left w-[80px]'>Fare</th>
                <th className='py-2 px-2 text-left w-[80px]'>Action</th>
              </tr>
            </thead>
            <tbody>
              {RejectedTickets.length > 0 ? (
                RejectedTickets.map((item: any, index: number) => (
                  <tr key={index} className='bg-[#fff] text-xs text-gray-800 text-nowrap space-nowrap even:bg-red-100'>
                    <td className='py-2 px-2 text-gray-500'>{item.id}</td>
                    <td className='py-2 px-2 text-blue-600'>{item.ticketId}</td>
                    <td className='py-2 px-2 text-gray-500'>{item.type}</td>
                    <td className='py-2 px-2 text-green-600'>{t(item.diemDen)}</td>
                    <td className='py-2 px-2 text-green-600'>{t(item.diemDi)}</td>
                    <td className='py-2 px-2 font-medium'>{item.dateStart}</td>
                    <td className='py-2 px-2 text-purple-700 font-mono'>{item.starttime}</td>
                    <td className='py-2 px-2 font-mono'>{seats[index].join(', ')}</td>

                    <td className='py-2 px-2 '>
                      <span className='px-3 py-1 rounded-full text-[#f00] bg-[#ff000036] border-2'>Rejected</span>
                    </td>
                    <td className='py-2 px-2 text-indigo-600 font-semibold'>
                      ${item.price} <span className='text-xs'> vnđ</span>
                    </td>
                    <td className='py-2 px-2'>
                      <button
                        onClick={() => {
                          handleDeleteTicket(item.id)
                        }}
                        className='bg-red-500 hover:bg-red-600 text-[#fff] px-3 py-1 rounded-md text-xs transition cursor-pointer'
                      >
                        <Icon name='trash' />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className='text-center  bg-gray-300 py-4 text-gray-500'>
                    No Rejected tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export { TicketRejected }

export default function Rejected() {
  const totalRejected = ve.filter((item: any) => item.status === 2).length
  return (
    <>
      <div className=' bg-red-50 flex flex-col  px-2 w-full py-4  pt-2 '>
        <div className='py-3 flex justify-between px-3 items-center text-center w-full shadow-md bg-[#fff] rounded-lg  '>
          <h1 className='text-1xl sm:text-3xl font-bold text-gray-700'>Vé từ chối</h1>
          <div className='  flex justify-between px-2 items-center  w-15  sm:w-30 h-full rounded-lg   m-2 bg-red-500 shadow-md'>
            <i className='  text-[14px]  sm:text-4xl text-[#fff]/20'>
              <Icon name='ticket' />
            </i>
            <div className='flex flex-col text-[#fff]  '>
              <span className='font-bold text-[16px] sm:text-2xl'>{totalRejected}</span>
            </div>
          </div>
        </div>
      </div>
      <TicketRejected />
    </>
  )
}
