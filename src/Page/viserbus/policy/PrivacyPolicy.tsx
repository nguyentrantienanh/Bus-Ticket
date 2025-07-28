import backgrondImage from '../../../assets/background.jpg'
import { useTranslation } from 'react-i18next'

function PrivacyPolicy() {
  const { t } = useTranslation('Policies')
  const items = [
    {
      title: t('privacyPolicy.items.title1'),
      content: t('privacyPolicy.items.content1')
    },
    {
      title: t('privacyPolicy.items.title2'),
      content: t('privacyPolicy.items.content2')
    },
    {
      title: t('privacyPolicy.items.title3'),
      content: t('privacyPolicy.items.content3')
    },
    {
      title: t('privacyPolicy.items.title4'),
      content: t('privacyPolicy.items.content4')
    },
    {
      title: t('privacyPolicy.items.title5'),
      content: t('privacyPolicy.items.content5')
    },
    {
      title: t('privacyPolicy.items.title6'),
      content: t('privacyPolicy.items.content6')
    },
    {
      title: t('privacyPolicy.items.title7'),
      content: t('privacyPolicy.items.content7')
    },
    {
      title: t('privacyPolicy.items.title8'),
      content: t('privacyPolicy.items.content8')
    }
  ]

  return (
    <>
      <div
        className='  w-full h-50 flex items-center justify-center  '
        style={{ backgroundImage: `url(${backgrondImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000068]  '>
          <h1 className='text-4xl font-bold mb-4 text-[#fff]  '>{t('privacyPolicy.title')}</h1>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-5 px-[10%] py-[5%] bg-[#f9f9f9] text-[16px] text-[#535455]  '>
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

export default PrivacyPolicy
