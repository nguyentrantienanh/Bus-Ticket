import backgroundBuyticket from '../../assets/background.jpg'
import { useTranslation } from 'react-i18next'
import Icon from '../../icons/Icon'
import { useState, useEffect, useRef } from 'react'
import { ticket } from '../../Data/Ticket'
import { Link } from 'react-router-dom'
import { useLocation } from '../../Data/Location'
import vi from 'date-fns/locale/vi'
import { format } from 'date-fns'
import { parse, isAfter } from 'date-fns'
import { Calendar } from 'react-date-range'

function BuyticketLayout() {
  // Ví dụ sử dụng

  const { t } = useTranslation(['Buyticket', 'Home'])
  const { diemDi, diemDen } = useLocation()
  const Vehicle = [
    { id: 1, name: 'Bus' },
    { id: 2, name: 'Minibus' },
    { id: 3, name: 'AC' }
  ]
  const Routes = [
    { id: 1, diemDi: t('Home:Home_location.Ha Noi'), diemDen: t('Home:Home_location.Phu Quoc') },
    { id: 2, diemDi: t('Home:Home_location.Ha Noi'), diemDen: t('Home:Home_location.Da Nang') },
    { id: 3, diemDi: t('Home:Home_location.Da Lat'), diemDen: t('Home:Home_location.Nha Trang') }
  ]

  const Schedules = [
    { id: 1, starttime: '08:00 AM', endtime: '04:30 PM' },
    { id: 2, starttime: '09:00 AM', endtime: '05:30 PM' },
    { id: 3, starttime: '10:00 AM', endtime: '06:30 PM' }
  ]

  const [selectedDiemDen, setSelectedDiemDen] = useState('')
  const [selectedDiemDi, setSelectedDiemDi] = useState('')
  const [showDiemDenDropdown, setShowDiemDenDropdown] = useState(false)
  const [showDiemDiDropdown, setShowDiemDiDropdown] = useState(false)

  const handleSeach = (e: any) => {
    e.preventDefault()
    // lưu điểm đi và điểm đến vào localStorage và calendar c
    const searchData = {
      diemDi: selectedDiemDi,
      diemDen: selectedDiemDen,
      idDiemDi: diemDi.find((item) => item.name === selectedDiemDi)?.id,
      idDiemDen: diemDen.find((item) => item.name === selectedDiemDen)?.id
    }
    localStorage.setItem('searchData', JSON.stringify(searchData))
  }

  // hiện thị diem Di và diemDen từ localStorage thế vào selectDiemDi và selectDiemDen
  useEffect(() => {
    const searchData = JSON.parse(localStorage.getItem('searchData') || '{}')
    if (searchData.diemDi) {
      setSelectedDiemDi(searchData.diemDi)
    }
    if (searchData.diemDen) {
      setSelectedDiemDen(searchData.diemDen)
    }
  }, [])
  const [filterData, setFilterData] = useState<{ [key: string]: boolean }>({})
  //checkbox filter và lưu vào localStorage
  const handleChange = (event: any) => {
    const { name, checked } = event.target
    const filterData = JSON.parse(localStorage.getItem('filterData') || '{}')
    if (checked) {
      filterData[name] = true
    } else {
      delete filterData[name]
    }
    localStorage.setItem('filterData', JSON.stringify(filterData))
    setFilterData(filterData)
  }

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được mount
    const filterData = JSON.parse(localStorage.getItem('filterData') || '{}')

    // Set trạng thái checkbox dựa trên dữ liệu từ localStorage
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox: any) => {
      checkbox.checked = filterData[checkbox.name] || false
    })
  }, [])

  // hiện Ngày đã chọn trong localStorage calendar
  const [calendar, setCalendar] = useState(() => {
    const savedDate = localStorage.getItem('DayData')
    return savedDate ? savedDate : format(new Date(), 'dd/MM/yyyy')
  })
  const [open, setOpen] = useState(false)
  // Hàm này sẽ được gọi khi người dùng nhấn phím Esc
  const anKhiNhanESC = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false)
    }
  }
  const refCalendar = useRef<HTMLDivElement | null>(null)
  // Ẩn calendar khi click ra ngoài
  const anKhiNhanbenNgoai = (event: any) => {
    if (refCalendar.current && !refCalendar.current.contains(event.target)) {
      setOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', anKhiNhanbenNgoai, true)
    window.addEventListener('keydown', anKhiNhanESC)
  }, [])
  // lưu ngày đã chọn vào localStorage theo dạng chu "dd/MM/yyyy"
  useEffect(() => {
    localStorage.setItem('DayData', calendar)
  }, [calendar])
  // lưu ko mất dữ liệu khi reload trang
  useEffect(() => {
    const savedDate = localStorage.getItem('DayData')
    if (savedDate) {
      setCalendar(savedDate)
    }
  }, [])

  // Lọc ticket dựa trên điểm đi và điểm đến đã chọn
  const filteredTickets = ticket().filter((item: any) => {
    const idDiemDi = diemDi.find((d) => d.name === selectedDiemDi)?.id || 0
    const idDiemDen = diemDen.find((d) => d.name === selectedDiemDen)?.id || 0
    const diemDiMatch = idDiemDi === 0 || t(`Home:${item.diemdi}`) === selectedDiemDi
    const diemDenMatch = idDiemDen === 0 || t(`Home:${item.diemden}`) === selectedDiemDen

    // lọc theo filter Vehicle xét name của item.type với localStorage
    const filterData: { [key: string]: boolean } = JSON.parse(localStorage.getItem('filterData') || '{}')

    // lọc vehicle
    const hasVehicleFilter = Object.keys(filterData).some((key) => !key.includes(' - '))
    const vehicleMatch = hasVehicleFilter ? filterData[item.type] : true
    // lọc route

    const routeKeys = Object.keys(filterData).filter((key) => key.includes('route_'))
    const routeMatch =
      routeKeys.length === 0 ||
      routeKeys.some((key) => {
        const route = key.replace('route_', '')
        const [filterDiemdi, filterDiemDen] = route.split(' - ').map((s) => s.trim().toLowerCase())
        const itemDiemdi = t(`Home:${item.diemdi}`)?.trim().toLowerCase()
        const itemDiemDen = t(`Home:${item.diemden}`)?.trim().toLowerCase()

        return itemDiemdi === filterDiemdi && itemDiemDen === filterDiemDen
      })
    // lọc Schedules
    const schedulesKeys = Object.keys(filterData).filter((key) => key.includes('schedule_'))
    const schedulesMatch =
      schedulesKeys.length === 0 ||
      schedulesKeys.some((key) => {
        const timeRange = key.replace('schedule_', '')
        const [startTime, endTime] = timeRange.split(' - ').map((s) => s.trim().toLowerCase())
        const itemStartTime = item.starttime?.trim().toLowerCase()
        const itemEndTime = item.endtime?.trim().toLowerCase()
        return itemStartTime === startTime && itemEndTime === endTime
      })

    const compareTimeWithDate = (starttime: string, selectedDate: string): boolean => {
      const selected = parse(selectedDate, 'dd/MM/yyyy', new Date())
      const today = new Date()

      // Nếu ngày trong quá khứ thì ẩn vé
      if (selected < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        return false
      }

      // Nếu là ngày hôm nay thì so sánh giờ
      const isToday =
        selected.getDate() === today.getDate() &&
        selected.getMonth() === today.getMonth() &&
        selected.getFullYear() === today.getFullYear()

      // hiện thị vé nếu giờ hiện tại nhỏ hơn giờ bắt đầu của vé
      if (isToday) {
        const timeToCompare = parse(starttime, 'hh:mm a', new Date())

        return isAfter(timeToCompare, today)
      }

      // Nếu ngày trong tương lai thì luôn hiển thị
      return true
    }

    return (
      diemDiMatch &&
      diemDenMatch &&
      vehicleMatch &&
      routeMatch &&
      schedulesMatch &&
      compareTimeWithDate(item.starttime, calendar)
    )
  })

  return (
    <>
      <div className='bg-[#fff]  '>
        <div className='relative'>
          <div
            className=' w-full h-50 flex items-center justify-center'
            style={{
              backgroundImage: `url(${backgroundBuyticket})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className='w-full h-full flex items-center justify-center bg-[#00000068]'></div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row h-full gap-4 content-start px-2 sm:px-[5%] md:px-[10%] py-5'>
          {/* Search Box */}
          <div className='w-full  mx-auto relative lg:mt-[-170px] rounded-t-[20px]  bg-[#fff]'>
            <div className='absolute p-2 flex items-center gap-2 cursor-pointer hover:text-[#1ba000] transition-all duration-300'>
              {' '}
              <button
                onClick={() => {
                  setSelectedDiemDi('')
                  setSelectedDiemDen('')
                  setShowDiemDiDropdown(false)
                  setShowDiemDenDropdown(false)
                  localStorage.removeItem('searchData')
                }}
                className=' cursor-pointer text-[12px] text-[#5c5b5b]  hover:text-[#1ba000]'
              >
                {t('Buyticket:reset')}
              </button>
            </div>
            {/* Search Form */}
            <div className='py-10 my-2 px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div
                onClick={() => setShowDiemDiDropdown(!showDiemDiDropdown)}
                className='  w-full border-1 border-[#8aff73] rounded-[10px] px-2 py-1 flex items-center gap-2'
              >
                <i className='text-[#70ff53]'>
                  <Icon name='directionarrow' />
                </i>
                <div className='flex justify-between relative w-full '>
                  <div
                    className='cursor-pointer text-[13px] px-2 py-1 bg-[#fff] rounded'
                    onClick={() => setShowDiemDiDropdown(!showDiemDiDropdown)}
                  >
                    {selectedDiemDi || t('Home:Home_location.All')}
                  </div>
                  {showDiemDiDropdown && (
                    <div className='absolute left-0 top-full mt-1 bg-[#fff] border rounded shadow z-11 divide-y divide-gray-300 w-full'>
                      {diemDi.map((item) => (
                        <div
                          key={item.id}
                          className='px-3 py-1 hover:bg-[#e6ffe6]  cursor-pointer text-[14px]'
                          onClick={() => {
                            setSelectedDiemDi(item.name)
                            setShowDiemDiDropdown(false)
                          }}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                  <i className='text-[14px] text-gray-600' onClick={() => setShowDiemDiDropdown(!showDiemDiDropdown)}>
                    <Icon name={showDiemDiDropdown ? 'up' : 'dow'} />
                  </i>
                </div>
              </div>

              <div
                onClick={() => setShowDiemDenDropdown(!showDiemDenDropdown)}
                className='border border-[#8aff73] rounded-[10px] px-2 py-1 flex items-center gap-2'
              >
                <i className='text-[#66ff47]'>
                  <Icon name='location' />
                </i>

                <div className='relative w-full flex justify-between'>
                  <div
                    className=' text-[13px]  cursor-pointer px-2 py-1 bg-[#fff] rounded'
                    onClick={() => setShowDiemDenDropdown(!showDiemDenDropdown)}
                  >
                    {selectedDiemDen || t('Home:Home_location.All')}
                  </div>
                  {showDiemDenDropdown && (
                    <div className='absolute   left-0 top-full mt-1 bg-[#fff] border rounded shadow z-11 divide-y divide-gray-300 w-full'>
                      {diemDen.map((item) => (
                        <div
                          key={item.id}
                          className='px-3 py-1  hover:bg-[#e6ffe6]  cursor-pointer text-[14px]'
                          onClick={() => {
                            setSelectedDiemDen(item.name)
                            setShowDiemDenDropdown(false)
                          }}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                  <i
                    className='text-[14px] text-gray-600 cursor-pointer'
                    onClick={() => setShowDiemDenDropdown(!showDiemDenDropdown)}
                  >
                    <Icon name={showDiemDenDropdown ? 'up' : 'dow'} />
                  </i>
                </div>
              </div>
              <div className='   border border-[#8aff73] rounded-[10px] px-2 py-1 flex items-center gap-2'>
                <i className='text-[#66ff47]'>
                  <Icon name='calendar' />
                </i>
                <div className='relative w-full  '>
                  <div ref={refCalendar}>
                    <input
                      className='focus:outline-none'
                      type=''
                      value={calendar}
                      readOnly
                      onClick={() => setOpen(!open)}
                    />

                    {open ? (
                      <div className={` absolute    w-full h-full z-100 `} ref={refCalendar}>
                        <Calendar
                          className='border-4  border-gray-300 rounded-lg shadow-xl'
                          // date = là ngày click vào
                          date={new Date(calendar.split('/').reverse().join('-'))}
                          minDate={new Date()}
                          maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                          // không cần click mà chỉ cần chuyển ngày là được cập nhật
                          onChange={(date) => {
                            const formattedDate = format(date, 'dd/MM/yyyy')
                            setCalendar(formattedDate)
                            localStorage.setItem('DayData', formattedDate)
                          }}
                        />
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={handleSeach}
                className=' w-full bg-[#1ba000] text-[#fff] cursor-pointer p-2 rounded-[10px] hover:bg-[#1ba000]/70 transition-all duration-300   h-10 justify-self-center  '
              >
                <span>{t('find_ticket')}</span>
              </button>
            </div>
            <div className='flex flex-col md:flex-row mt-5 w-full  '>
              {/* Filter (ẩn trên mobile) */}
              <div className='hidden lg:block  w-2/5   rounded-[10px] bg-[#fff] sticky z-10 top-20 h-fit shadow-lg border-gray-300 p-3'>
                <div className='flex justify-between items-center mb-3'>
                  <h1 className='text-lg font-medium'>{t('Buyticket:filter')}</h1>
                  <button
                    onClick={() => {
                      setFilterData({})
                      localStorage.removeItem('filterData')
                      document.querySelectorAll('input[type="checkbox"]').forEach((checkbox: any) => {
                        checkbox.checked = false
                      })
                    }}
                    className='text-xs text-[#5c5b5b] hover:text-[#1ba000] transition-all cursor-pointer'
                  >
                    {t('filter_reset_all')}
                  </button>
                </div>

                {/* Filter: Vehicle */}
                <div className='mb-4'>
                  <h2 className='text-sm font-semibold'>{t('Buyticket:filter_vehicle')}</h2>
                  <div className='flex flex-col gap-2 mt-2'>
                    {Vehicle.map((vehicle) => (
                      <label key={vehicle.id} className='flex items-center text-sm gap-2'>
                        <input
                          type='checkbox'
                          onChange={handleChange}
                          name={vehicle.name}
                          className='w-4 h-4 cursor-pointer'
                        />
                        <span className='flex items-center gap-2 bg-[#f7f7f7] px-2 py-1 rounded-[10px]'>
                          <Icon name='bus' />
                          {vehicle.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter: Routes */}
                <div className='mb-4'>
                  <h2 className='text-sm font-semibold'>{t('Buyticket:filter_routes')}</h2>
                  <div className='flex flex-col gap-2 mt-2'>
                    {Routes.map((route) => {
                      const routeKey = `route_${route.diemDi} - ${route.diemDen}`
                      return (
                        <label key={route.id} className='flex items-center text-sm gap-2'>
                          <input
                            type='checkbox'
                            onChange={handleChange}
                            name={routeKey}
                            checked={filterData[routeKey] || false}
                            className='w-4 h-4 cursor-pointer'
                          />
                          <span className='flex items-center gap-2 bg-[#f7f7f7] px-2 py-1 rounded-[10px]'>
                            <Icon name='road' />
                            {route.diemDi} - {route.diemDen}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Filter: Schedules */}
                <div>
                  <h2 className='text-sm font-semibold'>{t('Buyticket:filter_schedules')}</h2>
                  <div className='flex flex-col gap-2 mt-2'>
                    {Schedules.map((shedule) => {
                      const scheduleKey = `schedule_${shedule.starttime} - ${shedule.endtime}`
                      return (
                        <label key={shedule.id} className='flex items-center text-sm gap-2'>
                          <input
                            type='checkbox'
                            onChange={handleChange}
                            name={scheduleKey}
                            checked={filterData[scheduleKey] || false}
                            className='w-4 h-4 cursor-pointer'
                          />
                          <span className='flex items-center gap-2 bg-[#f7f7f7] px-2 py-1 rounded-[10px]'>
                            <Icon name='clock' />
                            {shedule.starttime} - {shedule.endtime}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className='w-full md:ml-4  px-2   '>
                {filteredTickets.length > 0 ? (
                  <div className='  h-full space-y-4 w-full'>
                    {filteredTickets.map((item: any) => {
                      const diemdi = t(`Home:${item.diemdi}`)
                      const diemden = t(`Home:${item.diemden}`)
                      const name = `${item.type} -  ${diemdi} - ${diemden}`
                      return (
                        <div
                          key={item.id}
                          className='rounded-[10px] bg-[#fff] shadow-lg border border-gray-300 overflow-hidden'
                        >
                          {/* Thông tin vé */}
                          <div className='flex flex-col md:flex-row items-start md:items-center p-4 gap-4 '>
                            {/* Trái: Thông tin tuyến */}
                            <div className='flex-1'>
                              <h1 className='text-base md:text-lg font-semibold line-clamp-1'>{name}</h1>
                              <p className='text-[11px] text-gray-500'>Seat Layout - {item.seatLayout}</p>
                              <p className='text-amber-400 text-sm flex items-center gap-1 mt-1'>
                                <Icon name='bus' /> {item.type}
                              </p>
                            </div>

                            {/* Giữa: Thời gian */}
                            <div className='flex items-center justify-between w-full md:w-auto md:gap-8 text-sm'>
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

                            {/* Phải: Ngày nghỉ + chọn ghế */}
                            <div className='flex flex-col items-end gap-2 md:pl-4 w-full md:w-auto'>
                              <p className='text-[11px] text-nowrap'>
                                {t('off_day')}:{' '}
                                <span className='ml-1 bg-blue-200 text-blue-800 border border-blue-400 px-2 py-1 rounded-full'>
                                  {item.offday}
                                </span>
                              </p>
                              <Link to={`/buytickets/${item.id}/${name}`} className='w-full md:w-auto'>
                                <button className='bg-green-600 text-[#fff] text-sm px-4 py-2 rounded-md w-full md:w-auto cursor-pointer'>
                                  {t('Buyticket:select_seat')}
                                </button>
                              </Link>
                            </div>
                          </div>

                          {/* Tiện nghi */}
                          <div className='border-t border-gray-200 px-4 py-2 text-sm flex flex-wrap gap-2 items-center'>
                            <p className='text-gray-500'>{t('facilities')}:</p>
                            {item.facilities.map((facility: any, index: any) => (
                              <span className='bg-gray-100 px-2 py-1 rounded-full text-gray-700 text-xs' key={index}>
                                {facility}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className='h-full flex items-center justify-center py-10'>
                    <p className='text-[18px] text-gray-500'>{t('Buyticket:no_ticket')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default BuyticketLayout
