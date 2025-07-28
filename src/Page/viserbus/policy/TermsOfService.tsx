import backgrondImage from '../../../assets/background.jpg'
import { useTranslation } from 'react-i18next'

function TermsOfService() {
  const { t } = useTranslation('Policies')
  const items = [
    {
      title: t('termsOfService.items.title1'),
      content: t('termsOfService.items.content1')
    },
    {
      title: t('termsOfService.items.title2'),
      content: t('termsOfService.items.content2')
    },
    {
      title: t('termsOfService.items.title3'),
      content: t('termsOfService.items.content3')
    },
    {
      title: t('termsOfService.items.title4'),
      content: t('termsOfService.items.content4')
    },
    {
      title: t('termsOfService.items.title5'),
      content: t('termsOfService.items.content5')
    },
    {
      title: t('termsOfService.items.title6'),
      content: t('termsOfService.items.content6')
    },
    {
      title: t('termsOfService.items.title7'),
      content: t('termsOfService.items.content7')
    },
    {
      title: t('termsOfService.items.title8'),
      content: t('termsOfService.items.content8')
    },
    {
      title: t('termsOfService.items.title9'),
      content: t('termsOfService.items.content9')
    },
    {
      title: t('termsOfService.items.title10'),
      content: t('termsOfService.items.content10')
    },
    {
      title: t('termsOfService.items.title11'),
      content: t('termsOfService.items.content11')
    },
    {
      title: t('termsOfService.items.title12'),
      content: t('termsOfService.items.content12')
    },
    {
      title: t('termsOfService.items.title13'),
      content: t('termsOfService.items.content13')
    },
    {
      title: t('termsOfService.items.title14'),
      content: t('termsOfService.items.content14')
    }
  ]

  return (
    <>
      <div
        className='  w-full h-50 flex items-center justify-center  '
        style={{ backgroundImage: `url(${backgrondImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000068]  '>
          <h1 className='text-4xl font-bold mb-4 text-[#fff]  '>{t('termsOfService.title')}</h1>
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

export default TermsOfService
