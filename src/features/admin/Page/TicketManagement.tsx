import { useState, useEffect } from 'react'
import { ticket } from '../../../Data/Ticket'
import Icon from '../../../icons/Icon'
import { useTranslation } from 'react-i18next'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export default function TicketManagement() {
  const [tickets] = useState(ticket)
  const { t } = useTranslation(['Home', 'Buyticket'])
  // showw thêm vé
  const [isAddticket, setIsAddticket] = useState(false)
  const handleAddTicket = () => {
    setIsAddticket(!isAddticket)
  }
  // show sửa vé
  const [isUpndateticket, setUpdateticket] = useState(false)
  const [isID, setId] = useState<number>(0)
  const handUpdateticket = (id: number) => {
    setUpdateticket(!isUpndateticket)
    setId(id)
  }

  // xóa vé
  const handleDeleteTicket = (id: number) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id)
    console.log('1', updatedTickets)
    console.log('xóa', id)
  }
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  // tự tính thời gian đi dựa vào giờ bắt đầu và kết thúc không có dấu - phía trước nếu âm thì chuyển thành dương  tính thời gian để đến
  const Timegoto = () => {
    if (startTime && endTime) {
      const start = new Date(startTime)
      const end = new Date(endTime)
      const diff = end.getTime() - start.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      return `${Math.abs(hours)}h ${Math.abs(minutes)}m`
    }
    return '00h 00m'
  }
  const [selectedSeats, setSelectedSeats] = useState<number>(0)

  const handleSeatChange = (e: any) => {
    setSelectedSeats(Number(e.target.value))
  }
  // hàm đếm vé ticket
  const countticket = tickets.length

  // hàm value test
  const ticketss = JSON.parse(localStorage.getItem('ticketstest') || '[]')
  const [namevalua, setnameValue] = useState(ticketss[1]?.name || 'hi')
  const hanldname = (e: any) => {
    setnameValue(e.target.value)
  }
  const saveticketss = () => {
    const updatedTicketss = {
      name: namevalua
    }

    const ticketss: (typeof updatedTicketss)[] = JSON.parse(localStorage.getItem('ticketstest') || '[]')

    const index = ticketss.findIndex((ticket) => ticket.name === updatedTicketss.name)

    if (index !== -1) {
      ticketss[index] = updatedTicketss // Cập nhật nếu đã có
    } else {
      ticketss.push(updatedTicketss) // Thêm mới nếu chưa có
    }

    localStorage.setItem('ticketstest', JSON.stringify(ticketss))

    window.alert('Thông tin đã được cập nhật!')
  }

  return (
    <div className='p-4  w-full space-y-4'>
      <div className='py-3 flex justify-between px-3 items-center text-center w-full shadow-md bg-[#fff] rounded-lg '>
        <div className='flex items-center gap-2'>
          <h1 className='text-1xl items-center text-nowrap sm:text-3xl  font-bold text-gray-700'>Quản lý vé</h1>
          <div className='   flex justify-between px-2 items-center  w-10  sm:w-30 h-full rounded-lg bg-blue-500 shadow-md'>
            <i className='   text-[10px] sm:text-4xl text-[#fff]/20'>
              <Icon name='ticket' />
            </i>
            <div className='flex flex-col text-[#fff]  '>
              <span className='font-bold text-[12px] sm:text-2xl'>{countticket}</span>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <button
            onClick={handleAddTicket}
            className=' max-sm:text-nowrap max-sm:text-[12px] cursor-pointer bg-blue-500 text-[#fff] px-1  sm:px-4 sm:py-2 rounded-md hover:bg-blue-600 transition-colors'
          >
            Thêm vé
          </button>
        </div>
      </div>
      {tickets.map((item) => {
        const diemdi = t(`Home:${item.diemdi}`)
        const diemden = t(`Home:${item.diemden}`)
        const name = `${item.type} - ${diemdi} - ${diemden}`

        return (
          <div key={item.id} className='border-1 rounded-xl bg-[#fff] shadow-md overflow-hidden'>
            <div className='flex flex-col lg:flex-row  p-5 gap-4'>
              <div className='flex-1 space-y-1 '>
                <h1 className='text-base lg:text-lg font-semibold  '>{name}</h1>
                <p className='text-[11px] text-gray-500'>Sơ đồ ghế: {item.seatLayout}</p>
                <p className='text-amber-400 text-sm flex items-center gap-1 mt-1'>
                  <Icon name='bus' /> {item.type}
                </p>
              </div>

              {/* Giữa: Thời gian */}
              <div className='flex items-center justify-between w-full lg:w-auto lg:gap-8 text-sm'>
                <div className='text-center'>
                  <p className='text-nowrap'>{item.starttime}</p>
                  <p className='text-[11px] text-gray-500'>{t(`Home:${item.diemdi}`)}</p>
                </div>
                <div className='text-center'>
                  <i className='text-green-600'>
                    <Icon name='arrow-right' />
                  </i>
                  <p className='text-[11px] text-gray-500'>{item.timetogo}</p>
                </div>
                <div className='text-center'>
                  <p className='text-nowrap'>{item.endtime}</p>
                  <p className='text-[11px] text-gray-500'>{t(`Home:${item.diemden}`)}</p>
                </div>
              </div>

              <div className='flex flex-col items-end gap-2 lg:pl-4 w-full lg:w-auto'>
                <p className='text-[11px] text-nowrap'>
                  {t('off_day')}:{' '}
                  <span className='ml-1 bg-blue-200 text-blue-800 border border-blue-400 px-2 py-1 rounded-full'>
                    {item.offday}
                  </span>
                </p>
                <div className=' max-lg:hidden flex gap-2'>
                  <button
                    onClick={() => handUpdateticket(item.id)}
                    className='bg-yellow-500 text-[#fff] px-3 py-1 rounded-md text-sm hover:bg-yellow-600 cursor-pointer'
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => handleDeleteTicket(item.id)}
                    className='bg-red-500 text-[#fff] px-3 py-1 rounded-md text-sm hover:bg-red-600 cursor-pointer'
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>

            <div className='border-t border-gray-200 px-4 py-2 text-sm flex flex-wrap gap-2 items-center'>
              <p className='text-gray-500'>{t('Home:facilities')}:</p>
              {item.facilities.map((facility, index) => (
                <span key={index} className='bg-gray-100 px-2 py-1 rounded-full text-gray-700 text-xs'>
                  {facility}
                </span>
              ))}
            </div>
            {/* Responsive mobile nút cập nhật + xóa */}
            <div className='lg:hidden border-t px-5 py-3 flex justify-between items-center bg-gray-50'>
              <button
                onClick={() => handUpdateticket(item.id)}
                className='bg-yellow-500 text-[#fff] px-3 py-1 rounded-md text-sm hover:bg-yellow-600 cursor-pointer'
              >
                Cập nhật
              </button>
              <button
                onClick={() => handleDeleteTicket(item.id)}
                className='bg-red-500 text-[#fff] px-3 py-1 rounded-md text-sm hover:bg-red-600 cursor-pointer'
              >
                Xóa
              </button>
            </div>
          </div>
        )
      })}

      {isAddticket && (
        <div>
          <div
            className='bg-black fixed top-0 left-0 z-100 opacity-50 w-screen h-screen'
            onClick={handleAddTicket}
          ></div>
          <div
            className={` fixed top-1/35   left-1/2 transform -translate-x-1/2  rounded z-900`}
            style={{
              animation: isAddticket ? 'slideDown 0.3s ease' : 'slideUp 0.3s ease'
            }}
          >
            <div className='bg-[#fff]  w-300  rounded-3xl p-6 flex flex-col gap-5'>
              <h2 className='text-xl font-semibold'>Thêm vé mới</h2>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className='flex'>
                  <div className='grid grid-cols-3 w-4/6   gap-4 p-6 bg-[#fff] rounded-xl shadow-md  '>
                    {/* Điểm xuất phát */}
                    <div className='flex flex-col'>
                      <label htmlFor='diemdi' className='font-medium text-gray-700 mb-1'>
                        Điểm xuất phát
                      </label>
                      <input
                        id='diemdi'
                        name='diemdi'
                        value={namevalua}
                        onChange={hanldname}
                        className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Nhập điểm xuất phát'
                      />
                    </div>
                    {/* Điểm đến */}
                    <div className='flex flex-col'>
                      <label htmlFor='diemden' className='font-medium text-gray-700 mb-1'>
                        Điểm đến
                      </label>
                      <input
                        id='diemden'
                        name='diemden'
                        value={namevalua}
                        onChange={hanldname}
                        className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Nhập điểm đến'
                      />
                    </div>

                    {/* Sơ đồ ghế */}
                    <div className='flex flex-col'>
                      <label htmlFor='seatLayout' className='font-medium text-gray-700 mb-1'>
                        Sơ đồ ghế
                      </label>
                      <select
                        name='seatLayout'
                        className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      >
                        <option value='Monday'>2x2</option>
                        <option value='Tuesday'>4x4</option>
                      </select>
                    </div>

                    {/* Loại xe */}
                    <div className='flex flex-col'>
                      <label htmlFor='type' className='font-medium text-gray-700 mb-1'>
                        Loại xe
                      </label>
                      <select
                        name='type'
                        className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      >
                        <option value='AC'>AC</option>
                        <option value='Non-AC'>Non-AC</option>
                      </select>
                    </div>

                    {/* Ngày nghỉ */}
                    <div className='flex flex-col'>
                      <label htmlFor='offday' className='font-medium text-gray-700 mb-1'>
                        Ngày nghỉ
                      </label>
                      <select
                        name='offday'
                        className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      >
                        <option value='Monday'>Monday</option>
                        <option value='Tuesday'>Tuesday</option>
                        <option value='Wednesday'>Wednesday</option>
                        <option value='Thursday'>Thursday</option>
                        <option value='Friday'>Friday</option>
                        <option value='Saturday'>Saturday</option>
                        <option value='Sunday'>Sunday</option>
                      </select>
                    </div>
                    {/* Thời gian đi */}
                    <div className='flex flex-col'>
                      <label htmlFor='timetogo' className='font-medium text-gray-700 mb-1'>
                        Thời gian đi
                      </label>
                      <input
                        name='timetogo'
                        className='p-2 rounded border border-gray-300 bg-gray-100'
                        value={Timegoto()}
                        readOnly
                      />
                    </div>
                    {/* Thời gian bắt đầu */}
                    <div className='flex flex-col'>
                      <label className='font-medium text-gray-700 mb-1'>Giờ bắt đầu</label>
                      <TimePicker
                        className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                        value={startTime}
                        onChange={setStartTime}
                      />
                    </div>

                    {/* Thời gian kết thúc */}
                    <div className='flex flex-col'>
                      <label className='font-medium text-gray-700 mb-1'>Giờ kết thúc</label>
                      <TimePicker value={endTime} onChange={setEndTime} />
                    </div>
                  </div>

                  <div className='w-2/6 h-100 mx-2 p-6 bg-[#fff] rounded-xl shadow-md '>
                    <div className='flex justify-between items-center   gap-4 mb-4'>
                      <span className='font-medium text-gray-700 mb-1'> Ghế</span>
                      <div className='flex   font-medium text-[13px] gap-2 mr-2'>
                        <label className='flex items-center gap-1 '>
                          <input name='seat' type='radio' value='8' onClick={handleSeatChange} /> 8
                        </label>
                        <label className='flex items-center gap-1'>
                          <input name='seat' type='radio' value='36' onClick={handleSeatChange} />
                          36
                        </label>
                        <label className='flex items-center gap-1'>
                          <input name='seat' type='radio' value='38' onClick={handleSeatChange} /> 38
                        </label>
                        <label className='flex items-center gap-1'>
                          <input name='seat' type='radio' value='56' onClick={handleSeatChange} /> 56
                        </label>
                        <label className='flex items-center gap-1'>
                          <input name='seat' type='radio' value='60' onClick={handleSeatChange} /> 60
                        </label>
                      </div>
                    </div>
                    <div className='  border-1 border-gray-500 rounded-[10px] p-2'>
                      <div className='flex justify-center mt-[-18px] items-center gap-2'>
                        <p className=' bg-gray-300 px-5   text-[12px] text-gray-500 '>{t('Buyticket:front')}</p>
                      </div>
                      <div>
                        <div className='flex text-[16px] text-gray-600 justify-between items-center gap-2 px-5'>
                          <h1 className=' font-medium'>{t('Buyticket:seat')}</h1>
                          <i className=''>
                            {' '}
                            <Icon name='seat' />
                          </i>
                        </div>
                        <div className='  py-5  overflow-y-auto h-[250px]'>
                          <div className='grid grid-cols-4 gap-2'>
                            {Array.from({ length: selectedSeats }).map((_, index) => (
                              <div
                                key={index}
                                className='w-10 h-12 flex flex-col items-center justify-center border border-gray-400 rounded hover:bg-green-500 hover:text-[#fff] transition cursor-pointer'
                              >
                                <span className='text-sm font-medium'>{index + 1}</span>
                                <div className='bg-gray-300 h-1 w-6 rounded-full mt-1'></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-center mb-[-17px] items-center gap-2'>
                        <p className=' bg-gray-300 px-5 text-[12px] text-gray-500 '>{t('Buyticket:rear')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </LocalizationProvider>

              <div className='flex flex-wrap gap-4 text-sm'>
                <label className='flex items-center gap-2'>
                  <input type='checkbox' value='Water Bottle' /> Nước suối
                </label>
                <label className='flex items-center gap-2'>
                  <input type='checkbox' value='Pillow' /> Gối
                </label>
                <label className='flex items-center gap-2'>
                  <input type='checkbox' value='Wifi' /> Wifi
                </label>
              </div>

              <div className='flex justify-end gap-2 pt-4 border-t border-gray-200'>
                <button
                  onClick={saveticketss}
                  className='bg-blue-600 text-[#fff] px-4 py-2 rounded-md hover:bg-blue-700'
                >
                  Lưu
                </button>
                <button
                  onClick={handleAddTicket}
                  className='bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400'
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
          <style>
            {`  
              @keyframes slideDown{
              0% {
              top: 0;
                  opacity: 0; 
              }
                100% {
                  opacity: 1; 
                }
              }
                @keyframes slideUp{
                0% {
                  top: 0;
                   opacity: 1; 
                }
                100% {
                   opacity: 0;
              }
            `}
          </style>
        </div>
      )}
      {isUpndateticket && (
        <div>
          {tickets.map((item) => {
            const ticketUpdate = tickets.filter((item) => item.id === isID)
            const seat = ticketUpdate.map((item) => item.seat)
            const countseat = seat[0].length

            return (
              <div key={item.id}>
                <div
                  key={item.id}
                  className='bg-black fixed top-0 left-0 z-100 opacity-5 w-screen h-screen'
                  onClick={() => {
                    handUpdateticket(item.id)
                  }}
                ></div>
                <div
                  className={` fixed top-1/35   left-1/2 transform -translate-x-1/2  rounded z-900`}
                  style={{
                    animation: isUpndateticket ? 'slideDown 0.4s ease' : 'slideUp 0.4s ease'
                  }}
                >
                  <div className='bg-[#fff]  w-300  rounded-3xl p-6 flex flex-col gap-5'>
                    <h2 className='text-xl font-semibold'>Cập nhật</h2>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <div className='flex'>
                        <div className='grid grid-cols-3 w-4/6   gap-4 p-6 bg-[#fff] rounded-xl shadow-md  '>
                          {/* Điểm xuất phát */}
                          <div className='flex flex-col'>
                            <label htmlFor='diemdi' className='font-medium text-gray-700 mb-1'>
                              Điểm xuất phát
                            </label>
                            <input
                              id='diemdi'
                              name='diemdi'
                              value={namevalua}
                              onChange={hanldname}
                              className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                              placeholder='Nhập điểm xuất phát'
                            />
                          </div>
                          {/* Điểm đến */}
                          <div className='flex flex-col'>
                            <label htmlFor='diemden' className='font-medium text-gray-700 mb-1'>
                              Điểm đến
                            </label>
                            <input
                              id='diemden'
                              name='diemden'
                              className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                              placeholder='Nhập điểm đến'
                            />
                          </div>

                          {/* Sơ đồ ghế */}
                          <div className='flex flex-col'>
                            <label htmlFor='seatLayout' className='font-medium text-gray-700 mb-1'>
                              Sơ đồ ghế
                            </label>
                            <select
                              name='seatLayout'
                              className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            >
                              <option value='Monday'>2x2</option>
                              <option value='Tuesday'>4x4</option>
                            </select>
                          </div>

                          {/* Loại xe */}
                          <div className='flex flex-col'>
                            <label htmlFor='type' className='font-medium text-gray-700 mb-1'>
                              Loại xe
                            </label>
                            <select
                              name='type'
                              className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            >
                              <option value='AC'>AC</option>
                              <option value='Non-AC'>Non-AC</option>
                            </select>
                          </div>

                          {/* Ngày nghỉ */}
                          <div className='flex flex-col'>
                            <label htmlFor='offday' className='font-medium text-gray-700 mb-1'>
                              Ngày nghỉ
                            </label>
                            <select
                              name='offday'
                              className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            >
                              <option value='Monday'>Monday</option>
                              <option value='Tuesday'>Tuesday</option>
                              <option value='Wednesday'>Wednesday</option>
                              <option value='Thursday'>Thursday</option>
                              <option value='Friday'>Friday</option>
                              <option value='Saturday'>Saturday</option>
                              <option value='Sunday'>Sunday</option>
                            </select>
                          </div>
                          {/* Thời gian đi */}
                          <div className='flex flex-col'>
                            <label htmlFor='timetogo' className='font-medium text-gray-700 mb-1'>
                              Thời gian đi
                            </label>
                            <input
                              name='timetogo'
                              className='p-2 rounded border border-gray-300 bg-gray-100'
                              value={Timegoto()}
                              readOnly
                            />
                          </div>
                          {/* Thời gian bắt đầu */}
                          <div className='flex flex-col'>
                            <label className='font-medium text-gray-700 mb-1'>Giờ bắt đầu</label>
                            <TimePicker
                              className='p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                              value={startTime}
                              onChange={setStartTime}
                            />
                          </div>

                          {/* Thời gian kết thúc */}
                          <div className='flex flex-col'>
                            <label className='font-medium text-gray-700 mb-1'>Giờ kết thúc</label>
                            <TimePicker value={endTime} onChange={setEndTime} />
                          </div>
                        </div>

                        <div className='w-2/6 h-100 mx-2 p-6 bg-[#fff] rounded-xl shadow-md '>
                          <div className='flex justify-between items-center   gap-4 mb-4'>
                            <span className='font-medium text-gray-700 mb-1'> Ghế</span>
                            <div className='flex   font-medium text-[13px] gap-2 mr-2'>
                              <label className='flex items-center gap-1 '>{countseat}</label>
                            </div>
                          </div>
                          <div className='  border-1 border-gray-500 rounded-[10px] p-2'>
                            <div className='flex justify-center mt-[-18px] items-center gap-2'>
                              <p className=' bg-gray-300 px-5   text-[12px] text-gray-500 '>{t('Buyticket:front')}</p>
                            </div>
                            <div>
                              <div className='flex text-[16px] text-gray-600 justify-between items-center gap-2 px-5'>
                                <h1 className=' font-medium'>{t('Buyticket:seat')}</h1>
                                <i className=''>
                                  {' '}
                                  <Icon name='seat' />
                                </i>
                              </div>
                              <div className='  py-5  overflow-y-auto h-[250px]'>
                                <div className='grid grid-cols-4 gap-2'>
                                  {Array.from({ length: countseat }).map((_, index) => (
                                    <div
                                      key={index}
                                      className='w-10 h-12 flex flex-col items-center justify-center border border-gray-400 rounded hover:bg-green-500 hover:text-[#fff] transition cursor-pointer'
                                    >
                                      <span className='text-sm font-medium'>{index + 1}</span>
                                      <div className='bg-gray-300 h-1 w-6 rounded-full mt-1'></div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className='flex justify-center mb-[-17px] items-center gap-2'>
                              <p className=' bg-gray-300 px-5 text-[12px] text-gray-500 '>{t('Buyticket:rear')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </LocalizationProvider>

                    <div className='flex flex-wrap gap-4 text-sm'>
                      <label className='flex items-center gap-2'>
                        <input type='checkbox' value='Water Bottle' /> Nước suối
                      </label>
                      <label className='flex items-center gap-2'>
                        <input type='checkbox' value='Pillow' /> Gối
                      </label>
                      <label className='flex items-center gap-2'>
                        <input type='checkbox' value='Wifi' /> Wifi
                      </label>
                    </div>

                    <div className='flex justify-end gap-2 pt-4 border-t border-gray-200'>
                      <button className='bg-blue-600 text-[#fff] px-4 py-2 rounded-md hover:bg-blue-700'>Lưu</button>
                      <button
                        onClick={() => {
                          handUpdateticket(item.id)
                        }}
                        className='bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400'
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
                <style>
                  {`  
              @keyframes slideDown{
              0% {
              top: 0;
               ; opacity: 0; 
              }
                100% {
                   opacity: 1; 
                }
              }
                @keyframes slideUp{
                0% {
                   
                   opacity: 1; 
                }
                  
                100% {
                
                    opacity: 0;
              }
            `}
                </style>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
