import Icon from '../icons/Icon'
import duong from '../assets/home/duong.png'
import bus from '../assets/bus.png'
import Feedback from '../Component/Slider/Feedback'
import BlogPost from './Blog/components/Blog_Post'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useLocation } from '../Data/location'
import CalendarComponent from '../services/CalendarComponent'

function Home() {
  const { t } = useTranslation('Home')
  const [showDiemDenDropdown, setShowDiemDenDropdown] = useState(false)
  const [selectedDiemDen, setSelectedDiemDen] = useState('')
  const [showDiemDiDropdown, setShowDiemDiDropdown] = useState(false)
  const [selectedDiemDi, setSelectedDiemDi] = useState('')
  const { diemDi, diemDen } = useLocation()

  // Hàm xử lý khi người dùng chọn điểm đi và điểm đến và ngày
  const handleSeach = (e: React.FormEvent) => {
    e.preventDefault()
    // lưu điểm đi và điểm đến vào localStorage
    const searchData = {
      diemDi: selectedDiemDi,
      diemDen: selectedDiemDen,

      idDiemDi: diemDi.find((item: any) => item.name === selectedDiemDi)?.id,
      idDiemDen: diemDen.find((item: any) => item.name === selectedDiemDen)?.id
    }
    localStorage.setItem('searchData', JSON.stringify(searchData))
    // chuyển hướng đến trang tìm kiếm
    window.location.href = '/buytickets'
  }

  const OurAmenities = [
    {
      id: 1,
      title: t('Home_Amenities.AmenitiesList.Wifi'),
      icon: 'wifi'
    },
    {
      id: 2,
      title: t('Home_Amenities.AmenitiesList.Pillow'),

      icon: 'pillow'
    },
    {
      id: 3,
      title: t('Home_Amenities.AmenitiesList.Water'),

      icon: 'water'
    },
    {
      id: 4,
      title: t('Home_Amenities.AmenitiesList.SoftDrink'),

      icon: 'drink'
    }
  ]

  return (
    <>
      <div className=' h-full '>
        <section className='bg-[#ececec]'>
          <div className='  max-[1200px]:px-5 max-[1800px]:px-[10%]  max-[900px]:flex-col  flex  justify-between items-center px-[20%] p-10  '>
            <div className=' max-[900px]:items-center max-[900px]:text-center max-[900px]:flex-col max-[900px]:flex gap-4'>
              <p className='text-3xl w-130 font-bold py-4 max-[450px]:text-[20px] max-[450px]:w-70'>
                {t('Home_SEARCH.GetTicket')}
              </p>

              <Link to='/buytickets'>
                <button className='cursor-pointer rounded-[10px] relative group overflow-hidden border-2  p-2  border-green-600'>
                  <span className='font-bold text-[#fff] text-xl relative z-10 group-hover:text-green-600 duration-500 text-[14px]'>
                    {' '}
                    {t('Home_button.GetTicket')}{' '}
                  </span>
                  <span className='absolute top-0 left-0 w-full  bg-green-600 duration-500 group-hover:-translate-x-full h-full' />
                  <span className='absolute top-0 left-0 w-full bg-green-600 duration-500 group-hover:translate-x-full h-full' />
                  <span className='absolute top-0 left-0 w-full bg-green-600 duration-500 delay-300 group-hover:-translate-y-full h-full' />
                  <span className='absolute delay-300 top-0 left-0 w-full bg-green-600 duration-500 group-hover:translate-y-full h-full' />
                </button>
              </Link>
            </div>
            <div className='flex flex-col gap-4 max-[450px]:my-3  max-[900px]:my-10  max-[900px]:items-center max-[900px]:text-center max-[900px]:flex-col max-[900px]:flex'>
              <strong className='text-[20px]'>{t('Home_SEARCH.ChooseYourTicket')}</strong>
              <form
                action=''
                className='grid     gap-4 bg-[#fff] shadow-2xl max-[450px]:w-[110%]  p-3 rounded-[10px] items-center  '
              >
                <div className='flex gap-4 max-[450px]:flex-col   '>
                  <div className='border-1 border-[#8aff73] rounded-[10px] px-2 py-1 flex items-center gap-2'>
                    <i className='text-[#70ff53]'>
                      <Icon name='directionarrow' />
                    </i>
                    <div className='relative w-50 max-[1040px]:w-30 '>
                      <div
                        className='cursor-pointer px-2 py-1 bg-[#fff] rounded'
                        onClick={() => setShowDiemDiDropdown(!showDiemDiDropdown)}
                      >
                        {selectedDiemDi || t('Home_location.All')}
                      </div>
                      {showDiemDiDropdown && (
                        <div className='absolute left-0 top-full mt-1 bg-[#fff] border rounded shadow z-10 divide-y-1 divide-gray-500 w-full'>
                          {diemDi.map((item: any) => (
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
                    </div>
                  </div>

                  <div className='border-1 border-[#8aff73] rounded-[10px] px-2 py-1 flex items-center gap-2 relative'>
                    <i className='text-[#66ff47]'>
                      <Icon name='location' />
                    </i>

                    <div className='relative w-50 max-[1040px]:w-30'>
                      <div
                        className='cursor-pointer px-2 py-1 bg-[#fff] rounded'
                        onClick={() => setShowDiemDenDropdown(!showDiemDenDropdown)}
                      >
                        {selectedDiemDen || t('Home_location.All')}
                      </div>
                      {showDiemDenDropdown && (
                        <div className='absolute left-0 top-full mt-1 bg-[#fff] border rounded shadow z-10 divide-y-1 divide-gray-500  w-full'>
                          {diemDen.map((item: any) => (
                            <div
                              key={item.id}
                              className='px-3 py-1 hover:bg-[#e6ffe6]  cursor-pointer text-[14px]'
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
                    </div>
                  </div>
                </div>
                <div className='border-1 border-[#8aff73] rounded-[10px] px-2 py-1 flex items-center gap-2'>
                  <i className='text-[#66ff47]'>
                    <Icon name='calendar' />
                  </i>

                  <div className='relative w-50'>
                    <CalendarComponent />
                  </div>
                </div>
                <button
                  onClick={handleSeach}
                  className=' cursor-pointer group/button relative rounded-[10px] inline-flex items-center justify-center overflow-hidden   justify-self-center   bg-green-600 w-35 h-10  backdrop-blur-lg p-2 text-base font-semibold text-[#fff] transition-all duration-600 ease-in-out hover:bg-green-400   '
                >
                  <span className='text-[15px]'>{t('Home_button.FindTicket')}</span>
                  <div className='absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]'>
                    <div className='relative h-full w-10 bg-green-300' />
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div
            className='  bg-cover bg-no-repeat bg-center h-30 max-[450px]:h-20 max-[900px]:h-30 w-full flex items-end  '
            style={{ backgroundImage: `url(${duong})` }}
          >
            <img src={bus} className=' absolute h-15 max-[450px]:h-10 max-[900px]:h-15 bus-animation ' alt='' />
            <style>
              {`
        
              @keyframes busMove {
                0% {
                  right: -20px;
                  transform: translatey(0);
                }
                100% {
                 
                  right: 100%;
                }
              }
                .bus-animation {
                  animation: busMove 10s ease-out infinite;
                  position: absolute;
                }
              `}
            </style>
          </div>
        </section>
        <section className='   p-5'>
          <div className='text-center mb-10  max-[1800px]:px-[10%] px-[30%]'>
            <strong className=' text-[30px]  max-[330px]:text-[22px] '>{t('Home_Steps.Header.Title')}</strong>
            <p className='text-[#666] text-[13px] max-[1800px]:px-[10%] px-[30%]  max-[330px]:px-0  max-[330px]:text-[16px]'>
              {t('Home_Steps.Header.Description')}
            </p>
          </div>
          <div className=' grid grid-cols-3     gap-5   max-[1800px]:px-[10%] max-[1200px]:px-2 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-10 px-[25%] '>
            <div className='bg-[#fff] p-10 rounded-[10px] shadow-[#747474] shadow-sm transition duration-300 hover:shadow-2xl flex flex-col items-center gap-3'>
              <div className=' flex flex-col   '>
                <div className=' text-end z-2 mb-[-30px] mr-[-20px]'>
                  <span className=' bg-green-600 p-3 px-4 font-medium text-[#fff] rounded-full '>01</span>
                </div>
                <i className='   text-green-700 text-[30px] bg-[rgba(14,158,77,0.25)] px-7 py-6  bg-size-[20px] border-10 border-[rgba(14,158,77,0.1)] rounded-full'>
                  <Icon name='search' />
                </i>
              </div>
              <strong className='pt-2 text-[20px] min-w-max max-[330px]:text-[20px]'>
                {t('Home_Steps.Step1.Title')}
              </strong>
              <p className='px-[2%] text-center text-[12px] text-gray-500 '>{t('Home_Steps.Step1.Description')}</p>
            </div>

            <div className='bg-[#fff] p-10 rounded-[10px] shadow-[#747474] shadow-sm transition duration-300 hover:shadow-2xl flex flex-col items-center gap-3'>
              <div className=' flex flex-col   '>
                <div className=' text-end z-2 mb-[-30px] mr-[-20px]'>
                  <span className=' bg-green-600 p-3 px-4 font-medium text-[#fff] rounded-full '>02</span>
                </div>
                <i className='    text-green-700 text-[30px] bg-[rgba(14,158,77,0.25)] px-7 py-6  bg-size-[20px] border-10 border-[rgba(14,158,77,0.1)] rounded-full'>
                  <Icon name='ticket' />
                </i>
              </div>
              <strong className='pt-2  text-[20px] max-[330px]:text-[20px]'>{t('Home_Steps.Step2.Title')}</strong>
              <p className='px-[2%] text-center text-[12px] text-gray-500 '>{t('Home_Steps.Step2.Description')}</p>
            </div>

            <div className=' max-[900px]:col-span-2 max-[900px]:mx-[25%] max-[600px]:col-span-1 max-[600px]:mx-0  bg-[#fff] p-10 rounded-[10px] shadow-[#747474] shadow-sm transition duration-300 hover:shadow-2xl flex flex-col items-center gap-3'>
              <div className=' flex flex-col   '>
                <div className=' text-end z-2 mb-[-30px] mr-[-20px]'>
                  <span className=' bg-green-600 p-3 px-4 font-medium text-[#fff] rounded-full'>03</span>
                </div>
                <i className='   text-green-700 text-[30px] bg-[rgba(14,158,77,0.25)] px-7 py-6  bg-size-[20px] border-10 border-[rgba(14,158,77,0.1)] rounded-full'>
                  <Icon name='bill' />
                </i>
              </div>
              <strong className='pt-2 text-[20px] max-[330px]:text-[20px]'> {t('Home_Steps.Step3.Title')} </strong>
              <p className='px-[2%] text-center text-[12px] text-gray-500 '>{t('Home_Steps.Step3.Description')}</p>
            </div>
          </div>
        </section>

        <section className=' p-5'>
          <div>
            <div className='text-center mb-10 px-[20%] max-[1200px]:px-5 max-[1800px]:px-[10%] '>
              <strong className='text-[30px]  max-[330px]:text-[22px] '>{t('Home_Amenities.Header.Title')}</strong>
              <p className='text-[#666] text-[15px] max-[1800px]:px-[10%] px-[30%]  max-[330px]:px-0  max-[330px]:text-[16px]'>
                {t('Home_Amenities.Header.Description')}
              </p>
            </div>
            <div className='px-[30%]  max-[1200px]:px-5 max-[1800px]:px-[10%] max-[1950px]:px-[15%]'>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={2}
                loop={true}
                className='mySwiper'
                breakpoints={{
                  450: {
                    slidesPerView: 4,
                    spaceBetween: 30
                  }
                }}
              >
                {OurAmenities.map((amenity) => (
                  <SwiperSlide
                    key={amenity.id}
                    className='bg-[#fff] group   p-10  px-20 max-[1050px]:p-5 rounded-[10px]  cursor-pointer   transition-all duration-700 border-2 border-gray-300 hover:shadow-1xl hover:border-[#8dda7e] flex flex-col items-center gap-3 '
                  >
                    <div className='flex flex-col items-center gap-2'>
                      <i className='  text-[rgb(128,128,128)] border-b-5  text-[50px] max-[900px]:text-[50px] group-hover:text-[#0e9e4d]  '>
                        <Icon name={amenity.icon} />
                      </i>
                      <div className='text-[20px] text-[rgb(146,146,146)] max-[900px]:text-[20px] whitespace-nowrap  group-hover:text-[#0e9e4d] '>
                        {amenity.title}{' '}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
        <section className='bg-[#ececec] mt-10 p-5 '>
          <div className='text-center  max-[1200px]:px-5 max-[1800px]:px-[10%] px-[30%] max-[350px]:px-1'>
            <strong className=' text-[30px] max-[900px]:text-[30px]   max-[450px]:text-[25px] '>
              {t('Home_Testimonials.Header.Title')}
            </strong>
            <p className='text-[#666] text-[15px] px-[20%] max-[1200px]:px-5 max-[1800px]:px-[10%]  max-[900]:text-[16px]  max-[450px]:px-0 max-[450px]:text-[14px] '>
              {t('Home_Testimonials.Header.Description')}
            </p>
          </div>

          <div className='px-[30%] py-4 max-[1200px]:px-5 max-[1800px]:px-[20%]  max-[450px]:py-5 max-[350px]:px-1 '>
            <Feedback />
          </div>
        </section>
        <section className=' px-[30%] py-10 max-[1200px]:px-5 max-[1800px]:px-[10%] max-[1950px]:px-[20%] '>
          <div className='text-center m-10 max-[1200px]:m-5'>
            <strong className=' text-[30px] '>{t('Home_Post.Title')}</strong>
          </div>
          <BlogPost />
        </section>
      </div>
    </>
  )
}
export default Home
