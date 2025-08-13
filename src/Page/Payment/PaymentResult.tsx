import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
export default function PaymentResult() {
  const navigate = useNavigate()
  const location = useLocation()
  const { ticketid } = useParams<{ ticketid: string }>()
  const [countdown, setCountdown] = useState(10)
  const userinfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const UserList = JSON.parse(localStorage.getItem('userList') || '[]')
  const GuestUserInfo = JSON.parse(localStorage.getItem('guestUserInfo') || '[]')
  const isUserLoggedIn = userinfo.name || userinfo.email

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
      if (countdown === 0) {
        // Xử lý khi đếm ngược kết thúc: xóa vé và chuyển trang
        if (ticketid) {
          const updatedList = (isUserLoggedIn ? UserList : GuestUserInfo).map((user: any) => {
            const Delete = user.ticket?.filter((t: any) => t.id !== parseInt(ticketid || '0'))
            return { ...user, ticket: Delete }
          })
          localStorage.setItem(isUserLoggedIn ? 'userList' : 'guestUserInfo', JSON.stringify(updatedList))

          navigate('/buytickets')
        }
      } else {
        navigate('/buytickets', { replace: true })
      }
    } else {
      // Nếu không có ticketid, chuyển về trang mua vé
      navigate('/buytickets', { replace: true })
    }
  }, [location.search, countdown, ticketid, isUserLoggedIn, UserList, GuestUserInfo, navigate])

  // Xử lý thoát khỏi trang thanh toán
  useEffect(() => {
    const handleUnload = () => {
      // Xóa vé khỏi localStorage khi thoát trang hoặc đổi URL
      if (ticketid) {
        const updatedList = (isUserLoggedIn ? UserList : GuestUserInfo).map((user: any) => {
          const Delete = user.ticket?.filter((t: any) => t.id !== parseInt(ticketid || '0'))
          return { ...user, ticket: Delete }
        })
        localStorage.setItem(isUserLoggedIn ? 'userList' : 'guestUserInfo', JSON.stringify(updatedList))
      }
    }

    window.addEventListener('beforeunload', handleUnload)
    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [ticketid, isUserLoggedIn, UserList, GuestUserInfo])

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div
        className='absolute top-0 left-0 w-full h-1 bg-blue-500 transition-all duration-10000 ease-in-out'
        style={{ width: '100%' }}
      ></div>
      <div className='bg-white p-8 rounded shadow text-center'>
        <h2 className='text-xl font-bold mb-4 text-red-600'>Vé đã bị hủy!</h2>
        <p className='mb-4'>
          Bạn đã hủy thanh toán hoặc giao dịch thất bại.
          <br />
          Mã giao dịch: <strong>{ticketid}</strong>
        </p>
        {/* hiệu ung đếm ngược */}
        <p className='text-gray-500'>
          Bạn sẽ được chuyển về trang mua vé sau <strong>{countdown}</strong> giây...
        </p>
      </div>
    </div>
  )
}
