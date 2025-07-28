import backgroundPayment from '../../assets/background.jpg'
import { useParams } from 'react-router-dom'
import QR from '../../assets/QR.jpg'
import bus from '../../assets/bus.png'
import logo from '../../assets/logo/Bus_Ticket_Header.png'

import { useTranslation } from 'react-i18next'
import Icon from '../../icons/Icon'

export default function Payment() {
  const { t } = useTranslation('Home')
  const { id } = useParams<{ id: string }>()
  const userinfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const ticketList = UserList.map((user: any) => user.ticket).flat()
  const ticket = ticketList.filter((item: any) => item.id === parseInt(id || '0'))
  const GuestUserInfo = JSON.parse(localStorage.getItem('guestUserInfo') || '[]')
  const guestUserticketList = GuestUserInfo.map((user: any) => user.ticket).flat()
  const guestUserTicket = guestUserticketList.filter((item: any) => item.id === parseInt(id || '0'))
  const isUserLoggedIn = userinfo.name || userinfo.email
  // const seats = (userinfo.name ? ticketList : guestUserticketList)
  //   .map((item: any) => item.seats)
  //   .map((item: any) => {
  //     return item.map((seat: any) => seat.name)
  //   })

  const handlePayNow = () => {
    window.location.href = '/buytickets'
  }

  const handleExit = () => {
    const updatedList = (isUserLoggedIn ? UserList : GuestUserInfo).map((user: any) => {
      const Delete = user.ticket?.filter((t: any) => t.id !== parseInt(id || '0'))
      return { ...user, ticket: Delete }
    })
    localStorage.setItem(isUserLoggedIn ? 'userList' : 'guestUserInfo', JSON.stringify(updatedList))
    window.location.href = '/buytickets'
  }

  //
  const USERID = (userinfo.name ? UserList : GuestUserInfo).find((user: any) =>
    user.ticket?.some((t: any) => t.id === parseInt(id || '0'))
  )

  return (
    <div className='min-h-screen py-10 px-4 flex items-center justify-center bg-gray-100 relative'>
      <div
        className='absolute inset-0 bg-center bg-cover min-h-screen'
        style={{ backgroundImage: `url(${backgroundPayment})` }}
      ></div>
      <div className='absolute inset-0 backdrop-blur-md bg-black/20'></div>
      <div className='max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-[#fff] relative z-10'>
        <div className='bg-green-500 py-4 px-6'>
          <h2 className='text-2xl md:text-3xl font-bold text-[#fff] text-center'>Payment Page</h2>
        </div>

        <div className='flex flex-col md:flex-row  '>
          <div className='w-full md:w-2/3 p-6 space-y-4'>
            <div className='flex justify-between items-center mb-4'>
              <img src={logo} alt='Logo' className='w-20 h-20 object-contain' />
              <img src={bus} alt='Bus' className='w-20 h-20 object-contain' />
            </div>

            <strong className='text-gray-800 text-lg md:text-xl block'>Thông tin hành trình</strong>
            {userinfo.name
              ? ticket.map((item: any) => {
                  const seatsticket = item.seats.map((s: any) => s.name)

                  return (
                    <div key={item.id} className='bg-[#fff] border rounded-xl p-4 shadow space-y-2'>
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
                            ...<Icon name='bus-go' />
                          </i>
                          <div className='text-xs text-gray-500'>
                            {item.timetogo.slice(0, 2)} giờ {item.timetogo.slice(3, 5)} phút
                            <br />{' '}
                          </div>
                        </div>

                        <div>
                          <div className='text-xl font-bold'>{item.endtime}</div>
                          <div className='text-sm font-medium'>{t(item.diemDen)}</div>
                        </div>
                      </div>

                      <div className='bg-gray-100 p-3 rounded-lg text-sm'>
                        <div className='font-semibold  '>{USERID.fullName}</div>
                        <div className='text-xs text-gray-600'>CMND: {USERID.cccd}</div>
                        <div className='text-xs text-gray-600'>Ghi chú: Mang CMND/Hộ chiếu</div>
                        <div className='mt-2 border-t pt-2 flex justify-between'>
                          <div className='text-green-500'>Ghế: {seatsticket.join(', ')} </div>
                          <div className='font-bold text-green-600'>{item.price.toLocaleString()}đ</div>
                        </div>
                      </div>
                    </div>
                  )
                })
              : guestUserTicket.map((item: any) => {
                  const seatsticket = item.seats.map((s: any) => s.name)
                  return (
                    <div key={item.id} className='bg-[#fff] border rounded-xl p-4 shadow space-y-2'>
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

                          <p className='text-[11px] text-gray-500'>Giờ khởi hành</p>
                        </div>
                        <div>
                          <i className='text-green-600 border-b pl-4 pr-1'>
                            ...
                            <Icon name='bus-go' />
                          </i>
                          <div className='text-xs text-gray-500'>
                            {item.timetogo.slice(0, 2)} giờ {item.timetogo.slice(3, 5)} phút
                            <br />{' '}
                          </div>
                        </div>

                        <div>
                          <div className='text-xl font-bold'>{item.endtime}</div>
                          <div className='text-sm font-medium'>{t(item.diemDen)}</div>
                          <p className='text-[11px] text-gray-500'>Giờ đến nơi</p>
                        </div>
                      </div>

                      <div className='bg-gray-100 p-3 rounded-lg text-sm'>
                        <div className='font-semibold  '>{USERID.fullName}</div>
                        <div className='text-xs text-gray-600'>CMND: {USERID.cccd}</div>
                        <div className='text-xs text-gray-600'>Ghi chú: Mang CMND/Hộ chiếu</div>
                        <div className='mt-2 border-t pt-2 flex justify-between'>
                          <div className=''>
                            <strong>Ghế:</strong>{' '}
                            <span className='text-gray-600 font-medium '> {seatsticket.join(', ')} </span>
                          </div>
                          <div className='font-bold text-green-600'>{item.price.toLocaleString()}đ</div>
                        </div>
                      </div>
                    </div>
                  )
                })}

            <div className='flex justify-center gap-4 pt-4 max-md:justify-between max-md:px-5'>
              <button
                className='bg-green-500 text-[#fff] px-6 py-2 rounded-lg shadow hover:bg-green-600 transition'
                onClick={handlePayNow}
              >
                Xác nhận
              </button>
              <button
                className='bg-red-500 text-[#fff] px-6 py-2 rounded-lg shadow hover:bg-red-600 transition'
                onClick={handleExit}
              >
                Hủy
              </button>
            </div>
          </div>

          <div className='w-full md:w-1/2 p-4 flex flex-col   h-full border '>
            
          <div className='flex flex-col    '>
            <div className='flex justify-between items-center mb-4'>
               Lựa chọn thanh toán

            </div>
            <div className='flex flex-col items-center '>
               <img src={QR} alt='QR Code' className='w-64 h-64 object-contain mb-4 rounded-lg shadow-lg' />
            <p className='mt-2 text-gray-600 text-center text-sm'>
              Quét mã QR để thanh toán vé xe buýt của bạn. Vui lòng đảm bảo thông tin vé là chính xác trước khi thanh
              toán.
            </p>
            </div>
           
          </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
