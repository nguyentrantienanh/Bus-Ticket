import backgroundContact from '../assets/background.jpg'
import Icon from '../icons/Icon'
import { useTranslation } from 'react-i18next'

function Contact() {
  const { t } = useTranslation('Contact')
  return (
    <>
      <div
        className=' w-full h-50 flex items-center justify-center  '
        style={{ backgroundImage: `url(${backgroundContact})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className=' w-full h-full flex items-center justify-center bg-[#00000068] '>
          <h1 className='text-4xl font-bold mb-4 text-[#fff]  '>{t('title')}</h1>
        </div>
      </div>
      <section className='flex flex-col md:gap-5 gap-2 xl:px-[15%] bg-[#f9f9f9]'>
        <div className='flex py-10 flex-col gap-3 items-center'>
          <strong className='text-[30px]  font-bold'>{t('letsGetInTouch')}</strong>
          <span className='text-[16px]  px-5   text-gray-600'>{t('subtitle')}</span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 px-5'>
          <div className='w-full h-30 flex border-1 py-5 px-2 lg:px-5 border-[#0e9e4d] gap-3 rounded-2xl'>
            <i className=' text-2xl text-[#0e9e4d] pt-1'>
              <Icon name='address' />
            </i>
            <div className='items-start flex flex-col'>
              <strong className='text-[20px] sm:text-[20px] lg:text-[24px] '>{t('addressTitle')}</strong>
              <p className='text-[16px] text-gray-300'>{t('address')}</p>
            </div>
          </div>
          <div className='w-full h-30 flex border-1 py-5 px-2 lg:px-5 border-[#0e9e4d] gap-3 rounded-2xl'>
            <i className=' text-2xl text-[#0e9e4d] pt-1'>
              <Icon name='phone' />
            </i>
            <div className='items-start flex flex-col'>
              <strong className='text-[20px] sm:text-[20px] lg:text-[24px]'>{t('callTitle')}</strong>
              <p className='text-[16px] text-gray-300'>{t('phone')}</p>
            </div>
          </div>
          <div className='w-full h-30 flex border-1 py-5 px-2 lg:px-5 border-[#0e9e4d] gap-3 rounded-2xl'>
            <i className=' text-2xl text-[#0e9e4d] pt-1'>
              <Icon name='email' />
            </i>
            <div className='items-start flex flex-col'>
              <strong className='text-[20px] sm:text-[20px] lg:text-[24px]'>{t('emailTitle')}</strong>
              <p className='text-[16px] text-gray-300'>{t('email')}</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 px-5 md:py-5 mb-1'>
          <div className='w-full h-full p-5  shadow-lg rounded-lg'>
            <form action='' className='flex flex-col md:gap-3'>
              <strong>{t('formTitle')}</strong>
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='block mt-1 md:mt-4'>
                    {t('name')} <sup className='text-[#ff2020]'>*</sup>
                  </label>
                  <input type='text' className='w-full p-2 border border-gray-300 rounded-lg' placeholder={t('name')} />
                </div>
                <div>
                  <label className='block mt-1 md:mt-4'>
                    {t('emailLabel')} <sup className='text-[#ff2020]'>*</sup>
                  </label>
                  <input
                    type='email'
                    className='w-full p-2 border border-gray-300 rounded-lg'
                    placeholder={t('emailLabel')}
                  />
                </div>
              </div>
              <div>
                <label className='block mt-1 md:mt-4'>
                  {t('subject')} <sup className='text-[#ff2020]'>*</sup>
                </label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  placeholder={t('subject')}
                />
              </div>
              <div>
                <label className='block mt-1 md:mt-4'>
                  {t('message')} <sup className='text-[#ff2020]'>*</sup>
                </label>
                <textarea
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  placeholder={t('message')}
                  rows={5}
                ></textarea>
              </div>
              <div>
                <button
                  type='submit'
                  className='bg-[#0e9e4d] text-[#fff] px-5 py-2 rounded-lg mt-1 md:mt-4 hover:bg-[#0e9e4d]/80 transition-all duration-300'
                >
                  {t('send')}
                </button>
              </div>
            </form>
          </div>
          <div className='w-full h-full shadow-lg rounded-lg mb-1 '>
            <iframe
              className=' w-full h-full'
              data-src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15596.876986944912!2d109.1959979!3d12.233429!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317067afcd045dbf%3A0x4feb318618fc1dcf!2sAdamas%20Boutique%20Hotel!5e0!3m2!1svi!2s!4v1714620728105!5m2!1svi!2s'
              loading='lazy'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.0987161162216!2d109.17483147406307!3d12.241594888010708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170678749018e2f%3A0x4b0e1e18074eb956!2zQ8O0bmcgdHkgY-G7lSBwaOG6p24gU3dlZXRTb2Z0!5e0!3m2!1svi!2s!4v1748595952346!5m2!1svi!2s'
            ></iframe>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
