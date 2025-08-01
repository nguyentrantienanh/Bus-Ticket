import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export default function TicketPaymentAPI() {
  // const [ticket,setTicket] = useState<any>(null)
  const [ticket, setTicket] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const dataticket = async () => {
      try {
        setLoading(true)
        // const response = await axios.get('http://localhost:4001/api/tickets/1') === {}
        const response = await axios.get('http://localhost:4001/api/tickets') // === []
        setTicket(response.data.data)
      } catch (error) {
        console.error('lỗi không lấy đc dữ liệu')
      } finally {
        setLoading(false)
      }
    }
    dataticket()
  }, [])

  return (
    <div className='p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-semibold mb-6 text-center text-green-600'>Quản Lý Vé Xe Khách</h1>

      {loading && <p className='text-blue-500 mb-4'>Đang tải dữ liệu...</p>}

      {!loading && ticket.length === 0 && <p className='text-red-500 mb-4'>Không có vé nào được tìm thấy.</p>}

      {!loading && ticket.length > 0 && (
        <>
          {ticket.map((t: any) => (
            <div className='space-y-6 border-b-3 pb-6 mb-6' key={t.id}>
              <div className='bg-gray-100 p-4 rounded-lg'>
                <h2 className='text-xl font-semibold text-gray-800 mb-2'>Thông tin chuyến xe</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700'>
                  <div>
                    <strong>Mã vé:</strong> {t.id}
                  </div>
                  <div>
                    <strong>Điểm đi:</strong> {t.diemdi}
                  </div>
                  <div>
                    <strong>Điểm đến:</strong> {t.diemden}
                  </div>
                  <div>
                    <strong>Layout ghế:</strong> {t.seatLayout}
                  </div>
                  <div>
                    <strong>Loại xe:</strong> {t.type}
                  </div>
                  <div>
                    <strong>Bắt đầu:</strong> {t.starttime}
                  </div>
                  <div>
                    <strong>Kết thúc:</strong> {t.endtime}
                  </div>
                  <div>
                    <strong>Thời gian đi:</strong> {t.timetogo}
                  </div>
                  <div>
                    <strong>Ngày nghỉ:</strong> {t.offday}
                  </div>
                  <div className='col-span-full'>
                    <strong>Tiện ích:</strong> {t.facilities?.join(', ') || 'Không có'}
                  </div>
                </div>
              </div>

              <div className='bg-white p-4 rounded-lg shadow'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>Danh sách ghế</h3>
                <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 text-sm'>
                  {t.seat?.map((s: any) => (
                    <div key={s.id} className='bg-blue-50 p-2 border border-blue-200 rounded text-center shadow-sm'>
                      <div className='font-bold text-blue-600'>{s.name}</div>
                      <div>{parseInt(s.price).toLocaleString()} VNĐ</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
