import backgroundAbout from '../assets/background.jpg'
import AboutBus from '../assets/about/aboutbus.jpg'
import FAQ from './FAQ/FAQ'
import { useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation('About')
  return (
    <>
      <div
        className='  w-full h-50 flex items-center justify-center  '
        style={{ backgroundImage: `url(${backgroundAbout})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000068]  '>
          <h1 className=' font-bold mb-4 text-[#fff] text-[20px] sm:text-2xl lg:text-4xl   '>{t('title')}</h1>
        </div>
      </div>

      <section className='grid grid-cols-1 gap-5 px-5 py-5 bg-[#f9f9f9] xl:px-[20%]'>
        <div className=' grid grid-cols-1 md:grid-cols-2'>
          <div className='p-1'>
            <strong className='  items-center justify-center flex md:justify-start md:items-start text-[18px] sm:text-1xl lg:text-3xl '>
              {t('knowFewWords')}
            </strong>
            <p className='text-[14px]  sm:text-[15px] lg:text-[16px]'>{t('knowFewWordsContent')}</p>
            <span className='text-[14px] sm:text-[15px] lg:text-[16px]'>{t('knowFewWordsDescription')}</span>
          </div>
          <div>
            {' '}
            <img src={AboutBus} alt='' />
          </div>
        </div>
        <div className='   '>
          <strong className='text-[18px] sm:text-1xl lg:text-3xl'>{t('aboutUs')}</strong>
          <span className='text-[14px] sm:text-[15px] px-2 lg:text-[16px]'>{t('aboutUsContent')}</span>
        </div>
        <div className='flex flex-col gap-3'>
          <strong className='text-[18px] sm:text-1xl lg:text-3xl'>{t('whyChooseUs')}</strong>
          <span className='text-[14px]  sm:text-[15px] lg:text-[16px]'>{t('whyChooseUsContent')}</span>

          <ul className='list-disc pl-5 text-[14px]  sm:text-[15px] lg:text-[16px]'>
            <li>{t('benefits.freeCancellation')}</li>
            <li>{t('benefits.instantRefunds')}</li>
            <li>{t('benefits.easyBooking')}</li>
            <li>{t('benefits.cashback')}</li>
            <li>{t('benefits.bestPrice')}</li>
            <li>{t('benefits.customerSupport')}</li>
          </ul>
        </div>
        <div>
          <FAQ />
        </div>
      </section>
    </>
  )
}

export default About
