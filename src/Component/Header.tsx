import Icon from '../icons/Icon'
import '../App.css'
import logo from '../assets/logo/Bus_Ticket_Header.png'
import vietnam from '../assets/languageimg/vietnam.png'
import my from '../assets/languageimg/my.png'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function Header() {
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState<'vi' | 'en'>('vi')
  const UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const changeLanguage = (lang: 'vi' | 'en') => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  const [islanguageOpen, setIsLanguageOpen] = useState(false)
  const toggleLanguage = () => {
    setIsLanguageOpen(!islanguageOpen)
  }

  const [isopenclick, setIsOpenClick] = useState<number | null>(null)
  const toggleClick = (id: number) => {
    setIsOpenClick(isopenclick === id ? null : id)
  }

  const LanguageSwitch = () => {
    return (
      <div className='flex   gap-2'>
        <div>
          <img
            src={`${language === 'vi' ? vietnam : my}`}
            className='w-5 h-5 rounded-full border border-gray-300'
            alt=''
          />
        </div>
        <div className='relative z-100   '>
          <button
            className=' cursor-pointer flex items-center gap-1 text-gray-700 hover:text-[#1ba000] transition-all duration-300'
            onClick={toggleLanguage}
          >
            {language === 'vi' ? 'Tiếng Việt' : 'English'}
            <Icon name={islanguageOpen ? 'up' : 'dow'} />
          </button>
          {islanguageOpen && (
            <div
              className='cursor-pointer  absolute top-full left-0 min-w-max bg-[#fff] shadow-lg rounded mt-1 '
              onClick={() => setIsLanguageOpen(false)}
            >
              <ul className='p-2  flex flex-col gap-2'>
                <div className='flex gap-2 ' onClick={() => changeLanguage('vi')}>
                  <img src={vietnam} alt='' className=' w-5 h-5 rounded-full border border-gray-300' />

                  <li
                    className='cursor-pointer hover:text-[#1ba000] transition-all duration-300'
                    onClick={() => changeLanguage('vi')}
                  >
                    Tiếng Việt
                  </li>
                </div>
                <div className='flex gap-2' onClick={() => changeLanguage('en')}>
                  <img src={my} alt='' className='w-5 h-5 rounded-full border border-gray-300' />

                  <li
                    className='cursor-pointer hover:text-[#1ba000] transition-all duration-300'
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
  const navbar = [
    { id: 1, name: t('Header_NAV.Home'), path: '/', icon: 'home' },
    { id: 2, name: t('Header_NAV.About'), path: '/about', icon: 'about' },
    { id: 3, name: t('Header_NAV.Faqs'), path: '/faqs', icon: 'faqs' },
    { id: 4, name: t('Header_NAV.Blog'), path: '/blog', icon: 'blog' },
    { id: 5, name: t('Header_NAV.Contact'), path: '/contact', icon: 'contact' },
    { id: 6, name: t('Header_NAV.TicketSearch'), path: '/ticket-search', icon: 'search' }
  ]
  const navbardashboard = [
    { id: 1, name: t('Header_NAV.Dashboard'), path: '/user/dashboard', icon: 'home' },
    {
      id: 2,
      name: t('Header_NAV.Booking'),
      path: '/buytickets',
      icon: 'ticket',
      sub: [
        { id: '1', name: t('Header_DROPDOWN.BuyTicket'), path: '/buytickets' },
        { id: '2', name: t('Header_DROPDOWN.BookingHistory'), path: '/user/booked-ticket/history' }
      ]
    },
    {
      id: 3,
      name: t('Header_NAV.SupportTicket'),
      path: '/user/ticket/createnew',
      icon: 'support',
      sub: [
        { id: '1', name: t('Header_DROPDOWN.CreateNew'), path: '/user/ticket/createnew' },
        { id: '2', name: t('Header_DROPDOWN.Tickets'), path: '/user/support-ticket' },
        { id: '3', name: t('Header_DROPDOWN.Chat'), path: '/user/support/chat' }
      ]
    },
    {
      id: 4,
      name: t('Header_NAV.Profile'),
      path: `/user/profile/profile-setting/${UserInfo.id || ''}`,
      icon: 'user',
      sub: [
        { id: '1', name: t('Header_DROPDOWN.Profile'), path: `/user/profile/profile-setting/${UserInfo.id || ''}` },
        { id: '2', name: t('Header_DROPDOWN.ChangePassword'), path: '/user/change-password' }
      ]
    }
  ]

  const Buytikets = () => {
    return (
      <Link to='/buytickets' className='flex items-center gap-2'>
        <button className='cursor-pointer flex justify-center items-center rounded-xl font-semibold overflow-hidden relative z-100 border border-[#1ba000]  group px-4 py-2'>
          <span className='relative z-10 text-nowrap  text-green-600 group-hover:text-[#fff] text-xl duration-500 text-[13px]'>
            {t('Header_BUTTON.BuyTicket')} !
          </span>
          <span className='absolute rounded-xl w-full h-full bg-[#1ba000] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500' />
          <span className='absolute rounded-xl w-full h-full bg-[#1ba000] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500' />
        </button>
      </Link>
    )
  }
  //click menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // kiểm tra người dùng đã đăng nhập hay chưa
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const user = JSON.parse(localStorage.getItem('userthongtin') || '{}')
  const [clickhome, setclickhome] = useState(false)
  const handleclickhome = () => {
    setclickhome(!clickhome)
  }
  const Header = () => {
    return (
      <header className='  max-[1800px]:px-[10%] h-8 flex  px-[20%] max-[900px]:px-[1%] max-[900px]:w-full max-[900px]:justify-start max-[430px]:flex-col max-[350px]:items-start items-center  justify-between   p-2 gap-2 text-gray-700 text-[14px]'>
        <div className='flex gap-3 max-[350px]:flex-col'>
          <div className='flex   gap-2'>
            <span className='text-[#1ba000]'>
              <Icon name='phone' />
            </span>
            <span>+84 972364028</span>
          </div>

          <div className='max-[350px]:hidden'>|</div>
          <div className='flex   gap-2'>
            <span className='text-[#1ba000]'>
              <Icon name='email' />
            </span>
            <span>nttanh0412@gmail.com</span>
          </div>
        </div>
        <div className='flex gap-5 max-[350px]:gap-3  max-[350px]:flex-col '>
          <div>
            <LanguageSwitch />
          </div>
          {userInfo && userInfo.email ? (
            <div className=' flex  '>
              <div className=' border-x-2  border-gray-400 px-3'>
                <span>
                  {t('Header_LOGIN.Hello')}: {user.name ? user.name : userInfo.name ? userInfo.name : '???'}
                </span>
              </div>
              <div className=' border-r-2 px-3 border-gray-400'>
                {clickhome ? (
                  <Link to={'/'}>
                    <span onClick={handleclickhome}>{t('Header_NAV.Home')}</span>
                  </Link>
                ) : (
                  <Link to={'/user/dashboard'}>
                    <span onClick={handleclickhome}>{t('Header_NAV.Dashboard')}</span>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className='flex gap-2'>
              <Link to={'/signin'}>
                <span className=''>
                  <i className='px-2 max-[350px]:px-0  text-[#1ba000]'>
                    <Icon name='signin' />
                  </i>
                  {t('Header_LOGIN.SingIn')}
                </span>
              </Link>

              <div className='px-3'>/</div>
              <Link to={'/signup'}>
                <span>
                  <i className='px-2 text-[#1ba000]'>
                    <Icon name='signup' />
                  </i>
                  {t('Header_LOGIN.SignUp')}
                </span>
              </Link>
            </div>
          )}
        </div>
      </header>
    )
  }

  const Nav = () => {
    // const pathlink = ['/user/dashboard']
    // const sosanh = pathlink.some(
    //   (path) => location.pathname === path || location.pathname.startsWith(path)
    // )
    //
    return (
      <nav className='flex gap-5'>
        {userInfo && userInfo.email && clickhome
          ? navbardashboard.map((item, index) => (
              <div key={index} className='relative group'>
                <Link
                  to={item.path}
                  className={`text-[16px]  font-semibold   hover:text-[#1ba000] transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-[#1ba000]  '
                      : location.pathname.startsWith(item.path)
                        ? 'text-[#1ba000]  '
                        : 'text-gray-700 '
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 p-2   border-b-3  rounded-2xl    hover:border-green-500    w-full${
                      location.pathname === item.path
                        ? 'text-[#1ba000]   '
                        : location.pathname.startsWith(item.path)
                          ? 'text-[#1ba000]  '
                          : 'text-gray-700 border-transparent '
                    }`}
                  >
                    <span className='text-[#1ba000]'>
                      <Icon name={item.icon} />
                    </span>
                    <span className='text-nowrap'>{item.name}</span>
                  </div>
                </Link>
                {item.sub && item.sub.length > 0 && (
                  <div className='absolute left-0 top-full  bg-[#ffffff]  rounded mt-1 shadow-2xl   invisible  opacity-0 group-hover:opacity-100 transition duration-300 group-hover:visible '>
                    <ul className=' divide-dashed  divide-y-1 divide-gray-300 flex flex-col '>
                      {item.sub.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            to={subItem.path}
                            className={` min-w-max block text-[15px] px-4 py-2 text-sm hover:bg-[#1ba000] hover:text-[#fff] hover:pr-auto  transition-all duration-300 ease-in   ${
                              location.pathname === subItem.path ? 'text-[#1ba000]' : 'text-gray-700'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          : navbar.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`text-[16px] font-semibold  border-b-3 rounded-2xl    hover:border-green-500  hover:text-[#1ba000] transition-all duration-300 ${
                  item.path === '/'
                    ? location.pathname === '/'
                      ? 'text-[#1ba000]  '
                      : 'text-gray-700 border-transparent'
                    : location.pathname.startsWith(item.path)
                      ? 'text-[#1ba000]'
                      : 'text-gray-700 border-transparent'
                }`}
              >
                <div className='flex items-center gap-2 p-2  transition duration-700 rounded-2xl w-full'>
                  <span className='text-[#1ba000]'>
                    <Icon name={item.icon} />
                  </span>
                  <span className='text-nowrap'>{item.name}</span>
                </div>
              </Link>
            ))}
      </nav>
    )
  }

  return (
    <>
      <div className='max-[900px]:hidden bg-gray-200'>
        <Header />
      </div>

      <div className=' max-[1800px]:px-[5%]   max-[450px]:pr-10  px-[20%] sticky -top-1 z-80 h-20 w-full   flex justify-between items-center bg-[#ffffff] shadow-md'>
        <Link to='/' className='flex  gap-2'>
          <img className=' max-[450px]:pl-0 max-[450px]:w-30 w-40 h-22 pl-10 pt-2 object-cover' src={logo} alt='' />
        </Link>
        <div className='max-[900px]:hidden '>
          <Nav />
        </div>
        <div className='flex pl-2 gap-5 '>
          <div className='max-[450px]:hidden'>
            <Buytikets />
          </div>
          <div className='max-[900px]:flex hidden gap-2  '>
            <div className='   text-[24px]  text-[#1ba000] cursor-pointer' onClick={toggleMenu}>
              <i>{isMenuOpen ? <Icon name='close' /> : <Icon name='menu' />}</i>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div>
          <div
            className='fixed bg-black opacity-30 z-90 top-0 w-full h-full '
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className=' min-[900px]:hidden  fixed  -top-1  items-start  w-full z-90 flex mt-1  '>
            <div
              className='relative   bg-[#ffffff] flex flex-col shadow-lg  w-full  justify-between p-6 animate-slideDown'
              style={{ animation: 'slideDown 0.3s ease' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='   flex flex-wrap gap-4 text-sm text-gray-700 justify-between max-[400px]:flex-col'>
                <div className='flex flex-wrap gap-4 text-sm text-gray-700 justify-start max-[400px]:flex-col'>
                  <div className='flex   gap-2'>
                    <span className='text-[#1ba000]'>
                      <Icon name='phone' />
                    </span>
                    <span>+84 972364028</span>
                  </div>

                  <div className='max-[400px]:hidden'>|</div>
                  <div className='flex   gap-2'>
                    <span className='text-[#1ba000]'>
                      <Icon name='email' />
                    </span>
                    <span>nttanh0412@gmail.com</span>
                  </div>
                </div>

                <div className=''>
                  {userInfo && userInfo.email ? (
                    <div className=' flex max-[450px]:flex-col max-[450px]:gap-5   '>
                      <div className=' border-x-2 max-[450px]:border-none  px-3 max-[450px]:px-0  border-gray-400  '>
                        <span>
                          {t('Header_LOGIN.Hello')}: {user.name ? user.name : userInfo.name ? userInfo.name : '???'}
                        </span>
                      </div>
                      <div className=' border-r-2 max-[450px]:border-none px-3 max-[450px]:px-0  border-gray-400'>
                        {clickhome ? (
                          <Link to={'/'}>
                            <span onClick={handleclickhome}>{t('Header_NAV.Home')}</span>
                          </Link>
                        ) : (
                          <Link to={'/user/dashboard'}>
                            <span onClick={handleclickhome}>{t('Header_NAV.Dashboard')}</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className='flex gap-2 '>
                      <Link to={'/signin'}>
                        <span className=''>
                          <i className='pr-2    text-[#1ba000]'>
                            <Icon name='signin' />
                          </i>
                          {t('Header_LOGIN.SingIn')}
                        </span>
                      </Link>

                      <div className='px-3'>/</div>
                      <Link to={'/signup'}>
                        <span>
                          <i className='px-2 text-[#1ba000]'>
                            <Icon name='signup' />
                          </i>
                          {t('Header_LOGIN.SignUp')}
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
                <div>
                  <LanguageSwitch />
                </div>
              </div>

              <div className='space-y-2  '>
                {userInfo && userInfo.email && clickhome
                  ? navbardashboard.map((item, index) => (
                      <div key={index} className='relative group  '>
                        <div
                          className={`text-[16px] font-semibold hover:text-[#1ba000] transition-all duration-300 ${
                            location.pathname === item.path
                              ? 'text-[#1ba000]'
                              : location.pathname.startsWith(item.path)
                                ? 'text-[#1ba000]'
                                : 'text-gray-700'
                          }`}
                        >
                          <div className='flex items-center justify-between gap-2 py-2   hover:bg-gray-100 rounded w-full'>
                            <Link to={item.path}>
                              <div className='flex items-center gap-2'>
                                <span className='text-[#1ba000]'>
                                  <Icon name={item.icon} />
                                </span>

                                <span>{item.name}</span>
                              </div>
                            </Link>
                            {item.sub && item.sub.length > 0 && (
                              <span onClick={() => toggleClick(item.id)} className='text-[#1ba000]'>
                                <Icon name={isopenclick === item.id ? 'up' : 'dow'} />
                              </span>
                            )}
                          </div>
                        </div>
                        <div
                          className={`  left-0 top-full overflow-hidden bg-[#ffffff] transition-all duration-500 ease-in-out rounded  shadow-md divide-y invisible  opacity-0 group-hover:opacity-100   group-hover:visible ${isopenclick === item.id ? 'visible max-h-40  opacity-100' : '  max-h-0 opacity-0'}`}
                        >
                          {item.sub && item.sub.length > 0 && (
                            <ul className='   divide-y-1  divide-gray-300 flex flex-col '>
                              {item.sub.map((subItem) => (
                                <li key={subItem.id}>
                                  <Link
                                    to={subItem.path}
                                    className={` min-w-max block text-[15px] px-4 py-2 text-sm hover:bg-[#1ba000] hover:text-[#fff] hover:pr-auto  transition-all duration-300 ease-in   ${
                                      location.pathname === subItem.path ? 'text-[#1ba000]' : 'text-gray-700'
                                    }`}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))
                  : navbar.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className={`text-[16px] font-semibold hover:text-[#1ba000] transition-all duration-300 ${
                          item.path === '/'
                            ? location.pathname === '/'
                              ? 'text-[#1ba000]'
                              : 'text-gray-700'
                            : location.pathname.startsWith(item.path)
                              ? 'text-[#1ba000]'
                              : 'text-gray-700'
                        }`}
                      >
                        <div className='flex items-center gap-2 py-2 hover:bg-gray-100 rounded w-full'>
                          <span className='text-[#1ba000]'>
                            <Icon name={item.icon} />
                          </span>
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
            <style>
              {`
              @keyframes slideDown {
                0% { transform: translateY(-100%); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
              }
            `}
            </style>{' '}
            <div></div>
          </div>
        </div>
      )}
    </>
  )
}
export default Header
