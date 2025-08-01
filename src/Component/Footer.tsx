import logo from '../assets/logo/Bus_Ticker_Footer.png'
import Icon from '../icons/Icon'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function Footer() {
  const { t } = useTranslation('Footer')
  return (
    <footer className='   bg-gray-800 grid grid-cols-5 max-[900px]:grid-cols-2  max-[450px]:grid-cols-1 max-[900px]:items-center  max-[450px]:pr-0  max-[450px]:pl-5  px-5 text-[#f5f5f5] py-4'>
      <section className='   flex flex-col col-span-2 max-[900px]:col-span-1  max-[900px]:py-5  gap-4'>
         
        <span className='  pr-5  mt-[-30px]'><img src={logo} className='h-30 w-30 ' alt='' />{t('Footer_Info.text')}</span>
        <span className='flex gap-4 text-2xl'>
          <Icon name='facebook' />
          <Icon name='twitter' />
          <Icon name='instagram' />
          <Icon name='youtube' />
        </span>
      </section>
      <section className=' w-full items-center justify-center max-[900px]:py-5 max-[900px]:px-20  max-[450px]:px-0 '>
        <div className='mb-5'>
          <h1 className='font-bold text-[22px] text-[#12cb62]'>{t('Footer_Useful.title')}</h1>
          <div className=' items-center '>
            <div className='w-20 h-0.5 bg-[#0E9E4Db3] mb-1'></div>
            <div className='w-10 h-0.5 bg-[#0E9E4Db3]'></div>
          </div>
        </div>
        <div>
          <ul className='flex justify-self-start  flex-col gap-4 max-[450px]:divide-y-2 w-full divide-[#b3b3b354]'>
            <Link to='/about'>
              <li className='hover:text-[#1ba000] transition-all duration-300 cursor-pointer'>
                <i className='pr-3'>
                  <Icon name='arrow-right' />
                </i>
                {t('Footer_Useful.link.About')}
              </li>{' '}
            </Link>
            <Link to='/faqs'>
              <li className='hover:text-[#1ba000] transition-all duration-300 cursor-pointer'>
                <i className='pr-3'>
                  <Icon name='arrow-right' />
                </i>
                {t('Footer_Useful.link.Faqs')}
              </li>{' '}
            </Link>
            <Link to='/blog'>
              <li className='hover:text-[#1ba000] transition-all duration-300 cursor-pointer'>
                <i className='pr-3'>
                  <Icon name='arrow-right' />
                </i>
                {t('Footer_Useful.link.Blog')}
              </li>{' '}
            </Link>
            <Link to='/contact'>
              <li className='hover:text-[#1ba000] transition-all duration-300 cursor-pointer'>
                <i className='pr-3'>
                  <Icon name='arrow-right' />
                </i>
                {t('Footer_Useful.link.Contact')}
              </li>{' '}
            </Link>
          </ul>
        </div>
      </section>

      <section className=' w-full justify-self-start max-[900px]:py-5   '>
        <div className='mb-5'>
          <h1 className='font-bold text-[22px] text-[#12cb62]'>{t('Footer_Policies.title')}</h1>
          <div className=' items-center '>
            <div className='w-20 h-0.5 bg-[#0E9E4Db3] mb-1'></div>
            <div className='w-10 h-0.5 bg-[#0E9E4Db3]'></div>
          </div>
        </div>
        <div>
          <ul className='flex justify-self-start  flex-col gap-4  max-[450px]:divide-y-2 w-full divide-[#b3b3b354] '>
            <Link to='viserbus/policy/privacy-policy'>
              <li className='hover:text-[#1ba000] transition-all py-1 duration-300 cursor-pointer'>
                <i className='pr-3'>
                  <Icon name='arrow-right' />
                </i>
                {t('Footer_Policies.link.PrivacyPolicy')}
              </li>{' '}
            </Link>
            <Link to='viserbus/policy/terms-of-service'>
              <li className='hover:text-[#1ba000] py-1 transition-all duration-300 cursor-pointer'>
                <i className='pr-3'>
                  <Icon name='arrow-right' />
                </i>
                {t('Footer_Policies.link.TermsOfService')}
              </li>
            </Link>
            <Link to='viserbus/policy/ticket-policy'>
              <li className='hover:text-[#1ba000] py-1 transition-all duration-300 cursor-pointer'>
                <i className='pr-3'>
                  <Icon name='arrow-right' />
                </i>
                {t('Footer_Policies.link.TicketPolicy')}
              </li>
            </Link>
            <Link to='viserbus/policy/refund-policy'>
              <li className='hover:text-[#1ba000] transition-all duration-300 cursor-pointer'>
                <i className='pr-3'>
                  <Icon name='arrow-right' />
                </i>
                {t('Footer_Policies.link.RefundPolicy')}
              </li>
            </Link>
          </ul>
        </div>
      </section>

      <section className=' w-full justify-self-start max-[900px]:py-5 max-[900px]:px-20  max-[450px]:px-0'>
        <div className='mb-5'>
          <h1 className='font-bold text-[22px] text-[#12cb62]'>{t('Footer_Contact.title')}</h1>
          <div className=' items-center '>
            <div className='w-20 h-0.5 bg-[#0E9E4Db3] mb-1'></div>
            <div className='w-10 h-0.5 bg-[#0E9E4Db3]'></div>
          </div>
        </div>
        <div>
          <ul className='flex justify-self-start  flex-col gap-4 '>
            <li className='hover:text-[#1ba000] transition-all duration-300 cursor-pointer'>
              <i className='pr-3'>
                <Icon name='gps' />
              </i>
              {t('Footer_Contact.address')}
            </li>
            <li className='hover:text-[#1ba000] transition-all duration-300 cursor-pointer'>
              <i className='pr-3'>
                <Icon name='phone' />
              </i>
              +84 972364028
            </li>
            <li className='hover:text-[#1ba000] transition-all duration-300 cursor-pointer'>
              <i className='pr-3'>
                <Icon name='email' />
              </i>
              nttanh@gmail.com
            </li>
          </ul>
        </div>
      </section>
    </footer>
  )
}
export default Footer
