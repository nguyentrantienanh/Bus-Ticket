import { useState, useEffect, useRef } from 'react'
import { Calendar } from 'react-date-range'
import { format, isBefore } from 'date-fns'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

const calendarComponent = () => {
  // hiện ngày có trong local nếu không có thì thành ngày hiện tại
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

  // xử lý qua ngày tự động cập nhật
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date()
      const formattedDate = format(currentDate, 'dd/MM/yyyy')
      if (isBefore(new Date(calendar.split('/').reverse().join('-')), currentDate)) {
        setCalendar(formattedDate)
        localStorage.setItem('DayData', formattedDate)
      }
    }, 60000) // kiểm tra mỗi phút

    return () => clearInterval(interval)
  }, [calendar])

  return (
    <div ref={refCalendar}>
      <input className='focus:outline-none' type='' value={calendar} readOnly onClick={() => setOpen(!open)} />

      {open ? (
        <div className={` absolute   w-full h-full z-100 `} ref={refCalendar}>
          <Calendar
            className='border-4  border-gray-300 rounded-lg shadow-xl'
            // date = là ngày click vào
            date={new Date(calendar.split('/').reverse().join('-'))}
            // ẩn không cho click các ngày trong quá khứ
            minDate={new Date()}
            // ẩn ngày quá 3 ngày
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
  )
}
export default calendarComponent
