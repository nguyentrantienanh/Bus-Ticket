import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import backgroundPayment from '../../assets/background.jpg'
import { deleteTicketById } from '../../api/ticketsApi' // đường dẫn tùy dự án
// import { useTranslation } from 'react-i18next'
export default function PaymentResult() {
  const navigate = useNavigate()
  const location = useLocation()
  const { ticketid } = useParams<{ ticketid: string }>()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const status = params.get('status')

    if (status === '-49') {
      if (countdown > 0) {
        const interval = setInterval(() => {
          setCountdown((prev) => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
      }

      if (countdown === 0 && ticketid) {
        // Xóa vé bằng API
        deleteTicketById(Number(ticketid))
          .then(() => {
         
            navigate('/buytickets')
          })
          .catch(() => {
           
            navigate('/buytickets')
          })
      }
    } else {
      navigate('/buytickets', { replace: true })
    }
  }, [location.search, countdown, ticketid, navigate])

  // Xóa vé khi người dùng đóng tab hoặc thoát trang
  useEffect(() => {
    const handleUnload = async () => {
      if (ticketid) {
        try {
          deleteTicketById(Number(ticketid)) // Xóa vé trên server
 
        } catch (err) {
         
        }
      }
    }

    window.addEventListener('beforeunload', handleUnload)
    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [ticketid])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 relative'>
      {/* Background */}
      <div
        className='absolute inset-0 bg-center bg-cover'
        style={{ backgroundImage: `url(${backgroundPayment})` }}
      ></div>
      {/* Overlay */}
      <div className='absolute inset-0 backdrop-blur-sm bg-black/60'></div>

      {/* Content */}
      <div className='max-w-3xl  w-full mx-auto rounded-2xl overflow-hidden shadow-2xl bg-red-300 relative z-10 animate-[fadeIn_0.5s_ease]'>
        <div className='p-8 text-center'>
          {/* Icon cảnh báo */}
          <div className='flex justify-center mb-4'>
            <div className='bg-red-100 rounded-full p-4  '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-16 w-16 text-red-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v2m0 4h.01M5.455 19h13.09c1.54 0 2.492-1.682 1.7-3L13.7 4c-.77-1.33-2.63-1.33-3.4 0L3.755 16c-.792 1.318.16 3 1.7 3z'
                />
              </svg>
            </div>
          </div>

          {/* Tiêu đề */}
          <h2 className='text-3xl font-bold mb-2 text-red-600 drop-shadow-md'>Thanh toán thất bại!</h2>

          {/* Nội dung */}
          <p className='text-gray-700 mb-2'>
            Mã giao dịch: <span className='font-semibold text-black'>{ticketid}</span>
          </p>
          <p className='text-gray-500 mb-4'>
            Giao dịch của bạn đã bị hủy. Vui lòng thử lại hoặc chọn phương thức khác.
          </p>

          {/* Countdown */}
          <div className='w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4'>
            <div
              className='bg-red-500 h-full transition-all duration-1000 ease-linear'
              style={{ width: `${(countdown / 10) * 100}%` }}
            ></div>
          </div>
          <p className='text-sm text-gray-500'>
            Trang sẽ tự động trở về sau <span className='font-bold text-gray-800'>{countdown}</span> giây...
          </p>

          {/* Nút quay lại */}
          <div className='mt-6'>
            <button
              onClick={async () => {
                if (ticketid) {
                  try {
                    await deleteTicketById(Number(ticketid))
                 
                  } catch (err) {
                   
                  }
                }
                navigate('/')
              }}
              className='cursor-pointer bg-red-500 hover:bg-red-600 text-[#fff] font-medium py-2 px-6 rounded-lg shadow transition duration-200'
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
