import { Swiper, SwiperSlide } from 'swiper/react'
import feedbackMe from '../../assets/feedback/me.jpg'
import { Autoplay } from 'swiper/modules'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Feedback() {
  const { t } = useTranslation('Home')
  const images = [
    {
      id: 1,
      src: feedbackMe,
      title: t('Home_Testimonials.Testimonials.Testimonial1.Name'),
      longDescription: t('Home_Testimonials.Testimonials.Testimonial1.Comment')
    },
    {
      id: 2,
      src: feedbackMe,
      title: t('Home_Testimonials.Testimonials.Testimonial2.Name'),
      longDescription: t('Home_Testimonials.Testimonials.Testimonial2.Comment')
    },
    {
      id: 3,
      src: feedbackMe,
      title: t('Home_Testimonials.Testimonials.Testimonial3.Name'),
      longDescription: t('Home_Testimonials.Testimonials.Testimonial3.Comment')
    }
  ]

  const [feedbackIndex, setFeedbackIndex] = useState(0)

  return (
    <div className=' '>
      <div className=' relative '>
        <div className=' bg-[#fff] p-10  max-[900px]:p-5 max-[450px]:p-1 max-[350px]:px-1'>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            onSlideChange={(swiper) => setFeedbackIndex(swiper.realIndex)}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {images.map((image) => (
              <SwiperSlide key={image.id} className='p-5 bg-[#fff]  '>
                <p className='text-gray-600 mt-2 text-center text-[16px] max-[900px]:text-[14px]  '>
                  {image.longDescription}
                </p>
                <div className='justify-center items-center flex m-4'>
                  <img
                    src={image.src}
                    alt={image.title}
                    className='  w-40 h-40 max-[1800px]:w-30 max-[1800px]:h-30 max-[900px]:h-20 max-[900px]:w-20  text-center object-cover object-top  bg-amber-200 rounded-full'
                  />
                </div>

                <h2 className=' mb-4 max-[350px]:mb-10 text-xl font-semibold text-center'>{image.title}</h2>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='absolute z-1 mt-[-30px] left-[50%] translate-x-[-50%]  max-[450px]:mt-[-20px]'>
          <ul className='flex justify-center '>
            {images.map((image, index) => (
              <li
                key={image.id}
                className={`cursor-pointer inline-block mx-1 w-10 h-3 rounded-full ${feedbackIndex === index ? 'bg-[#1ba000]' : 'bg-gray-300'}`}
                onClick={() => setFeedbackIndex(index)}
              ></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Feedback
