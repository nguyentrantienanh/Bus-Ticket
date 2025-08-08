import { useState } from 'react'
import background from '../../../../assets/background.jpg'
import Icon from '../../../../icons/Icon'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Createnew() {
  const { t } = useTranslation('SupportTicketCreateNew')
  const navigate = useNavigate()
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(1)
  const [chat, setChat] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chat || !description || !priority) {
      return alert(t('validation.fillAllFields'))
    }

    const newMessage = {
      id: 2,
      sender: 'user',
      text: chat,
      timestamp: new Date().toLocaleString()
    }
    const newchats = {
      id: Date.now(),
      description,
      lastMessage: '',
      status: 2,
      priority,
      timestamp: new Date().toLocaleString(),
      messages: [newMessage]
    }

    const userInfoRaw = localStorage.getItem('userInfo')
    const userListRaw = localStorage.getItem('userList')
    if (!userInfoRaw || !userListRaw) {
      return alert(t('validation.userInfoNotFound'))
    }
    const userInfo = JSON.parse(userInfoRaw)
    const userList = JSON.parse(userListRaw)
    const user = userList.find((item: any) => item.id === userInfo.id)
    if (!user) {
      return alert(t('validation.userNotFound'))
    }
    user.chats.push(newchats)
    localStorage.setItem('userList', JSON.stringify(userList))

    alert(t('success.chatCreated'))
    setDescription('')
    setPriority(1)
    setChat('')
    navigate('/user/support-ticket')
  }

  return (
    <>
      {/* Banner */}
      <div
        className='w-full h-48 flex items-center justify-center'
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='w-full h-full flex items-center justify-center bg-black/50'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#fff] drop-shadow-lg'>{t('title')}</h1>
        </div>
      </div>

      {/* Form Container */}
      <div className='max-w-4xl mx-auto my-8 px-4'>
        <form onSubmit={handleSubmit} className='bg-[#fff] rounded-xl shadow-lg p-6 space-y-6 border border-gray-200'>
          {/* Description & Priority */}
          <div className='grid gap-6 sm:grid-cols-2'>
            <div className='flex flex-col'>
              <label className='text-sm sm:text-base font-semibold text-gray-700 mb-2'>
                {t('form.description.label')} <sup className='text-red-600'>{t('form.description.required')}</sup>
              </label>
              <input
                type='text'
                placeholder={t('form.description.placeholder')}
                className='p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-sm sm:text-base font-semibold text-gray-700 mb-2'>
                {t('form.priority.label')} <sup className='text-red-600'>{t('form.priority.required')}</sup>
              </label>
              <select
                className='p-3 border  cursor-pointer border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition'
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
              >
                <option value='1'>{t('form.priority.options.high')}</option>
                <option value='2'>{t('form.priority.options.medium')}</option>
                <option value='3'>{t('form.priority.options.low')}</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className='text-sm sm:text-base font-semibold text-gray-700 mb-2 block'>
              {t('form.message.label')} <sup className='text-red-600'>{t('form.message.required')}</sup>
            </label>
            <textarea
              placeholder={t('form.message.placeholder')}
              className='p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition w-full h-40 resize-none'
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            ></textarea>
          </div>

          {/* Submit */}
          <div className='flex justify-end'>
            <button
              type='submit'
              className='flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-[#fff] bg-green-600 hover:bg-green-700 transition-all shadow-md hover:shadow-lg'
            >
              <Icon name='send' /> {t('button.submit')}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
