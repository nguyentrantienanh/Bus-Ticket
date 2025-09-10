import { useState } from 'react'
import background from '../../../../assets/background.jpg'
import Icon from '../../../../icons/Icon'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { createChat, sendMessage } from '../../../../api/chatUserApi'

export default function Createnew() {
  const { t } = useTranslation('SupportTicketCreateNew')
  const navigate = useNavigate()

  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(1)
  const [chat, setChat] = useState('')
  const [submitting, setSubmitting] = useState(false) // ⬅️ NEW

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return // ⬅️ chặn double click trong lúc đang gửi

    if (!chat || !description || !priority) {
      return alert(t('validation.fillAllFields'))
    }

    const userInfoRaw = localStorage.getItem('userInfo')
    if (!userInfoRaw) {
      return alert(t('validation.userInfoNotFound'))
    }
    const userInfo = JSON.parse(userInfoRaw)

    try {
      setSubmitting(true) // ⬅️ bật loading

      // 1) tạo chat
      const res = await createChat(userInfo.id, description, priority)
      const newChat = res.data.chat

      // 2) gửi tin nhắn đầu tiên
      await sendMessage(userInfo.id, newChat._id, 'user', chat)

      alert(t('success.chatCreated'))
      setDescription('')
      setPriority(1)
      setChat('')
      navigate('/user/support-ticket')
    } catch (err: any) {
      alert('Lỗi khi tạo chat: ' + (err?.response?.data?.message || err.message))
    } finally {
      setSubmitting(false) // ⬅️ tắt loading dù thành công hay lỗi
    }
  }

  return (
    <>
      {/* Banner */}
      <div
        className='w-full h-48 flex items-center justify-center'
        style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-black/50'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#fff] drop-shadow-lg'>{t('title')}</h1>
        </div>
      </div>

      {/* Form Container */}
      <div className='max-w-4xl mx-auto my-8 px-4 relative'>
        {/* Overlay loading toàn form (tùy chọn) */}
        {submitting && (
          <div className='absolute inset-0 z-10 flex items-center justify-center  bg-[#ffffff9e] rounded-xl'>
            <div className='flex items-center gap-2 text-green-700 font-semibold'>
              <i className='animate-spin'>
                <Icon name='loading' />
              </i>
              <span>Đang gửi...</span>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`bg-[#fff] rounded-xl shadow-lg p-6 space-y-6 border border-gray-200 ${submitting ? 'pointer-events-none opacity-70' : ''}`}
        >
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
                disabled={submitting} // ⬅️ disable
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-sm sm:text-base font-semibold text-gray-700 mb-2'>
                {t('form.priority.label')} <sup className='text-red-600'>{t('form.priority.required')}</sup>
              </label>
              <select
                className='p-3 border cursor-pointer border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition'
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                disabled={submitting} // ⬅️ disable
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
              disabled={submitting} // ⬅️ disable
            />
          </div>

          {/* Submit */}
          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={submitting} // ⬅️ khóa nút trong lúc gửi
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-[#fff] shadow-md hover:shadow-lg transition-all
                ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
              `}
            >
              {submitting ? (
                <>
                  <i className='animate-spin'>
                    {' '}
                    <Icon name='loading' />
                  </i>
                  <span>Đang gửi...</span>
                </>
              ) : (
                <>
                  <Icon name='send' /> {t('button.submit')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
