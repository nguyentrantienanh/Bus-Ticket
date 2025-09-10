import Icon from '../../../icons/Icon'
import backgruond from '../../../assets/background.jpg'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getUserList } from '../../../api/userApi'
export function Booking() {
  // const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const [UserList, setUserList] = useState<any[]>([])
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const res = await getUserList()

        setUserList(res.data)
      } catch (error) {
        console.error('Error fetching user list:', error)
      }
    }
    fetchUserList()
  }, [])

  const UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

  const currentUser = UserList.find((user: any) => user._id === UserInfo.id) || {}

  const ve = currentUser.ticket || []
  const { t } = useTranslation('Home')
  const { t: tBooking } = useTranslation('Bookinghistory')

  const seats = ve
    .map((item: any) => item.seats)
    .map((item: any) => {
      return item.map((seat: any) => seat.name)
    })
  // hàm xử lý trạng thái ghế Total Booked Ticket, Total Rejected Ticket, Total Pending Ticket

  // click thông tin vé
  const [informationticket, setinformationticket] = useState(false)
  const isclick = () => {
    setinformationticket(!informationticket)
  }

  // thongtinve
  const thongtinve = JSON.parse(localStorage.getItem('thongtinve') || '[]')
  const test = UserList.find((user: any) => user.ticket?.some((t: any) => t.id === thongtinve[0]?.id))
  return (
    <>
      <div className='bg-[#fff]  px-0 md:px-10 py-6 '>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-sm md:text-[13px]  overflow-x-400'>
            <thead>
              <tr className='bg-[#1ba000] text-[#fff] text-nowrap'>
                <th className='py-2 px-2 text-left w-[60px]  '>{tBooking('table.headers.id')}</th>
                <th className='py-2 px-2 text-left hidden md:table-cell'>{tBooking('table.headers.acNonAc')}</th>
                <th className='py-2 px-2 text-left w-[120px]'>{tBooking('table.headers.start')}</th>
                <th className='py-2 px-2 text-left w-[120px]'>{tBooking('table.headers.drop')}</th>
                <th className='py-2 px-2 text-left w-[100px]'>{tBooking('table.headers.date')}</th>
                <th className='py-2 px-2 text-left w-[80px]'>{tBooking('table.headers.time')}</th>
                <th className='py-2 px-2 text-left w-[120px]'>{tBooking('table.headers.seats')}</th>
                <th className='py-2 px-2 text-left w-[100px]'>{tBooking('table.headers.status')}</th>
                <th className='py-2 px-2 text-left w-[100px] hidden md:table-cell'>{tBooking('table.headers.fare')}</th> 
                <th className='py-2 px-2 text-center hidden md:table-cell'>{tBooking('table.headers.info')}</th>
              </tr>
            </thead>

            <tbody>
              {ve.length > 0 ? (
                ve.map((item: any, index: number) => (
                  <tr key={index} className='bg-[#fff] text-gray-800 border-b text-nowrap'>
                    <td className='py-2 px-2 text-gray-500   '>{item.id}</td>
                    <td className='py-2 px-2 text-[#a7a7a7] hidden md:table-cell'>{item.type}</td>
                    <td className='py-2 px-2 text-[#04b925]'>{t(`${item.diemDi}`, { defaultValue: item.diemdi })}</td>
                    <td className='py-2 px-2 text-[#04b925]'>{t(`${item.diemDen}`, { defaultValue: item.diemden })}</td>
                    <td className='py-2 px-2 text-[#4c4c4c] font-medium'>{item.dateStart}</td>
                    <td className='py-2 px-2 text-[#7337ff] font-mono'>{item.starttime}</td>
                    <td className='py-2 px-2 text-[#04b925]  '>{seats[index].join(', ')} </td>
                    <td className='py-2 px-2'>
                      {item.status === 1 ? (
                        <span
                          className={`px-2 py-1 rounded-full font-bold text-[#00d40e] bg-[#00ff2636] border text-xs`}
                        >
                          {tBooking('status.confirmed')}
                        </span>
                      ) : item.status === 2 ? (
                        <span className={`px-2 py-1 rounded-full font-bold text-[#f00] bg-[#ff000036] border text-xs`}>
                          {tBooking('status.rejected')}
                        </span>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded-full font-bold text-yellow-500 bg-[#d5fb2b2d] border text-xs`}
                        >
                          {tBooking('status.pending')}
                        </span>
                      )}
                    </td>
                    <td className='py-2 px-2 text-[#1645ff] hidden md:table-cell'>
                      {item.price.toLocaleString()} <span className='text-xs'> {tBooking('table.currency')}</span>
                    </td>
                    <td className='py-2 px-2 text-center hidden md:table-cell '>
                      <button
                        onClick={() => {
                          setinformationticket(true)
                          localStorage.setItem('thongtinve', JSON.stringify([ve[index]]))
                        }}
                        className='bg-[#2800c91b] cursor-pointer py-1 px-3 rounded'
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
                  <td colSpan={11} className='text-center text-gray-500 py-4 bg-gray-200'>
                    {tBooking('table.noTickets')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {informationticket && (
        <div>
          <div className='bg-black fixed top-0 left-0 z-100 opacity-30 w-screen h-screen' onClick={isclick}></div>

          <div
            className={` fixed top-1/9  md:w-[600px] left-1/2 transform -translate-x-1/2  rounded z-900
          
          
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
                      {tBooking('ticketDetails.title')}{' '}
                      <p className='font-mono px-2 text-gray-600 text-[10px] max-md:mr-auto max-md:px-0 max-md:py-1 md:text[14px] '>
                        {item.status === 1 ? (
                          <span className={`px-3 py-1 rounded-full text-[#00d40e] bg-[#00ff2636] border-2`}>
                            {tBooking('status.confirmed')}
                          </span>
                        ) : item.status === 2 ? (
                          <span className={`px-3 py-1 rounded-full text-[#f00] bg-[#ff000036] border-2`}>
                            {tBooking('status.rejected')}
                          </span>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-yellow-500 bg-[#d5fb2b2d] border-2`}>
                            {tBooking('status.pending')}
                          </span>
                        )}
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
                    <span className='  text-[11px] md:text-sm text-gray-500'>
                      {tBooking('ticketDetails.ticketCode')}: {item.id}
                    </span>
                    <div>
                      <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-[11px] text-xs text-nowrap font-semibold  '>
                        {' '}
                        <strong>{tBooking('ticketDetails.departureDate')}: </strong>
                        <span className='pl-1'>{item.dateStart}</span>
                      </span>
                    </div>
                  </div>

                  <div className=' text-[13px] md:text-xl font-bold'>
                    {item.type} - {t(item.diemDi)} - {t(item.diemDen)}{' '}
                  </div>
                  <p className='text-[11px] text-gray-500'>
                    {tBooking('ticketDetails.seatLayout')}: {item.seatLayout}
                  </p>

                  <div className='flex justify-between items-center text-center border-t border-b py-2 border-dashed'>
                    <div>
                      <div className='text-[14px] font-medium '>{tBooking('ticketDetails.departureTime')}</div>
                      <div className='text-[13px] md:text-xl font-bold'>{item.starttime}</div>
                      <div className='text-[13px] md:text-sm font-medium'>{t(item.diemDi)}</div>
                    </div>
                    <div>
                      <i className='text-green-600 max-md:text-[13px] border-b pl-4 pr-1'>
                        ...
                        <Icon name='bus-go' />
                      </i>
                      <div className='text-[10px] md:text-xs text-gray-500'>
                        {item.timetogo?.slice(0, 2)} {tBooking('ticketDetails.travelTime')} {item.timetogo?.slice(3, 5)}{' '}
                        {tBooking('ticketDetails.minute')}
                      </div>
                    </div>

                    <div>
                      <div className='text-[14px] font-medium '>{tBooking('ticketDetails.arrivalTime')}</div>
                      <div className='text-[13px] md:text-xl font-bold'>{item.endtime}</div>
                      <div className='text-[13px] md:text-sm font-medium'>{t(item.diemDen)}</div>
                    </div>
                  </div>

                  <div className='bg-gray-100 p-3 rounded-lg text-sm'>
                    <div className='font-semibold max-md:text-[13px] '>{test.fullName || test.name}</div>
                    <div className='text-xs text-gray-600 '>
                      {tBooking('ticketDetails.idNote')}:{' '}
                      <span className='font-normal max-md:text-[12px]'>{test.cccd || ''} </span>{' '}
                    </div>
                    <div className='text-xs text-gray-600 max-md:text-[10px] '> {tBooking('ticketDetails.note')}</div>
                    <div className='mt-2 border-t pt-2 flex justify-between'>
                      <div className=' '>
                        {' '}
                        <strong>{tBooking('ticketDetails.seat')}:</strong>{' '}
                        <span className='text-blue-600 font-medium '>
                          {item.seats.map((s: any) => s.name).join(', ')}
                        </span>{' '}
                      </div>
                      <div className='font-bold text-green-600'>
                        {item.price.toLocaleString()} {tBooking('table.currency')}
                      </div>
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
                transform: translateY(-100%); opacity: 0; 
              }
                100% {
                  transform: translateY(-0); opacity: 1; 
                }
              }
                @keyframes slideUp{
                0% {
                 
                  transform: translateY(0); opacity: 1; 
                }
                100% {
                top: 0;
                  transform: translateY(-100%); opacity: 0;
              }
            `}
          </style>
        </div>
      )}
    </>
  )
}

export default function Bookinghistory() {
  const { t } = useTranslation('Bookinghistory')
  return (
    <>
      <div
        className=' w-full h-50 flex items-center justify-center  '
        style={{ backgroundImage: `url(${backgruond})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000041]  '>
          <h1 className='text-4xl font-bold mb-4 text-[#fff]  '>{t('title')}</h1>
        </div>
      </div>
      <Booking />
    </>
  )
}
