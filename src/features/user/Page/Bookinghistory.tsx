import Icon from '../../../icons/Icon'
import backgruond from '../../../assets/background.jpg'
import { useState  } from 'react'
import { useTranslation } from 'react-i18next'
export function Booking() {
  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

  const currentUser = UserList.find((user: any) => user.id === UserInfo.id) || {}

  const ve = currentUser.ticket || []
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
  const thongtinve = JSON.parse(localStorage.getItem('thongtinve') || '[]')
  const test = UserList.find((user: any) => user.ticket?.some((t: any) => t.id === thongtinve[0]?.id))
  return (
    <>
      <div className='bg-[#fff] px-2 sm:px-4 md:px-10 py-6'>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-sm md:text-[13px]'>
            <thead>
              <tr className='bg-[#1ba000] text-[#fff] text-nowrap'>
                <th className='py-2 px-2 text-left w-[60px]  '>ID</th>
                <th className='py-2 px-2 text-left hidden md:table-cell'>AC / Non-AC</th>
                <th className='py-2 px-2 text-left w-[120px]'>Start</th>
                <th className='py-2 px-2 text-left w-[120px]'>Drop</th>
                <th className='py-2 px-2 text-left w-[100px]'>Date</th>
                <th className='py-2 px-2 text-left w-[80px]'>Time</th>
                <th className='py-2 px-2 text-left w-[120px]'>Seats</th>
                <th className='py-2 px-2 text-left w-[100px]'>Status</th>
                <th className='py-2 px-2 text-left w-[100px] hidden md:table-cell'>Fare</th>
                <th className='py-2 px-2 text-center'>Info</th>
              </tr>
            </thead>

            <tbody>
              {ve.length > 0 ? (
                ve.map((item: any, index: number) => (
                  <tr key={index} className='bg-[#fff] text-gray-800 border-b text-nowrap'>
                    <td className='py-2 px-2 text-gray-500   '>{item.id}</td>
                    <td className='py-2 px-2 text-[#a7a7a7] hidden md:table-cell'>{item.type}</td>
                    <td className='py-2 px-2 text-[#04b925]'>{t(`${item.diemDen}`,{ defaultValue: item.diemdi })}</td>
                    <td className='py-2 px-2 text-[#04b925]'>{t(`${item.diemDi}`,{ defaultValue: item.diemden })}</td>
                    <td className='py-2 px-2 text-[#4c4c4c] font-medium'>{item.dateStart}</td>
                    <td className='py-2 px-2 text-[#7337ff] font-mono'>{item.starttime}</td>
                    <td className='py-2 px-2 text-[#04b925] '>{seats[index].join(', ')} </td>
                    <td className='py-2 px-2'>
                      {Status.map(
                        (status) =>
                          item.status === status.id && (
                            <span
                              key={status.id}
                              className={`px-2 py-1 rounded-full text-[${status.colors}] bg-[${status.bg}] border text-xs`}
                            >
                              {status.name}
                            </span>
                          )
                      )}
                    </td>
                    <td className='py-2 px-2 text-[#1645ff] hidden md:table-cell'>
                      ${item.price} <span className='text-xs'>USD</span>
                    </td>
                    <td className='py-2 px-2 text-center  '>
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
            {thongtinve.map((item: any ) => (
              <div className='  w-150 rounded-3xl py-4 flex flex-col gap-5 divide-y-2 divide-gray-200'>
                <div
                  key={item.id}
                  className='bg-[#fff]   rounded-xl p-4 shadow space-y-2
                  '
                >
                  <div className='flex justify-between px-2 py-2  border-b-2  '>
                    <h1 className='font-extrabold text-gray-600 text-[17px] flex items-center'>
                      Ticket Booking History{' '}
                      <p className='font-mono px-2 text-gray-600 text-[14px] '>
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
                      </p>{' '}
                    </h1>

                    <div className='flex justify-between px-4'></div>
                    <span onClick={isclick}>
                      <i className=' cursor-pointer'>
                        <Icon name='close' />
                      </i>
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-500'>Số vé/code: {item.id}</span>
                    <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold'>
                      Chiều đi
                    </span>
                  </div>

                  <div className='text-xl font-bold'>
                    {item.type} - {t(item.diemDi)} - {t(item.diemDen)}{' '}
                  </div>
                  <p className='text-[11px] text-gray-500'>Sơ đồ ghế: {item.seatLayout}</p>

                  <div className='flex justify-between items-center text-center border-t border-b py-2 border-dashed'>
                    <div>
                      <div className='text-xl font-bold'>{item.starttime}</div>
                      <div className='text-sm font-medium'>{t(item.diemDi)}</div>
                    </div>
                    <div>
                      <i className='text-green-600 border-b pl-4 pr-1'>
                        ...
                        <Icon name='bus-go' />
                      </i>
                      <div className='text-xs text-gray-500'>
                        {item.timetogo?.slice(0, 2)} giờ {item.timetogo?.slice(3, 5)} phút
                      </div>
                    </div>

                    <div>
                      <div className='text-xl font-bold'>{item.endtime}</div>
                      <div className='text-sm font-medium'>{t(item.diemDen)}</div>
                    </div>
                  </div>

                  <div className='bg-gray-100 p-3 rounded-lg text-sm'>
                    <div className='font-semibold  '>{test.fullName || test.name}</div>
                    <div className='text-xs text-gray-600 '>
                      CMND: <span className='font-normal'>{test.cccd || ''} </span>{' '}
                    </div>
                    <div className='text-xs text-gray-600 '> Ghi chú: Mang CMND/Hộ chiếu</div>
                    <div className='mt-2 border-t pt-2 flex justify-between'>
                      <div className=' '>
                        {' '}
                        <strong>Ghế:</strong>{' '}
                        <span className='text-blue-600 font-medium '>
                          {item.seats.map((s: any) => s.name).join(', ')}
                        </span>{' '}
                      </div>
                      <div className='font-bold text-green-600'>{item.price.toLocaleString()}đ</div>
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
  return (
    <>
      <div
        className=' w-full h-50 flex items-center justify-center  '
        style={{ backgroundImage: `url(${backgruond})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000041]  '>
          <h1 className='text-4xl font-bold mb-4 text-[#fff]  '> Booking History</h1>
        </div>
      </div>
      <Booking />
    </>
  )
}
