import { Link, useLocation } from 'react-router-dom'
import logo from '../../../assets/logo/Bus_Ticket_Header.png'
import Icon from '../../../icons/Icon'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import vietnam from '../../../assets/languageimg/vietnam.png'
import my from '../../../assets/languageimg/my.png'
const adminNav = [
  {
    id: 1,
    name: 'Quản trị',
    path: '/admin/dashboard',
    icon: 'dashboard',
    sub: [{ id: '1', name: 'Thống kê', path: '/admin/statistics' }]
  },
  { id: 2, name: 'Quản lý vé', path: '/admin/manage-tickets', icon: 'ticket' },
  {
    id: 3,
    name: 'Vé đã đặt',
    path: '/admin/booked-tickets',
    icon: 'check',
    sub: [
      { id: '1', name: 'Chờ duyệt', path: '/admin/booked-tickets/pending' },
      { id: '2', name: 'Đã duyệt', path: '/admin/booked-tickets/confirmed' },
      { id: '3', name: 'Bị từ chối', path: '/admin/booked-tickets/rejected' }
    ]
  },
  {
    id: 4,
    name: 'Tài khoản user',
    path: '/admin/users',
    icon: 'user',
    sub: [
      { id: '1', name: 'Hoạt động', path: '/admin/users/account-active' },
      { id: '2', name: 'Bị khóa', path: '/admin/users/account-locked' }
    ]
  },
  { id: 5, name: 'Hỗ trợ khách hàng', path: '/admin/support', icon: 'support' }
]

function HeaderAdmin() {
  // hàm Language
  // const { t } = useTranslation()
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState<'vi' | 'en'>('vi')
  const changeLanguage = (lang: 'vi' | 'en') => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  const [islanguageOpen, setIsLanguageOpen] = useState(false)
  const toggleLanguage = () => {
    setIsLanguageOpen(!islanguageOpen)
  }
  const LanguageSwitch = () => {
    return (
      <div className='flex   gap-2'>
        <div>
          <img
            src={`${language === 'vi' ? vietnam : my}`}
            className='w-4 h-4 rounded-full border border-gray-300'
            alt=''
          />
        </div>
        <div className='relative z-[60]  '>
          <button
            className='text-[10px] text-nowrap cursor-pointer flex items-center gap-1 text-gray-700 hover:text-[#1ba000] transition-all duration-300'
            onClick={toggleLanguage}
          >
            {language === 'vi' ? 'Tiếng Việt' : 'English'}
            <Icon name={islanguageOpen ? 'up' : 'dow'} />
          </button>
          {islanguageOpen && (
            <div
              className='cursor-pointer  absolute top-full  left-0 min-w-max bg-[#fff] shadow-lg rounded mt-1 '
              onClick={() => setIsLanguageOpen(false)}
            >
              <ul className='p-2  flex flex-col gap-2'>
                <div className='flex gap-2 ' onClick={() => changeLanguage('vi')}>
                  <img src={vietnam} alt='' className=' w-5 h-5 rounded-full border border-gray-300' />

                  <li
                    className='cursor-pointer hover:text-[#1ba000] transition-all duration-300 text-[10px] md:text-[14px]'
                    onClick={() => changeLanguage('vi')}
                  >
                    Tiếng Việt
                  </li>
                </div>
                <div className='flex gap-2' onClick={() => changeLanguage('en')}>
                  <img src={my} alt='' className='w-5 h-5 rounded-full border border-gray-300' />

                  <li
                    className='cursor-pointer hover:text-[#1ba000] transition-all duration-300 text-[10px] md:text-[14px]'
                    onClick={() => changeLanguage('en')}
                  >
                    English
                  </li>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }

  const location = useLocation()
  const [openshow, setopenshow] = useState<number | null>(null)
  const [collapsed, setCollapsed] = useState(false) // Desktop
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // Mobile

  const handleToggle = (id: number) => {
    setopenshow(openshow === id ? null : id)
  }

  return (
    <>
      {' '}
      <aside
        className={`md:h-screen top-0 left-0 bg-gray-100 flex flex-col justify-between transition-all duration-500 z-50 ${
          collapsed ? 'md:w-12' : 'md:w-80'
        }`}
      >
        <div>
          <div className='flex items-center justify-between p-4 border-b cursor-pointer  '>
            <div className='flex items-center justify-center gap-2' onClick={() => setCollapsed(false)}>
              <img src={logo} alt='Logo' className='h-10 object-contain' />
              <span
                className={`transition-all duration-300 text-nowrap text-[#1ba000] text-xl font-bold overflow-hidden text-ellipsis inline-block ${
                  collapsed ? 'md:max-w-[0px] md:overflow-hidden' : 'md:max-w-[100px]'
                }`}
              >
                ADMIN
              </span>
            </div>

            <div
              className={`transition-all  duration-300 text-nowrap ${
                collapsed ? 'md:max-w-[0px] md:overflow-hidden' : 'md:max-w-[100px] md:overflow-visible'
              }`}
            >
              <LanguageSwitch />
            </div>

            {/* Nút toggle cho desktop */}
            <button
              onClick={() => {
                setCollapsed(!collapsed)
                setopenshow(null)
                setIsLanguageOpen(false)
              }}
              className='text-gray-500 hover:text-gray-700  max-md:hidden'
            >
              {collapsed ? <Icon name='circle-right' /> : <Icon name='circle-left' />}
            </button>

            {/* Nút toggle cho mobile */}
            <button
              className='text-gray-500 hover:text-gray-700 md:hidden'
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen)
                setopenshow(null)
                setIsLanguageOpen(false)
              }}
            >
              <Icon name={mobileMenuOpen ? 'up' : 'dow'} />
            </button>
          </div>

          {/* Navigation */}
          <nav
            className={`flex flex-col mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
              mobileMenuOpen
                ? 'max-md:max-h-[500px] max-md:opacity-100 ' // Mobile: hiện khi menu mở
                : 'max-md:max-h-0 max-md:opacity-0' // Mobile: ẩn khi menu đóng
            } md:max-h-[calc(100vh-200px)] md:opacity-100 md:overflow-y-auto`}
          >
            {adminNav.map((item) => (
              <div key={item.id} className='relative group'>
                <Link
                  to={item.path}
                  className={`flex  py-4 items-center gap-3 px-3  rounded hover:bg-green-100 transition-all ${
                    location.pathname.startsWith(item.path) ? 'bg-green-200 text-[#1ba000]' : 'text-gray-700'
                  }`}
                  onClick={() => {
                    // Đóng mobile menu khi click vào Link
                    setMobileMenuOpen(false)
                    setCollapsed(false)
                  }}
                >
                  <Icon name={item.icon} />
                  <span
                    className={`transition-all duration-300 overflow-hidden text-nowrap text-ellipsis inline-block ${
                      collapsed ? 'md:max-w-[0px]' : 'md:max-w-full'
                    }`}
                  >
                    {item.name}
                  </span>

                  <div
                    className='ml-auto'
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleToggle(item.id)
                    }}
                  >
                    {item.sub && item.sub.length > 0 && <Icon name={openshow === item.id ? 'up' : 'dow'} />}
                  </div>
                </Link>

                {/* Submenu */}
                {item.sub && item.sub.length > 0 && (
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openshow === item.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className='divide-dashed divide-y-1 divide-gray-300 w-full bg-[#fff] shadow-sm shadow-emerald-300 rounded mt-1'>
                      {item.sub.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className={`block px-4 py-2 text-gray-700 hover:bg-green-100 ${
                            location.pathname === subItem.path ? 'bg-green-200 text-[#1ba000]' : ''
                          }`}
                          onClick={() => {
                            // Đóng mobile menu khi click submenu
                            setMobileMenuOpen(false)
                          }}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Logout trong mobile */}
          <div
            className={`md:hidden   border-t transition-all duration-500 ease-in-out ${
              mobileMenuOpen
                ? 'max-md:max-h-20 max-md:opacity-100 p-4'
                : 'max-md:max-h-0 max-md:opacity-0 max-md:overflow-hidden'
            }`}
          >
            <Link
              to='/signin'
              className='flex items-center gap-2 text-red-500 hover:text-red-600'
              onClick={() => {
                localStorage.removeItem('adminInfo')
                setMobileMenuOpen(false) // Đóng menu khi logout
              }}
            >
              <Icon name='logout' />
              <span>Đăng xuất</span>
            </Link>
          </div>
        </div>

        {/* Logout cho desktop */}
        <div className='p-4 border-t max-md:hidden'>
          <Link
            to='/signin'
            className='flex items-center gap-2 text-red-500 hover:text-red-600'
            onClick={() => {
              localStorage.removeItem('adminInfo')
            }}
          >
            <Icon name='logout' />
            <span
              className={`transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis inline-block ${
                collapsed ? 'md:max-w-[0px]' : 'md:max-w-[100px]'
              }`}
            >
              Đăng xuất
            </span>
          </Link>
        </div>
      </aside>
    </>
  )
}

export default HeaderAdmin
