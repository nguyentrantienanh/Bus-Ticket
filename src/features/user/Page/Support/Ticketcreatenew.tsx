import { useState } from 'react'
import backgruond from '../../../../assets/background.jpg'
import Icon from '../../../../icons/Icon'
import { useNavigate } from 'react-router-dom'
export default function Createnew() {
  const navigate = useNavigate()
  // hàm xử lý lưu localStorage chat gồm [ id, description ,lastMessge, , Last Reply,  messages[id, sender, text, timestamp],Status,Priority ]

  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(1) // 1: Hight, 2: Medium, 3: Low
  const [chat, setChat] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chat || !description || !priority) {
      return alert('Vui lòng nhập đầy đủ thông tin')
    }
    // message
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
    // lưu vào localStorage userlist[ chats[]]
    const userInfoRaw = localStorage.getItem('userInfo')
    const userListRaw = localStorage.getItem('userList')
    if (!userInfoRaw || !userListRaw) {
      return alert('Không tìm thấy thông tin người dùng')
    }
    const userInfo = JSON.parse(userInfoRaw)
    const userList = JSON.parse(userListRaw)
    const user = userList.find((item: any) => item.id === userInfo.id)
    if (!user) {
      return alert('Không tìm thấy người dùng')
    }
    // Thêm chat mới vào danh sách chats của người dùng
    user.chats.push(newchats)
    // Cập nhật lại danh sách người dùng
    localStorage.setItem('userList', JSON.stringify(userList))

    alert('Tạo chat thành công')
    setDescription('')
    setPriority(1)
    setChat('')
    navigate('/user/support-ticket')
  }

  return (
    <>
      <div
        className=' w-full h-50 flex items-center justify-center  '
        style={{ backgroundImage: `url(${backgruond})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000041]  '>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#fff]  '> Open Ticket</h1>
        </div>
      </div>
      <div className=' m-15  mx-[10%]  shadow-[0_5px_25px_rgba(0,0,0,0.25)]  p-4  border-1  rounded-[10px] border-gray-200 '>
        <form action='' className='m-2'>
          <div className='grid gap-3 sm:gap-20 grid-cols-1 sm:grid-cols-2  '>
            <div className='flex flex-col'>
              <label className=' text-[15px] sm:text-[18px] block text-sm font-medium text-gray-700' htmlFor=''>
                Description<sup className='text-red-600'>*</sup>
              </label>
              <input
                className='p-2 border-1 rounded-[10px] border-gray-200  shadow-sm focus:outline-none focus:ring-green-500 focus:shadow-green-300 focus:border-green-500'
                type='text'
                placeholder='Vé bị lỗi'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className=' flex flex-col'>
              <label className=' text-[15px] sm:text-[18px] block text-sm font-medium text-gray-700' htmlFor=''>
                Priority<sup className='text-red-600'>*</sup>
              </label>
              <select
                className='p-2 border-1 rounded-[10px] border-gray-200  shadow-sm focus:outline-none focus:ring-green-500 focus:shadow-green-300 focus:border-green-500'
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
              >
                <option value='1'>Hight</option>
                <option value='2'>Medium</option>
                <option value='3'>Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className='  text-[15px] sm:text-[18px] block text-sm font-medium text-gray-700' htmlFor='message'>
              Message<sup className='text-red-600'>*</sup>
            </label>
            <textarea
              className='p-2 border-1 rounded-[10px] border-gray-200  shadow-sm focus:outline-none focus:ring-green-500 focus:shadow-green-300 focus:border-green-500 w-full h-[150px]'
              name='message'
              id='message'
              placeholder='Nhập tin nhắn của bạn...'
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            ></textarea>
          </div>
          <div>
            <div className='flex max-sm:flex-col-reverse max-sm:gap-2   '>
              <button
                onClick={handleSubmit}
                className='text-[14px] ml-auto  flex px-2 sm:px-20 py-2 rounded-[5px] font-medium text-[#fff] bg-green-600'
              >
                <i className='px-2'>
                  <Icon name='send' />
                </i>
                Gửi
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
