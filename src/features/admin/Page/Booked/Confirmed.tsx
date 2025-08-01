import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '../../../../icons/Icon'
const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
const veData = UserList.map((user: any) => user.ticket).flat()

const GuestUser = JSON.parse(localStorage.getItem('guestUserInfo') || '[]')
const GuestUserTicket = GuestUser.map((user: any) => user.ticket).flat()

// hàm để gộp dữ liệu vé đã đặt của người dùng đã đăng nhập và khách
const ve = [...veData, ...GuestUserTicket]

function TicketConfirmed() {
  // hiện thị vé đã được duyệt
  const ConfirmedTickets = ve.filter((item: any) => item.status === 1)

  const { t } = useTranslation('Home')

  const seats = ConfirmedTickets.map((item: any) => item.seats).map((item: any) => {
    return item.map((seat: any) => seat.name)
  })

  // click thông tin vé
  const [informationticket, setinformationticket] = useState(false)
  const isclick = () => {
    setinformationticket(!informationticket)
  }

  // thongtinve
  const thongtinve = JSON.parse(localStorage.getItem('thongtinve') || '{}')
  // hàm đếm

  return (
    <>
      <div className='   bg-green-50   px-2 sm:px-4 md:px-10 py-6 min-h-screen'>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-[#1ba000] table-fixed rounded-t-2xl text-[13px]'>
            <thead>
              <tr className='text-[#fff]  space-nowrap text-nowrap'>
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
                <th className='py-2 px-2 text-left w-[80px]'>Info</th>
              </tr>
            </thead>
            <tbody>
              {ConfirmedTickets.length > 0 ? (
                ConfirmedTickets.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className='bg-[#fff] text-xs text-gray-800 space-nowrap text-nowrap even:bg-green-100 '
                  >
                    <td className='py-2 px-2 text-gray-500'>{item.id}</td>
                    <td className='py-2 px-2 text-blue-600'>{item.ticketId}</td>
                    <td className='py-2 px-2 text-gray-500'>{item.type}</td>
                    <td className='py-2 px-2 text-green-600'>{t(item.diemDen)}</td>
                    <td className='py-2 px-2 text-green-600'>{t(item.diemDi)}</td>
                    <td className='py-2 px-2 font-medium'>{item.dateStart}</td>
                    <td className='py-2 px-2 text-purple-700 font-mono'>{item.starttime}</td>
                    <td className='py-2 px-2 font-mono'>{seats[index].join(', ')}</td>

                    <td className='py-2 px-2 '>
                      <span className='px-3 py-1 rounded-full text-[#00d40e] bg-[#00ff2636] border-2'>Confirmed</span>
                    </td>
                    <td className='py-2 px-2 text-indigo-600 font-semibold'>
                      ${item.price} <span className='text-xs'> vnđ</span>
                    </td>
                    <td className='py-2 px-2'>
                      <button
                        onClick={() => {
                          setinformationticket(true)
                          localStorage.setItem('thongtinve', JSON.stringify([ve[index]]))
                        }}
                        className='bg-gray-100 p-2 rounded hover:bg-gray-200 cursor-pointer'
                      >
                        <Icon name='about' />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className='text-center py-4 bg-gray-300 text-gray-500'>
                    No confirmed tickets found
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
                  <p className='font-mono text-gray-600 text-[17px] '>{item.price} vnđ</p>
                </div>
                <div className='flex justify-between px-4'>
                  <h1 className='font-extrabold text-gray-400 text-[17px]'>Trạng thái</h1>
                  <p className='font-mono text-gray-600 text-[17px] '>
                    <td className='py-2 px-4 '>
                      <span className='px-3 py-1 rounded-full text-[#00d40e] bg-[#00ff2636] border-2'>Confirmed</span>
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
                transform: translateY(-100%); opacity: 0; 
              }
                100% {
                  transform: translateY(-100%); opacity: 1; 
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
export { TicketConfirmed }

export default function Confirmed() {
  const totalConfirmed = ve.filter((item: any) => item.status === 1).length
  return (
    <>
      <div className=' bg-green-50  flex flex-col  px-2 w-full py-4  pt-2 '>
        <div className='py-3 flex justify-between px-3 items-center text-center w-full shadow-md bg-[#fff] rounded-lg  '>
          <h1 className='text-1xl sm:text-3xl font-bold text-gray-700'>Vé đã được duyệt</h1>
          <div className='  flex justify-between px-2 items-center  w-15  sm:w-30 h-full rounded-lg   m-2 bg-green-500 shadow-md'>
            <i className='  text-[14px]  sm:text-4xl text-[#fff]/20'>
              <Icon name='ticket' />
            </i>
            <div className='flex flex-col text-[#fff]  '>
              <span className='font-bold text-[16px] sm:text-2xl'>{totalConfirmed}</span>
            </div>
          </div>
        </div>
      </div>
      <TicketConfirmed />
    </>
  )
}
