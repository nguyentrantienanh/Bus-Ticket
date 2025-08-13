import { useState } from 'react'
import Icon from '../../icons/Icon' // Assuming you have an Icon component for icons
import { useTranslation } from 'react-i18next'

function FAQ() {
  const { t } = useTranslation('Faq')

  const faqsright = [
    {
      id: 1,
      question: t('faqs.question1'),
      answer: t('faqs.answer1')
    },
    {
      id: 2,
      question: t('faqs.question2'),
      answer: t('faqs.answer2')
    },
    {
      id: 3,
      question: t('faqs.question3'),
      answer: t('faqs.answer3')
    }
  ]
  const faqsleft = [
    {
      id: 4,
      question: t('faqs.question4'),
      answer: t('faqs.answer4')
    },
    {
      id: 5,
      question: t('faqs.question5'),
      answer: t('faqs.answer5')
    },
    {
      id: 6,
      question: t('faqs.question6'),
      answer: t('faqs.answer6')
    }
  ]

  const [openIdrigth, setOpenIdright] = useState<number | null>(null)
  const [openIdleft, setOpenIdleft] = useState<number | null>(null)

  const [isclickedright, setIsClickedrigth] = useState(false)
  const [isclickedleft, setIsClickedleft] = useState(false)

  const handleToggleright = (id: number) => {
    setOpenIdright(openIdrigth === id ? null : id)
    setIsClickedrigth(!isclickedright)
  }
  const handleToggleleft = (id: number) => {
    setOpenIdleft(openIdleft === id ? null : id)
    setIsClickedleft(!isclickedleft)
  }

  return (
    <>
      <div className='pt-10'>
        <div className='  flex flex-col items-center justify-center text-center xl:px-30 '>
          <h1 className=' font-bold mb-6 text-[18px] sm:text-1xl lg:text-3xl'>{t('title')}</h1>
          <p className='text-[14px]  sm:text-[15px] lg:text-[16px]'>{t('description')}</p>
        </div>

        <section className='grid grid-cols-1 md:grid-cols-2 gap-5 px-10  py-5 bg-[#ffffff]  '>
          <div className=' '>
            <div className={`flex flex-col gap-5  md:h-full  `}>
              {faqsleft.map((faq) => (
                <div key={faq.id} className=' '>
                  <h2
                    className=' font-semibold cursor-pointer p-4  border-2 border-[#1db000]    text-[14px]  sm:text-[15px] lg:text-[16px]'
                    onClick={() => handleToggleleft(faq.id)}
                  >
                    <i className=' text-[#1db000] '>
                      {isclickedleft ? (
                        <i className='pr-2 '>
                          <Icon name='dow' />
                        </i>
                      ) : (
                        <i className='pr-2'>
                          <Icon name='up' />
                        </i>
                      )}
                    </i>
                    {faq.question}
                  </h2>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIdleft === faq.id ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className='text-gray-700 text-[14px]  sm:text-[15px] lg:text-[16px]'>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=' '>
            <div className='flex flex-col gap-5 md:h-full'>
              {faqsright.map((faq) => (
                <div key={faq.id} className=' '>
                  <h2
                    className='  font-semibold cursor-pointer p-4 border-2 border-[#1db000]  text-[14px]  sm:text-[15px] lg:text-[16px]'
                    onClick={() => handleToggleright(faq.id)}
                  >
                    <i className=' text-[#1db000] '>
                      {isclickedright ? (
                        <i className='pr-2'>
                          <Icon name='dow' />
                        </i>
                      ) : (
                        <i className='pr-2'>
                          <Icon name='up' />
                        </i>
                      )}
                    </i>
                    {faq.question}
                  </h2>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIdrigth === faq.id ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className='text-gray-700 text-[14px]  sm:text-[15px] lg:text-[16px]'>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default FAQ
