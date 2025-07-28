import backgrondImage from '../../../assets/background.jpg'
import { useTranslation } from 'react-i18next'

function TicketPolicy() {
  const { t } = useTranslation('Policies')
  const items = [
    {
      title: t('ticketPolicy.items.title1'),
      content: t('ticketPolicy.items.content1')
    },
    {
      title: t('ticketPolicy.items.title2'),
      content: t('ticketPolicy.items.content2')
    },
    {
      title: t('ticketPolicy.items.title3'),
      content: t('ticketPolicy.items.content3')
    },
    {
      title: t('ticketPolicy.items.title4'),
      content: t('ticketPolicy.items.content4')
    },
    {
      title: t('ticketPolicy.items.title5'),
      content: t('ticketPolicy.items.content5')
    },
    {
      title: t('ticketPolicy.items.title6'),
      content: t('ticketPolicy.items.content6')
    },
    {
      title: t('ticketPolicy.items.title7'),
      content: t('ticketPolicy.items.content7')
    },
    {
      title: t('ticketPolicy.items.title8'),
      content: t('ticketPolicy.items.content8')
    },
    {
      title: t('ticketPolicy.items.title9'),
      content: t('ticketPolicy.items.content9')
    },
    {
      title: t('ticketPolicy.items.title10'),
      content: t('ticketPolicy.items.content10')
    }
  ]

  return (
    <>
      <div
        className='w-full h-50 flex items-center justify-center'
        style={{ backgroundImage: `url(${backgrondImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000068]'>
          <h1 className='text-4xl font-bold mb-4 text-[#fff]'>{t('ticketPolicy.title')}</h1>
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

export default TicketPolicy
