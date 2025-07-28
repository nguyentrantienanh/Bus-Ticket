import { Navigate } from 'react-router-dom'
export default function ProtectedRoute({ children }: { children: any }) {
  const user = JSON.parse(localStorage.getItem('userInfo') || '[]')
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (!user || !user.id) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to='/signin' replace />
  }
  // Nếu đã đăng nhập, hiển thị nội dung của ProtectedRoute
  return children
}
