import Header from './Component/Header'
import Footer from './Component/Footer'
import Home from './Page/Home'
import About from './Page/About'
import FAQ from './Page/Faqs'
import Blogs from './Page/Blog/Blogs'
import Contact from './Page/Contact'
import Buyticket from './Page/Buytickets/Buytickets'
import Ticket from './Page/Buytickets/Buyticket'
import Page404 from './Page/page404'
import LoadingPage from './Page/Loding'
import Signin from './Component/auth/Signin'
import Signup from './Component/auth/Signup'
import PrivacyPolicy from './Page/viserbus/policy/PrivacyPolicy'
import TermsOfService from './Page/viserbus/policy/TermsOfService'
import TicketPolicy from './Page/viserbus/policy/TicketPolicy'
import RefundPolicy from './Page/viserbus/policy/RefundPolicy'
import ProtectedRoute from './services/ProtectedRoute'
import Bookinghistoey from './features/user/Page/Bookinghistory'
import Ticketcreatenew from './features/user/Page/Support/Ticketcreatenew'
import SupportTicket from './features/user/Page/Support/Support_Ticket'
import ProfileSetting from './features/user/Page/ProfileSetting'
import Changepassword from './features/user/Page/Changepassword'
import ChatSupportUser from './features/user/Page/Support/ChatSupport'
import Payment from './Page/Buytickets/Payment'
import InformationGuestUser from './Page/GuestUser/Information'
import Chatlayout from './features/user/Page/Support/Chatlayout'
import Chatlist from './features/user/Page/Support/Listchat'
import InformationUser from './features/user/Page/Information'
import Ticketsearch from './Page/Ticketsearch/Ticket-search'

// admin
import ProtectedRouteAmin from './services/ProtectedRouteAmin'
import SigninAdmin from './features/admin/Page/Signin'
import LayoutAdmin from './features/admin/LayoutAdmin'
import Dashboardadmin from './features/admin/Page/Administer/Dashboard'
import Statistics from './features/admin/Page/Administer/Statistics'
import TicketManagement from './features/admin/Page/TicketManagement'
import BookedTickets from './features/admin/Page/Booked/BookedTickets'
import Rejected from './features/admin/Page/Booked/Rejected'
import Pending from './features/admin/Page/Booked/Pending'
import Confirmed from './features/admin/Page/Booked/Confirmed'
import UserAccount from './features/admin/Page/Account/UserAccount'
import UserAccountActive from './features/admin/Page/Account/Active'
import UserAccountLocked from './features/admin/Page/Account/Locked'
import CustomerSupport from './features/admin/Page/Support/CustomerSupport'
import ChatSupport from './features/admin/Page/Support/ChatSupport'
import Page404admin from './features/admin/Page/Page404'

// services
import ScrollToTop from './services/ScrollToTop'
// import ScrollToShow from './services/ScrollToShow'
import { ExpiredTickets } from './services/Expiredtickets'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './features/user/Dashboard'

// import Callapi from './Page/CallAPI'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
// import Icon from './icons/Icon'
import { useMediaQuery } from 'react-responsive'

function AppRoutes() {
  const location = useLocation()

  const hideHeaderFooter = [
    '/signin',
    '/signup',
    '/admin',
    '/user/payment/',
    '/user/information-guest-user/',
    '/user/information-user/',
    '/user/support/chat'
  ]
  // loading mỗi khi chuyển trang
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500) // Thay đổi thời gian nếu cần

    return () => clearTimeout(timer)
  }, [location.pathname])
  // Kiểm tra xem đường dẫn hiện tại có nằm trong danh sách cần ẩn header và footer không
  const shouldHideHeaderFooter = hideHeaderFooter.some(
    (path) => location.pathname === path || location.pathname.startsWith(path)
  )

  const isMdUp = useMediaQuery({ minWidth: 768 })
  return (
    <>
      {loading && (
        <div className='loading-page overflow-hidden'>
          <LoadingPage />
        </div>
      )}
      {!shouldHideHeaderFooter && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/faqs' element={<FAQ />} />
        <Route path='/blog/*' element={<Blogs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/buytickets' element={<Buyticket />} />
        <Route path='/buytickets/:id/:name' element={<Ticket />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/ticket-search' element={<Ticketsearch />} />

        <Route
          path='/user/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/user/profile/profile-setting/:id'
          element={
            <ProtectedRoute>
              <ProfileSetting />
            </ProtectedRoute>
          }
        />

        <Route
          path='user/booked-ticket/history'
          element={
            <ProtectedRoute>
              <Bookinghistoey />
            </ProtectedRoute>
          }
        />
        <Route
          path='/user/ticket/createnew'
          element={
            <ProtectedRoute>
              <Ticketcreatenew />
            </ProtectedRoute>
          }
        />
        <Route
          path='/user/support-ticket'
          element={
            <ProtectedRoute>
              <SupportTicket />
            </ProtectedRoute>
          }
        />

        {isMdUp ? (
          <Route
            path='/user/support/chat/'
            element={
              <ProtectedRoute>
                <Chatlayout />
              </ProtectedRoute>
            }
          >
            <Route path=':id/:name' element={<ChatSupportUser />} />
          </Route>
        ) : (
          <>
            <Route
              path='/user/support/chat'
              element={
                <ProtectedRoute>
                  <Chatlist />
                </ProtectedRoute>
              }
            />
            <Route
              path='/user/support/chat/:id/:name'
              element={
                <ProtectedRoute>
                  <ChatSupportUser />
                </ProtectedRoute>
              }
            />
          </>
        )}

        <Route
          path='/user/change-password'
          element={
            <ProtectedRoute>
              <Changepassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/user/information-user/:id/:name'
          element={
            <ProtectedRoute>
              <InformationUser />
            </ProtectedRoute>
          }
        />
        <Route path='/user/information-guest-user/:id/:name' element={<InformationGuestUser />} />
        <Route path='viserbus/policy/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='viserbus/policy/terms-of-service' element={<TermsOfService />} />
        <Route path='viserbus/policy/ticket-policy' element={<TicketPolicy />} />
        <Route path='viserbus/policy/refund-policy' element={<RefundPolicy />} />
        <Route path='/user/payment/:id' element={<Payment />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
      {/* <ScrollToShow/> */}
    </>
  )
}

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path='/admin' element={<SigninAdmin />} />

        <Route
          path='/admin/*'
          element={
            <ProtectedRouteAmin>
              <LayoutAdmin />
            </ProtectedRouteAmin>
          }
        >
          <Route path='dashboard' element={<Dashboardadmin />} />
          <Route path='statistics' element={<Statistics />} />
          <Route path='manage-tickets' element={<TicketManagement />} />
          <Route path='booked-tickets' element={<BookedTickets />} />
          <Route path='booked-tickets/rejected' element={<Rejected />} />
          <Route path='booked-tickets/pending' element={<Pending />} />
          <Route path='booked-tickets/confirmed' element={<Confirmed />} />
          <Route path='users' element={<UserAccount />} />
          <Route path='users/account-active' element={<UserAccountActive />} />
          <Route path='users/account-locked' element={<UserAccountLocked />} />
          <Route path='support' element={<CustomerSupport />} />
          <Route path='support/chat/:id/:name' element={<ChatSupport />} />
          <Route path='*' element={<Page404admin />} />
        </Route>
      </Routes>
    </>
  )
}
function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return <>{isAdmin ? <AdminRoutes /> : <AppRoutes />}</>
}

export default function RootApp() {
  // Xử lý vé hết hạn
  useEffect(() => {
    ExpiredTickets()
  }, [])
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
