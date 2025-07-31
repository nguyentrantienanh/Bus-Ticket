import backgroundPayment from '../../assets/background.jpg'
import { useParams } from 'react-router-dom'
import QR from '../../assets/QR.jpg'
import bus from '../../assets/bus.png'
import logo from '../../assets/logo/Bus_Ticket_Header.png'

import { useTranslation } from 'react-i18next'
import Icon from '../../icons/Icon'
import { useState } from 'react'

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
  //
  const [selectePaymen, setselectePaymen] = useState(1)
  const paymentOptions = [
    {
      id: 1,
      name: 'ZaloPay',
      label: (
        <>
          Ví <span className='text-[#0068ff] font-semibold'>Zalo</span>
          <span className='bg-green-500 font-medium text-[#fff] px-1 py-0.5 ml-1 rounded'>Pay</span>
        </>
      )
    },
    {
      id: 2,
      name: 'ATM',
      label: 'Thẻ ATM '
    },
    {
      id: 3,
      name: 'QR',
      label: 'Quét mã QR'
    }
  ]
const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  // xử lý thanh toán zaloPay
  const handleZaloPay = async () => {
    const price = guestUserTicket[0]?.price || ticket[0]?.price
    if (price < 1000) {
      alert('Giá vé phải lớn hơn 1000đ để thanh toán qua ZaloPay.')
      return
    }
      setIsPaymentLoading(true)
    try {
      const res = await fetch('http://localhost:4001/api/zalo/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: price,
          description: `Thanh toán vé xe-họ và tên: ${USERID.fullName}-SĐT: ${USERID.phone}`,
          app_user: USERID.email,
          ticketId: ticket[0]?.id || guestUserTicket[0]?.id
        })
      })
      const data = await res.json()

      if (data.order_url) {
        window.open(data.order_url, '_blank') // mở trang ZaloPay trong tab mới
      } else {
        alert('Không thể tạo đơn hàng ZaloPay. Vui lòng thử lại.')
      }
    } catch (error) {
      console.error('ZaloPay Error:', error)
      alert('Lỗi khi kết nối với ZaloPay.')
    } finally {
      setIsPaymentLoading(false)
    }
  }

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

        <div className='flex flex-col md:flex-row   '>
          <div className='w-full md:w-[600px] p-6 space-y-4  '>
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
                          <div className='font-bold text-green-600'>{item.price.toLocaleString()} vnđ</div>
                        </div>
                      </div>
                    </div>
                  )
                })}

            <div className='flex justify-center gap-4 pt-4 max-md:justify-between max-md:px-5'>
              <button
                className={`bg-green-500 text-[#fff] px-6 py-2 rounded-lg shadow hover:bg-green-600 transition
               
                  `}
                onClick={handlePayNow}
              >
                Xác nhận
              </button>
              <button
                className={`bg-red-500 text-[#fff]   px-6 py-2 rounded-lg shadow hover:bg-red-600 transition
               
                  `}
                onClick={handleExit}
              >
                Hủy
              </button>
            </div>
          </div>

          <div className='w-full   p-4 flex flex-col  md:w-[400px] max-w-[1900]   border-l border-gray-500  '>
            <div className='flex flex-col     '>
              <div className=' gap-2'>
                <div className='flex justify-between items-center mb-1'>
                  <span className='text-base font-semibold text-gray-800'>
                    Lựa chọn thanh toán <i className='text-gray-500 text-sm'>(bắt buộc)</i>
                  </span>
                </div>
                <div className='mb-3 border-b-2 border-gray-400 border-dashed pb-3'>
                  {paymentOptions.map((option) => (
                    <label key={option.id} className='flex items-center cursor-pointer text-gray-700 mb-1'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value={option.id}
                        checked={selectePaymen === option.id}
                        onChange={() => setselectePaymen(option.id)}
                        className={`accent-blue-600 w-5 h-5 mr-3 cursor-pointer transition-all duration-700 ${selectePaymen === option.id ? 'text-black opacity-100' : 'text-gray-500 opacity-70'} `}
                      />
                      <span
                        className={` transition-all duration-700 ${selectePaymen === option.id ? 'text-black opacity-100' : 'text-gray-500 opacity-70'}`}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div
                className={`flex flex-col items-center  transition-all duration-700 ${selectePaymen === selectePaymen ? 'text-black opacity-100' : 'text-gray-500 opacity-70'} `}
              >
                <div
                  className={`transition-all duration-700 ${selectePaymen === 1 ? 'opacity-100   translate-y-0' : 'opacity-0   translate-y-4 '}`}
                >
                  {selectePaymen === 1 && (
                    <div className='flex flex-col gap-3   pb-5  '>
                      <div className='text-lg font-medium'>
                        Thông tin thanh toán qua <span className='text-[#0068ff] font-bold'>Zalo</span>{' '}
                        <span className='  px-1 py-0.5 rounded-md bg-green-500 text-[#fff] '>Pay</span>
                      </div>
                      <p className='font-medium text-gray-800'>Tên người dùng: {USERID.fullName}</p>
                      <p className='font-medium text-gray-800'>Email: {USERID.email}</p>
                      <p className='font-medium text-gray-800'>Số điện thoại: {USERID.phone}</p>
                      <p className='text-sm text-gray-600'>
                        Vui lòng thanh toán số tiền dưới đây để hoàn tất giao dịch:
                      </p>
                      <p className='font-medium text-gray-800  '>
                        Số tiền cần thanh toán:{' '}
                        <span className='font-bold text-red-600'>
                          {' '}
                          {(guestUserTicket[0]?.price || ticket[0]?.price).toLocaleString()} vnđ
                        </span>
                      </p>
                      <button
                        onClick={handleZaloPay}
                         disabled={isPaymentLoading}
                       className={`px-4 py-2 rounded-lg shadow transition flex items-center justify-center gap-2 ${
    isPaymentLoading 
      ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
      : 'bg-green-500 text-[#fff] cursor-pointer hover:bg-green-600'
  }`}
                      >  
                       {isPaymentLoading ? (
    <>
    <i  >
      <Icon name='loading'   />
    </i>
      
      Đang xử lý...
    </>
  ) : (
    'Thanh toán qua ZaloPay'
  )}

                      </button>
                      <p className='mt-3 w-full text-gray-600 text-center text-sm border-t-2 border-gray-400 border-dashed pt-5 leading-5 '>
                        <strong>Chú ý:</strong> Thanh toán qua ZaloPay sẽ được xử lý ngay lập tức. Vui lòng đảm bảo
                        thông tin vé là chính xác trước khi thanh toán.
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className={`transition-all duration-700 ${selectePaymen === 2 ? 'opacity-100   translate-y-0' : 'opacity-0   translate-y-4 '}`}
                >
                  {selectePaymen === 2 && (
                    <div className='flex flex-col gap-3 pb-5'>
                      <h2 className='text-xl font-semibold text-gray-800'>Thông tin chuyển khoản ngân hàng</h2>

                      <p className='text-sm text-gray-600'>Vui lòng chuyển khoản đến tài khoản ngân hàng sau:</p>

                      <div className='bg-gray-50 rounded-lg p-4 border border-gray-300'>
                        <p className='font-medium text-gray-800 mb-1'>
                          Ngân hàng: <span className='font-semibold'>VCB Bank</span>
                        </p>
                        <p className='font-medium text-gray-800 mb-1'>
                          Số tài khoản: <span className='font-semibold'>1234567890</span>
                        </p>
                        <p className='font-medium text-gray-800  '>
                          Số tiền cần thanh toán:{' '}
                          <span className='font-bold text-red-600'>
                            {' '}
                            {(guestUserTicket[0]?.price || ticket[0]?.price).toLocaleString()} vnđ
                          </span>
                        </p>
                        <p className='text-sm text-gray-700 mt-1'>
                          <span className='font-medium'>Nội dung chuyển khoản:</span> <br />
                          Số Code - Tên người mua <br />
                          <span className='text-gray-600 italic'>Ví dụ: 12345 - Nguyễn Văn A</span>
                        </p>
                      </div>

                      <div className='border-t border-dashed border-gray-400 pt-4 text-sm text-center text-gray-600 leading-5'>
                        <strong>Chú ý:</strong> Sau khi chuyển khoản, vui lòng xác nhận lại thông tin vé xe buýt của
                        bạn. Hãy đảm bảo mọi thông tin đều chính xác trước khi thanh toán.
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`transition-all duration-700 ${selectePaymen === 3 ? 'opacity-100   translate-y-0' : 'opacity-0   translate-y-4 '}`}
                >
                  {selectePaymen === 3 && (
                    <div className='flex flex-col items-center'>
                      <img src={QR} alt='QR Code' className='w-64 h-64 object-contain mb-4 rounded-lg shadow-lg' />
                      <p className='mt-3 border-t border-dashed border-gray-400 text-gray-600 text-center text-sm   pt-5  leading-5  '>
                        <strong>Chú ý:</strong> Quét mã QR để thanh toán. Vui lòng đảm bảo thông tin vé là chính xác
                        trước khi thanh toán.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
