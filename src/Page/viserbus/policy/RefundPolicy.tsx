import backgrondImage from '../../../assets/background.jpg'
import { useTranslation } from 'react-i18next'

function RefundPolicy() {
  const { t } = useTranslation('Policies')
  const items = [
    {
      title: t('refundPolicy.items.title1'),
      content: t('refundPolicy.items.content1')
    },
    {
      title: t('refundPolicy.items.title2'),
      content: t('refundPolicy.items.content2')
    },
    {
      title: t('refundPolicy.items.title3'),
      content: t('refundPolicy.items.content3')
    },
    {
      title: t('refundPolicy.items.title4'),
      content: t('refundPolicy.items.content4')
    }
  ]

  return (
    <>
      <div
        className='w-full h-50 flex items-center justify-center'
        style={{ backgroundImage: `url(${backgrondImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000068]'>
          <h1 className='text-4xl font-bold mb-4 text-[#fff]'>{t('refundPolicy.title')}</h1>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 px-[10%] py-[5%] bg-[#f9f9f9] text-[16px] text-[#535455]'>
        {items.map((item, idx) => (
          <div key={idx} className='flex flex-col gap-2'>
            <strong className='text-[22px]'>{item.title}</strong>
            <span className='text-[#6c757d]'>{item.content}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default RefundPolicy
