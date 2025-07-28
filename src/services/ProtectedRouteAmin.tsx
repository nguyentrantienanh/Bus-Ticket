import { Navigate } from 'react-router-dom'

export default function ProtectedRouteAmin({ children }: { children: any }) {
  const admin = JSON.parse(localStorage.getItem('adminInfo') || '{}')
  // Kiểm tra xem admin đã đăng nhập chưa
  if (!admin || !admin.adminId) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập admin
    return <Navigate to='/admin' replace />
  }
  // Nếu đã đăng nhập, hiển thị nội dung của ProtectedRouteAmin
  return children
}
