import { useState, useEffect, useRef } from 'react'
import Icon from '../icons/Icon'
import axios from 'axios'

export default function Messages() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [show, setShow] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [Datamessage, setDatamessage] = useState([
    {
      id: 1,
      sender: 'Bot',
      text: 'Xin chào! Bạn cần hỗ trợ gì?',
      timestamp: new Date().toLocaleString()
    }
  ])
  const [istext, setistext] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !open) {
        setScrolled(true)
        setOpen(true)
      } else if (window.scrollY <= 50) {
        setOpen(false)
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [open])
  
  const supportUrl = `${import.meta.env.VITE_WEBSITE_URL}/user/support/chat`
  async function callGeminiFlash(usermessage: string) {
    try {
      const web = `Đây là website về Bus Ticket: ${import.meta.env.VITE_WEBSITE_URL} 
 
      Giới thiệu website: Xác định rõ đây là website bán vé xe Bus Ticket, chỉ trả lời các câu hỏi liên quan đến website này.

      Chủ đề hỗ trợ: Chỉ trả lời về vé xe, lịch trình, giá vé, địa điểm, thời gian khởi hành và các thông tin liên quan.
Hỗ trợ liên hệ: Nếu cần hỗ trợ thêm, hướng dẫn liên hệ số điện thoại hoặc email, hoặc truy cập link hỗ trợ. hỗ trợ nếu cần giúp đề yêu cầu liện hệ với 0972364028 hoặc email:nttanh0412gamil.com để được hỗ trợ.
    và hoặt với trang theo đừng link ${supportUrl}
Thông tin chủ web: Giới thiệu về chủ web để tăng sự thân thiện, gần gũi.Chủ Web này tên là "Nguyễn Trần Tiến Anh"
      thông tin về chủ web: "Nguyễn Trần Tiến Anh là một sinh viên năm cuối chuyên ngành Công nghệ thông tin tại trường Cao Đẳng Kỹ Thuật Công Nghệ Nha Trang. Anh có niềm đam mê với lập trình và thiết kế web  Nguyễn Trần Tiến Anh hy vọng sẽ phát triển sự nghiệp trong lĩnh vực công nghệ thông tin và đóng góp vào sự phát triển của ngành này."
      Đẹp trai, cao 1m75, nặng 85kg, thích ăn cơm tấm, thích đi du lịch, thích chơi game và thích đọc sách.
      Đã có cô vợ cọp cái hung dữ ,
      nếu liên quang đến "Nguyễn Hoàng trúc Linh" 
      mới trả lời"
       thông tin vợ tên là "Nguyễn Hoàng trúc Linh"
      Tính cách cô ấy hung dữ, mạnh mẽ và quyết đoán. Cô ấy là một người phụ nữ độc lập, luôn sẵn sàng đối mặt với thử thách và không ngại thể hiện quan điểm của mình. Cô ấy có khả năng lãnh đạo tốt và thường xuyên đưa ra những quyết định quan trọng trong gia đình.
      cô ấy luôn luôn đánh tiến Anh khi anh ấy làm sai việc gì đó."
      Phong độ làm việc của anh là chuyên nghiệp, tận tâm và luôn sẵn sàng hỗ trợ người dùng.
Yêu cầu về phong cách trả lời: Trả lời bằng tiếng Việt, hài hước, vui vẻ, thân thiện, lịch sự.
Giới hạn chủ đề: Nếu câu hỏi không liên quan đến website, chỉ trả lời: "Xin lỗi, tôi chỉ hỗ trợ về các vấn đề liên quan đến website bán vé xe.
Bạn chỉ trả lời bằng tiếng Việt thôi nhé.
      bạn trả lời hài huớc, vui vẻ, thân thiện và lịch sự.
      không liên quan tới website này. thì rep là "Xin lỗi, tôi chỉ hỗ trợ về các vấn đề liên quan đến website bán vé xe."
      `
      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          contents: [
            {
              parts: [{ text: `${web}\n  Người dùng hỏi${usermessage} ` }]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY
          }
        }
      )
      // In toàn bộ JSON trả về
console.log('api ai',res.data);
      const botReply = res.data.candidates[0].content.parts[0].text

      setDatamessage((prev) => [
        ...prev,
        {
          id: 1,
          sender: 'Bot',
          text: botReply,
          timestamp: new Date().toLocaleString()
        }
      ])
    } catch (err) {
      setDatamessage((prev) => [
        ...prev,
        {
          id: 1,
          sender: 'Bot',
          text: 'Xin lỗi, hiện tại tôi không thể trả lời.',
          timestamp: new Date().toLocaleString()
        }
      ])
    }
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (istext.trim() !== '') {
      setDatamessage([
        ...Datamessage,
        {
          id: 2,
          sender: 'User',
          text: istext,
          timestamp: new Date().toLocaleString()
        }
      ])
      await callGeminiFlash(istext)
    }
    setistext('')
  }

  const handleClick = () => {
    setShowMessage(!showMessage)
    setShow(!show)
    
  }
  // hàm  show
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [show])
  console.log('open', open)

  // Hàm cuộn xuống cuối cùng của tin nhắn
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showMessage) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [Datamessage, showMessage])

  return (
    <div>
      <div
        className={`fixed    bottom-10 transition-all duration-300 z-[301] flex   justify-center  
            
          ${scrolled ? 'right-[-15px]  md:right-[-25px]   rounded-[10px]    cursor-pointer items-start ' : '    rounded-full right-5 '}`}
      >
        {open ? (
          <div
            onClick={() => {
              setOpen(false)
              setScrolled(false)
            }}
            className='relative flex items-center justify-center  w-10 h-10 bg-green-500 rounded-xl shadow-xl   '
          >
            <div className='absolute left-[-10px] flex items-center justify-center w-10 h-10 bg-green-500 text-[#fff] rounded-lg shadow hover:bg-green-600 transition'>
              <Icon name='arrowleft' />
            </div>
          </div>
        ) : (
          // Khi đóng
          <div className='flex flex-col  '>
            {show && (
              <div className='absolute w-40  right-1 bottom-full mb-2 px-2 py-2 bg-green-500 text-[#fff] rounded-xl shadow-lg text-sm '>
                Xin chào, bạn cần giúp đỡ gì không?
                <span className='absolute right-4 top-full w-0 h-0 border-t-8 border-t-green-500 border-x-8 border-x-transparent'></span>
              </div>
            )}
            {showMessage && (
              <div className='absolute right-1 bottom-full mb-2   w-70 md:w-80 bg-[#fff] rounded-xl shadow-lg border border-green-500 z-500'>
                <div className='px-2 py-2 bg-green-500 rounded-t-xl text-[#fff] text-sm font-semibold justify-between flex items-center'>
                  <span className=' text-sm md:text-lg'> Hỗ trợ trực tuyến </span>
                  <i
                    onClick={() => {
                      setShowMessage(false)
                      setShow(true)
                    }}
                    className='text-[#fff]   ml-2'
                  >
                    <Icon name='close' />
                  </i>
                </div>
                {/* nội dung chat */}
                <div className='p-4 h-50 md:h-70 overflow-y-auto text-gray-800 text-sm'>
                  {Datamessage.map((message: any, index: number) => (
                    <div key={index} className={`mb-2 ${message.id === 2 ? 'text-right' : ''}`}>
                      <div
                        className={`inline-block text-[10px] md:text-[14px] px-3 py-2 rounded-lg t ${message.id === 2 ? 'bg-green-500  text-[#fff]  ' : 'bg-gray-200 text-gray-800'}`}
                      >
                        {message.text}
                      </div>
                      <div className=' text-[8px] md:text-xs text-gray-500 mt-1'>
                        {message.timestamp.slice(0, -3).slice(0, 8)}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <form className='flex items-center w-full' onSubmit={handleSubmit}>
                  <input
                    type='text'
                    placeholder='Nhập tin nhắn của bạn...'
                    className=' text-[10px] md:text-[14px] rounded-bl-xl w-full px-3 py-2  border border-gray-300   focus:outline-none focus:border-green-500'
                    value={istext}
                    onChange={(e) => setistext(e.target.value)}
                  />

                  <button
                    type='submit'
                    className='px-4 text-[10px] md:text-[14px]   py-2 border-y-1 border-green-500 bg-green-500 text-[#fff] rounded-br-xl hover:bg-green-600 transition'
                  >
                    Gửi
                  </button>
                </form>
                <div>
                  <span className='absolute right-4 top-full w-0 h-0 border-t-8 border-t-green-500 border-x-8 border-x-transparent'></span>
                </div>
              </div>
            )}
            <div
              onClick={() => {
                handleClick()
              }}
              className='  ml-auto cursor-pointer flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:scale-105 hover:bg-green-600 transition'
            >
              <i className='text-[#fff] text-2xl scale-x-[-1] '>
                <Icon name='messages' />
              </i>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
