import FAQ from './FAQ/FAQ'
import BlogPost from './Blog/components/Blog_Post'
import backgroundFAQs from '../assets/background.jpg'
import { useTranslation } from 'react-i18next'
function Faqs() {
  const { t } = useTranslation('Faq')
  return (
    <>
      <div
        className='  w-full h-50 flex items-center justify-center  '
        style={{ backgroundImage: `url(${backgroundFAQs})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000068]  '>
          <h1 className='  font-bold mb-4 text-[#fff] text-[18px] sm:text-1xl lg:text-3xl '>{t('FAQs')}</h1>
        </div>
      </div>
      <section className='flex flex-col gap-20 xl:px-[20%]'>
        <FAQ />

        <BlogPost />
      </section>
    </>
  )
}
export default Faqs
