import thumd1 from '../../../../assets/blog/thumb_1.png'
import { BlogData } from '../../../../Data/Blog'
import Icon from '../../../../icons/Icon'
import { useTranslation } from 'react-i18next'

function Blog1() {
  const blagPost = BlogData()
  const { t } = useTranslation('Content')
  return (
    <section>
      <div className='flex flex-col bg-[#fff]  justify-center py-10'>
        <img src={thumd1} alt='Blog Thumbnail' className='w-full h-full object-cover mb-5' />
        <div className='flex   gap-3 text-gray-500'>
          <span className=' text-[#40c640] '>
            <Icon name='calendar' />
          </span>
          <span className='text-sm mb-3'>{blagPost[0].date}</span>
        </div>
        <strong className='text-[27px] font-semibold  '> {blagPost[0].title}</strong>
        <div className='flex flex-col my-4'>
          <strong className=' text-[20px] text-gray-700'>{t('blog1.section1_title')}</strong>
          <span className='text-gray-500 '>{t('blog1.section1_content')}</span>
        </div>
        <div className='  bg-gray-200 p-7 text-gray-500 text-center text-[17px] border-l-4 border-[#40c640]'>
          <p className=' '>{t('blog1.section2')}</p>
        </div>
        <div className='flex flex-col my-4'>
          <strong className=' text-[20px] text-gray-700'>{t('blog1.section3_title')}</strong>
          <span className='text-gray-500 '>{t('blog1.section3_content')}</span>
        </div>
        <div className='flex flex-col my-4'>
          <strong className=' text-[20px] text-gray-700'>{t('blog1.section4_title')}</strong>
          <span className='text-gray-500 '>{t('blog1.section4_content')}</span>
        </div>
        <div className='flex gap-4 items-center  h-10  mt-5'>
          <strong className=' text-[20px] text-gray-700'>Share On</strong>
          <span className='flex gap-3  '>
            <Icon name='facebook' />
            <Icon name='twitter' />
            <Icon name='youtube' />
            <Icon name='instagram' />
          </span>
        </div>
      </div>
    </section>
  )
}

export default Blog1
