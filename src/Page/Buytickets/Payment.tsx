import backgroundPayment from '../../assets/background.jpg'
import { useParams } from 'react-router-dom'
import QR from '../../assets/QR.jpg'
// import bus from '../../assets/bus.png'
// import logo from '../../assets/logo/Bus_Ticket_Header.png'
// import emailjs from 'emailjs-com'
import { useTranslation } from 'react-i18next'
import Icon from '../../icons/Icon'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserList } from '../../api/userApi'
import { getGuestUserList } from '../../api/guestUserApi'
import { deleteTicketById } from '../../api/ticketsApi'
export default function Payment() {
  const { t: tPayment } = useTranslation('Payment')
  const { t: tHome } = useTranslation('Home')
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  // state
  const [selectePaymen, setselectePaymen] = useState(1)
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  const [isPayingZalo, setIsPayingZalo] = useState(false)
  const [UserList, setUserList] = useState<any[]>([])
  const [GuestUserInfo, setGuestUserList] = useState<any[]>([])
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [loading, setLoading] = useState(true)

  // fetch
  useEffect(() => {
    getGuestUserList()
      .then((response) => {
        setGuestUserList(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching guest user list:', error)
        setLoading(false)
      })
    getUserList()
      .then((response) => {
        setUserList(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching user list:', error)
        setLoading(false)
      })
  }, [])

  const userinfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const ticketList = UserList.map((user: any) => user.ticket).flat()
  const ticket = ticketList.filter((item: any) => item.id === parseInt(id || '0'))
  const guestUserticketList = GuestUserInfo.map((user: any) => user.ticket).flat()
  const guestUserTicket = guestUserticketList.filter((item: any) => item.id === parseInt(id || '0'))
  // const isUserLoggedIn = userinfo.name || userinfo.email
  console.log('userinfo', userinfo)
  console.log('ticket', ticket)
  console.log('guestUserTicket', guestUserTicket)

  // const seats = (userinfo.name ? ticketList : guestUserticketList)
  //   .map((item: any) => item.seats)
  //   .map((item: any) => {
  //     return item.map((seat: any) => seat.name)
  //   })

  const handleExit = () => {
    navigate(`/paymentresult/${id}?status=-49&ticketid=${id}`, { replace: true })
  }

  // //
  const USERID = (userinfo.name ? UserList : GuestUserInfo).find((user: any) =>
    user.ticket?.some((t: any) => t.id === parseInt(id || '0'))
  )

  // //

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

  const handleZaloPay = async () => {
    const price = guestUserTicket[0]?.price || ticket[0]?.price
    const id = guestUserTicket[0]?.id || ticket[0]?.id
    if (price < 1000) {
      alert(tPayment('alerts.zaloPayMin'))
      return
    }
    setIsPaymentLoading(true)
    setIsPayingZalo(true)
    try {
      const res = await fetch('http://localhost:4001/api/zalo/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: price,
          description: `${tPayment('zaloPay.instruction')} ${id} - ${tPayment('zaloPay.username')}: ${USERID.fullName} - ${tPayment('zaloPay.phone')}: ${USERID.phone}`,
          app_user: USERID.email,
          ticketid: id
        })
      })
      const data = await res.json()

      if (data.order_url) {
        window.open(data.order_url, '_blank') // mở trang ZaloPay trong tab mới
      } else {
        setIsPayingZalo(false)
        alert(tPayment('alerts.zaloPayOrderError'))
      }
    } catch (error) {
      setIsPayingZalo(false)

      alert(tPayment('alerts.zaloPayConnectError'))
    } finally {
      setIsPaymentLoading(false)
    }
  }

  // Xóa vé khi người dùng đóng tab hoặc thoát trang
  useEffect(() => {
    const handleUnload = async () => {
      if (!isConfirmed && !isPayingZalo) {
        try {
          await deleteTicketById(Number(id))
          console.log('Vé đã được xóa khi thoát trang')
        } catch (err) {
          console.error('Xóa vé thất bại khi thoát trang:', err)
        }
      }
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [id, isConfirmed, isPayingZalo])

  const handlePayNow = async () => {
    try {
      setIsConfirmed(true)

      alert(tPayment('alerts.paymentSuccess'))
      navigate(`/buytickets`)
    } catch (error) {
      setIsConfirmed(false)

      alert(tPayment('alerts.paymentEmailError'))
    }
  }

  return (
    <>
   { loading ? (
    <div>
     quá trình tải dữ liệu đang diễn ra, vui lòng chờ...
    </div>
    ): 
    (
      <div className='min-h-screen py-10 px-4 flex items-center justify-center bg-gray-100 relative'>
        <div
          className='absolute inset-0 bg-center bg-cover min-h-screen'
          style={{ backgroundImage: `url(${backgroundPayment})` }}
        ></div>
        <div className='absolute inset-0 backdrop-blur-md bg-black/20'></div>
        <div className='max-w-5xl   mx-auto rounded-2xl overflow-hidden shadow-lg bg-[#fff] relative z-10'>
          <div className='bg-green-500 py-4 px-6'>
            <h2 className='text-2xl md:text-3xl font-bold text-[#fff] text-center'>{tPayment('title')}</h2>
          </div>

          <div className='flex flex-col md:flex-row   '>
            <div className='w-full md:w-[600px] p-6 space-y-4  '>
              <strong className='text-gray-800 text-lg md:text-xl block'>{tPayment('journeyInfo')}</strong>
              {userinfo.name
                ? ticket.map((item: any) => {
                    const seatsticket = item.seats.map((s: any) => s.name)

                    return (
                      <div key={item.id} className='bg-[#fff] border rounded-xl p-4 shadow space-y-2'>
                        <div className='flex max-md:flex-col justify-between items-center'>
                          <span className='  text-[11px] md:text-sm text-gray-500'>
                            {tPayment('ticket.code')}: {item.id}
                          </span>
                          <div>
                            <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-[11px] text-xs text-nowrap font-semibold  '>
                              <strong>{tPayment('ticket.departureDate')}: </strong>
                              <span className='pl-1'>{item.dateStart}</span>
                            </span>
                          </div>
                        </div>

                        <div className='text-xl font-bold'>
                          {item.type} - {tHome(item.diemDi)} - {tHome(item.diemDen)}{' '}
                        </div>
                        <p className='text-[11px] text-gray-500'>
                          {tPayment('ticket.seatLayout')}: {item.seatLayout}
                        </p>

                        <div className='flex justify-between items-center text-center border-t border-b py-2 border-dashed'>
                          <div>
                            <div className='text-[14px] font-medium '>{tPayment('ticket.departureTime')}</div>
                            <div className='text-xl font-bold'>{item.starttime}</div>
                            <div className='text-sm font-medium'>{tHome(item.diemDi)}</div>
                          </div>
                          <div>
                            <i className='text-green-600 border-b pl-4 pr-1'>
                              ...
                              <Icon name='bus-go' />
                            </i>
                            <div className='text-xs text-gray-500'>
                              {item.timetogo.slice(0, 2)} {tPayment('ticket.hour')} {item.timetogo.slice(3, 5)}{' '}
                              {tPayment('ticket.minute')}
                              <br />{' '}
                            </div>
                          </div>

                          <div>
                            <div className='text-[14px] font-medium '>{tPayment('ticket.arrivalTime')}</div>
                            <div className='text-xl font-bold'>{item.endtime}</div>
                            <div className='text-sm font-medium'>{tHome(item.diemDen)}</div>
                          </div>
                        </div>

                        {USERID && (
                          <div className='bg-gray-100 p-3 rounded-lg text-sm'>
                            <div className='font-semibold  '>{USERID.fullName}</div>
                            <div className='text-xs text-gray-600'>
                              {tPayment('ticket.idCard')}: {USERID.cccd}
                            </div>
                            <div className='text-xs text-gray-600'>{tPayment('ticket.note')}</div>
                            <div className='mt-2 border-t pt-2 flex justify-between'>
                              <div className='text-green-500'>
                                {tPayment('ticket.seats')}: {seatsticket.join(', ')}{' '}
                              </div>
                              <div className='font-bold text-green-600'>{item.price.toLocaleString()} VNĐ</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })
                : guestUserTicket.map((item: any) => {
                    const seatsticket = item.seats.map((s: any) => s.name)
                    return (
                      <div key={item.id} className='bg-[#fff] border rounded-xl p-4 shadow space-y-2'>
                        <div className='flex max-md:flex-col justify-between items-center'>
                          <span className='  text-[11px] md:text-sm text-gray-500'>
                            {tPayment('ticket.code')}: {item.id} 12312312312
                          </span>
                          <div>
                            <span className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-[11px] text-xs text-nowrap font-semibold  '>
                              <strong>{tPayment('ticket.departureDate')}: </strong>
                              <span className='pl-1'>{item.dateStart}</span>
                            </span>
                          </div>
                        </div>

                        <div className='text-xl font-bold'>
                          {item.type} - {tHome(item.diemDi)} - {tHome(item.diemDen)}{' '}
                        </div>
                        <p className='text-[11px] text-gray-500'>
                          {tPayment('ticket.seatLayout')}: {item.seatLayout}
                        </p>

                        <div className='flex justify-between items-center text-center border-t border-b py-2 border-dashed'>
                          <div>
                            <div className='text-[14px] font-medium '>{tPayment('ticket.departureTime')}</div>
                            <div className='text-xl font-bold'>{item.starttime}</div>
                            <div className='text-sm font-medium'>{tHome(item.diemDi)}</div>
                            <p className='text-[11px] text-gray-500'>{tPayment('ticket.departureTime')}</p>
                          </div>
                          <div>
                            <i className='text-green-600 border-b pl-4 pr-1'>
                              ...
                              <Icon name='bus-go' />
                            </i>
                            <div className='text-xs text-gray-500'>
                              {item.timetogo.slice(0, 2)} {tPayment('ticket.hour')} {item.timetogo.slice(3, 5)}{' '}
                              {tPayment('ticket.minute')}
                              <br />{' '}
                            </div>
                          </div>

                          <div>
                            <div className='text-[14px] font-medium '>{tPayment('ticket.arrivalTime')}</div>
                            <div className='text-xl font-bold'>{item.endtime}</div>
                            <div className='text-sm font-medium'>{tHome(item.diemDen)}</div>
                            <p className='text-[11px] text-gray-500'>{tPayment('ticket.arrivalTime')}</p>
                          </div>
                        </div>

                        {USERID && (
                          <div className='bg-gray-100 p-3 rounded-lg text-sm'>
                            <div className='font-semibold  '>{USERID.fullName}</div>
                            <div className='text-xs text-gray-600'>
                              {tPayment('ticket.idCard')}: {USERID.cccd}
                            </div>
                            <div className='text-xs text-gray-600'>{tPayment('ticket.note')}</div>
                            <div className='mt-2 border-t pt-2 flex justify-between'>
                              <div className='text-green-500'>
                                {tPayment('ticket.seats')}: {seatsticket.join(', ')}{' '}
                              </div>
                              <div className='font-bold text-green-600'>{item.price.toLocaleString()} VNĐ</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}

              <div className='flex justify-center gap-10 pt-4 max-md:justify-between max-md:px-5'>
                {selectePaymen === 1 ? (
                  ''
                ) : (
                  <button
                    className={`bg-green-500 text-[#fff] px-6 py-2 rounded-lg shadow hover:bg-green-600 transition
                  `}
                    onClick={handlePayNow}
                  >
                    {tPayment('actions.confirm')}
                  </button>
                )}
                {selectePaymen === 1 ? (
                  <button
                    className={`bg-red-500 text-[#fff]    px-12 py-2 rounded-lg shadow hover:bg-red-600 transition
                  `}
                    onClick={handleExit}
                  >
                    {tPayment('actions.cancel')}
                  </button>
                ) : (
                  <button
                    className={`bg-red-500 text-[#fff]   px-6 py-2 rounded-lg shadow hover:bg-red-600 transition
                  `}
                    onClick={handleExit}
                  >
                    {tPayment('actions.cancel')}
                  </button>
                )}
              </div>
            </div>

            <div className='w-full   p-4 flex flex-col  md:w-[400px] max-w-[1900]   border-l border-gray-500  '>
              <div className='flex flex-col     '>
                <div className=' gap-2'>
                  <div className='flex justify-between items-center mb-1'>
                    <span className='text-base font-semibold text-gray-800'>
                      {tPayment('paymentOptions.title')}{' '}
                      <i className='text-gray-500 text-sm'>{tPayment('paymentOptions.required')}</i>
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
                          {option.id === 1 && (
                            <>
                              {tPayment('paymentOptions.zaloPay')}
                              <span className='text-[#0068ff] font-semibold'>Zalo</span>
                              <span className='bg-green-500 font-medium text-[#fff] px-1 py-0.5 ml-1 rounded'>Pay</span>
                            </>
                          )}
                          {option.id === 2 && tPayment('paymentOptions.atm')}
                          {option.id === 3 && tPayment('paymentOptions.qr')}
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
                      <div className='flex flex-col gap-3   pb-2  '>
                        <div className='text-lg font-medium'>
                          {tPayment('zaloPay.info')} <span className='text-[#0068ff] font-bold'>Zalo</span>{' '}
                          <span className='  px-1 py-0.5 rounded-md bg-green-500 text-[#fff] '>Pay</span>
                        </div>
                        {USERID && (
                          <>
                            <p className='font-medium text-gray-800'>
                              {tPayment('zaloPay.username')}: {USERID?.fullName}
                            </p>
                            <p className='font-medium text-gray-800'>
                              {tPayment('zaloPay.email')}: {USERID?.email}
                            </p>
                            <p className='font-medium text-gray-800'>
                              {tPayment('zaloPay.phone')}: {USERID?.phone}
                            </p>
                          </>
                        )}
                        <p className='text-sm text-gray-600'>{tPayment('zaloPay.instruction')}</p>

                        {(guestUserTicket[0]?.price || ticket[0]?.price) && (
                          <p className='font-medium text-gray-800  '>
                            {tPayment('zaloPay.amount')}:
                            <span className='font-bold text-red-600'>
                              {' '}
                              {(guestUserTicket[0]?.price || ticket[0]?.price).toLocaleString()} VNĐ
                            </span>
                          </p>
                        )}
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
                              <i>
                                <Icon name='loading' />
                              </i>
                              {tPayment('zaloPay.processing')}
                            </>
                          ) : (
                            tPayment('paymentOptions.zaloPay')
                          )}
                        </button>
                        <p className='mt-3 w-full text-gray-600 text-center text-sm border-t-2 border-gray-400 border-dashed pt-5 leading-5 '>
                          <strong>{tPayment('zaloPay.note')}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    className={`transition-all duration-700 ${selectePaymen === 2 ? 'opacity-100   translate-y-0' : 'opacity-0   translate-y-4 '}`}
                  >
                    {selectePaymen === 2 && (
                      <div className='flex flex-col gap-3 pb-5'>
                        <h2 className='text-xl font-semibold text-gray-800'>{tPayment('atm.info')}</h2>

                        <p className='text-sm text-gray-600'>{tPayment('atm.instruction')}</p>

                        <div className='bg-gray-50 rounded-lg p-4 border border-gray-300'>
                          <p className='font-medium text-gray-800 mb-1'>
                            {tPayment('atm.bank')}: <span className='font-semibold'>{tPayment('atm.bankName')}</span>
                          </p>
                          <p className='font-medium text-gray-800 mb-1'>
                            {tPayment('atm.accountNumber')}: <span className='font-semibold'>1234567890</span>
                          </p>
                          <p className='font-medium text-gray-800  '>
                            {tPayment('atm.amount')}:
                            <span className='font-bold text-red-600'>
                              {' '}
                              {(guestUserTicket[0]?.price || ticket[0]?.price).toLocaleString()} VNĐ
                            </span>
                          </p>
                          <p className='text-sm text-gray-700 mt-1'>
                            <span className='font-medium'>{tPayment('atm.transferContent')}:</span> <br />
                            Số Code - Tên người mua <br />
                            <span className='text-gray-600 italic'>{tPayment('atm.transferExample')}</span>
                          </p>
                        </div>

                        <div className='border-t border-dashed border-gray-400 pt-4 text-sm text-center text-gray-600 leading-5'>
                          <strong>{tPayment('atm.note')}</strong>
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
                          <strong>{tPayment('qr.note')}</strong>
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
    )}
       
    </>
  )
}
