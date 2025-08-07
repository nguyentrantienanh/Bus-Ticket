import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
import Icon from '../../icons/Icon'
import { useNavigate } from 'react-router-dom'
export default  function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
 const [isSearch, setIsSearch] = useState(false)
 const Userlist =  JSON.parse(localStorage.getItem('userList') || '[]')
 const ktremail = Userlist.map((u: any) => u.email === email)
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearch(true)


    if(!ktremail){
      alert('email chưa có tài khoảng nào')
      return
    } else{
 
    
    try {
       
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Giả lập delay 2 giây
      setMessage('Đã gửi email hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn.')
      setIsSearch(false)
    } catch (error) {
      setMessage('Đã xảy ra lỗi khi gửi email. Vui lòng thử lại sau.')
      setIsSearch(false)
    }
  } }

  return (
    <div>
      <div className='flex items-center justify-start gap-2 cursor-pointer text-gray-500 hover:text-green-600 duration-300 px-5 py-3'
        onClick={() => navigate('/signin')}>
        <i className='text-[12px]'>
          <Icon name='arrowleft' />
        </i>
        <span className='text-[12px] font-bold'> Quay lại</span>
      </div>
<div className=' w-full    flex flex-col  justify-center  '>
       
      <h1 className='  text-2xl font-bold mb-4 flex flex-col items-center '> Quên mật khẩu</h1>
       <Box
          component='form'
          sx={{ '& > :not(style)': { width: '100%' } }}
          autoComplete='off'
          className='bg-[#fff]  '
          onSubmit={ handleForgotPassword }
        >
          <div className='  bg-[#fff]    w-full items-center justify-center px-5 md:px-10   mt-10   border-gray-400'>
            <div className=' mb-4'>
              <TextField
                label='Nhập email của bạn'
                variant='outlined'
                value={ email }
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className='w-full'
                placeholder=' Nhập email...'
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#16a34a' // green-600 khi hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#16a34a' // green-600 khi focus
                    }
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#16a34a' // Label màu xanh khi focus
                    }
                  }
                }}
              />
            </div>

            <div className='py-4   justify-center items-center flex  '>
              <button
                disabled={isSearch}
                className={`  text-[#fff] border  border-b-4 w-80 font-medium overflow-hidden relative px-4 py-2 rounded-md    ${isSearch ? 'bg-gray-500 hover border-gray-500 cursor-not-allowed' : 'cursor-pointer bg-green-700 hover:bg-green-700 border-green-400   hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group'}`}
              >
                <span
                  className={` absolute -top-[150%] left-0 inline-flex w-full h-[5px] rounded-md opacity-50  font-medium   shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]     ${isSearch ? 'bg-gray-500 shadow-gray-500' : 'bg-green-400 shadow-green-400 group-hover:top-[150%] duration-500 '}`}
                />
                {isSearch ? (
                  <div>
                    <i className='px-2'>
                      <Icon name='loading' />
                    </i>
                    Đang tìm kiếm...
                  </div>
                ) : (
                  <div>
                    <i className='px-2'>
                      <Icon name='search' />
                    </i>
                    Tìm kiếm
                  </div>
                )}
              </button>
            </div>
          </div>
        </Box>
      {message && <p className='mt-4 text-center text-gray-700'>{message}</p>}
    </div>
    </div>
     
  )
}





// import React, { useState } from 'react'
// import {  TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material'
// import Icon from '../../icons/Icon'
// import { useNavigate } from 'react-router-dom'
// import emailjs from 'emailjs-com'

// export default function Support() {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     customerName: '',
//     customerEmail: '',
//     customerPhone: '',
//     supportType: '',
//     priorityLevel: '',
//     supportMessage: ''
//   })
//   const [message, setMessage] = useState('')
//   const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const supportTypes = [
//     { value: 'booking', label: '🎫 Vấn đề đặt vé' },
//     { value: 'payment', label: '💳 Vấn đề thanh toán' },
//     { value: 'cancellation', label: '❌ Hủy/Hoàn vé' },
//     { value: 'schedule', label: '⏰ Lịch trình xe' },
//     { value: 'account', label: '👤 Vấn đề tài khoản' },
//     { value: 'technical', label: '🔧 Lỗi kỹ thuật' },
//     { value: 'other', label: '❓ Khác' }
//   ]

//   const priorityLevels = [
//     { value: 'low', label: '🟢 Thấp - Không khẩn cấp' },
//     { value: 'medium', label: '🟡 Trung bình - Cần xử lý sớm' },
//     { value: 'high', label: '🟠 Cao - Khẩn cấp' },
//     { value: 'urgent', label: '🔴 Rất khẩn cấp' }
//   ]

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }))
//   }

//   const sendSupportEmail = async () => {
//     try {
//       const now = new Date()
//       const userBrowser = `${navigator.userAgent.split('(')[0]}${navigator.platform ? ` - ${navigator.platform}` : ''}`
      
//       const templateParams = {
//         customer_name: formData.customerName,
//         customer_email: formData.customerEmail,
//         customer_phone: formData.customerPhone || 'Không cung cấp',
//         support_type: supportTypes.find(t => t.value === formData.supportType)?.label || formData.supportType,
//         priority_level: priorityLevels.find(p => p.value === formData.priorityLevel)?.label || formData.priorityLevel,
//         support_message: formData.supportMessage,
//         request_time: now.toLocaleString('vi-VN'),
//         user_browser: userBrowser,
//         reply_to: formData.customerEmail,
//         to_email: import.meta.env.VITE_SUPPORT_EMAIL || 'nttanh0412@gmail.com'
//       }

//       const result = await emailjs.send(
//         import.meta.env.VITE_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//         templateParams,
//         import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//       )

//       console.log('✅ Support email sent:', result)
//       return { success: true, message: 'Yêu cầu hỗ trợ đã được gửi thành công!' }
      
//     } catch (error) {
//       console.error('❌ Failed to send support email:', error)
//       return { success: false, message: 'Không thể gửi yêu cầu. Vui lòng thử lại sau.' }
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     // Validation
//     if (!formData.customerName.trim()) {
//       setMessage('Vui lòng nhập họ và tên')
//       setMessageType('error')
//       return
//     }

//     if (!formData.customerEmail.trim()) {
//       setMessage('Vui lòng nhập địa chỉ email')
//       setMessageType('error')
//       return
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(formData.customerEmail)) {
//       setMessage('Vui lòng nhập địa chỉ email hợp lệ')
//       setMessageType('error')
//       return
//     }

//     if (!formData.supportType) {
//       setMessage('Vui lòng chọn loại vấn đề')
//       setMessageType('error')
//       return
//     }

//     if (!formData.priorityLevel) {
//       setMessage('Vui lòng chọn mức độ ưu tiên')
//       setMessageType('error')
//       return
//     }

//     if (!formData.supportMessage.trim()) {
//       setMessage('Vui lòng mô tả chi tiết vấn đề của bạn')
//       setMessageType('error')
//       return
//     }

//     if (formData.supportMessage.trim().length < 20) {
//       setMessage('Vui lòng mô tả chi tiết hơn (ít nhất 20 ký tự)')
//       setMessageType('error')
//       return
//     }

//     setIsSubmitting(true)
//     setMessage('')

//     try {
//       const result = await sendSupportEmail()
      
//       if (result.success) {
//         setMessage('✅ Yêu cầu hỗ trợ đã được gửi thành công! Chúng tôi sẽ phản hồi trong vòng 2-3 ngày làm việc.')
//         setMessageType('success')
        
//         // Reset form
//         setFormData({
//           customerName: '',
//           customerEmail: '',
//           customerPhone: '',
//           supportType: '',
//           priorityLevel: '',
//           supportMessage: ''
//         })
//       } else {
//         setMessage(result.message)
//         setMessageType('error')
//       }
      
//     } catch (error) {
//       setMessage('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.')
//       setMessageType('error')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className='min-h-screen bg-gray-50 py-8'>
//       <div className='max-w-4xl mx-auto px-4'>
//         {/* Header */}
//         <div className='bg-[#fff] rounded-lg shadow-sm p-6 mb-6'>
//           <div className='flex items-center justify-between mb-4'>
//             <div 
//               className='flex items-center gap-2 cursor-pointer text-gray-500 hover:text-blue-600 transition-colors'
//               onClick={() => navigate(-1)}
//             >
//               <Icon name='arrowleft' />
//               <span className='text-sm font-medium'>Quay lại</span>
//             </div>
//           </div>
          
//           <div className='text-center'>
//             <h1 className='text-3xl font-bold text-gray-900 mb-2'>🎧 Hỗ trợ khách hàng</h1>
//             <p className='text-gray-600'>Chúng tôi luôn sẵn sàng hỗ trợ bạn!</p>
//           </div>
//         </div>

//         {/* Support Info */}
//         <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6'>
//           <div className='flex items-start gap-3'>
//             <div className='text-blue-600 text-xl'>💡</div>
//             <div>
//               <h3 className='font-semibold text-blue-900 mb-2'>Hướng dẫn gửi yêu cầu hỗ trợ:</h3>
//               <ul className='text-blue-800 text-sm space-y-1'>
//                 <li>• <strong>Điền đầy đủ thông tin</strong> để chúng tôi có thể hỗ trợ bạn nhanh nhất</li>
//                 <li>• Yêu cầu sẽ được gửi đến: <strong className='text-blue-900'>nttanh0412@gmail.com</strong></li>
//                 <li>• <strong>Thời gian phản hồi: 2-3 ngày làm việc</strong></li>
//                 <li>• Đối với vấn đề khẩn cấp, vui lòng chọn mức độ ưu tiên cao</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Support Form */}
//         <div className='bg-[#fff] rounded-lg shadow-sm p-6'>
//           <h2 className='text-xl font-semibold text-gray-900 mb-6'>📝 Thông tin yêu cầu hỗ trợ</h2>
          
//           <form onSubmit={handleSubmit} className='space-y-6'>
//             {/* Personal Info */}
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//               <TextField
//                 label="Họ và tên"
//                 required
//                 fullWidth
//                 value={formData.customerName}
//                 onChange={(e) => handleInputChange('customerName', e.target.value)}
//                 disabled={isSubmitting}
//                 placeholder="Nhập họ và tên của bạn"
//                 inputProps={{ maxLength: 100 }}
//               />
              
//               <TextField
//                 label="Email"
//                 type="email"
//                 required
//                 fullWidth
//                 value={formData.customerEmail}
//                 onChange={(e) => handleInputChange('customerEmail', e.target.value)}
//                 disabled={isSubmitting}
//                 placeholder="email@example.com"
//                 inputProps={{ maxLength: 100 }}
//               />
//             </div>

//             <TextField
//               label="Số điện thoại (không bắt buộc)"
//               fullWidth
//               value={formData.customerPhone}
//               onChange={(e) => handleInputChange('customerPhone', e.target.value)}
//               disabled={isSubmitting}
//               placeholder="0xxx xxx xxx"
//               inputProps={{ maxLength: 15 }}
//             />

//             {/* Issue Details */}
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//               <FormControl fullWidth required>
//                 <InputLabel>Loại vấn đề</InputLabel>
//                 <Select
//                   value={formData.supportType}
//                   onChange={(e) => handleInputChange('supportType', e.target.value)}
//                   disabled={isSubmitting}
//                   label="Loại vấn đề"
//                 >
//                   {supportTypes.map((type) => (
//                     <MenuItem key={type.value} value={type.value}>
//                       {type.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
              
//               <FormControl fullWidth required>
//                 <InputLabel>Mức độ ưu tiên</InputLabel>
//                 <Select
//                   value={formData.priorityLevel}
//                   onChange={(e) => handleInputChange('priorityLevel', e.target.value)}
//                   disabled={isSubmitting}
//                   label="Mức độ ưu tiên"
//                 >
//                   {priorityLevels.map((level) => (
//                     <MenuItem key={level.value} value={level.value}>
//                       {level.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </div>

//             <TextField
//               label="Mô tả chi tiết vấn đề"
//               required
//               fullWidth
//               multiline
//               rows={6}
//               value={formData.supportMessage}
//               onChange={(e) => handleInputChange('supportMessage', e.target.value)}
//               disabled={isSubmitting}
//               placeholder="Vui lòng mô tả chi tiết vấn đề bạn đang gặp phải. Thông tin càng chi tiết sẽ giúp chúng tôi hỗ trợ bạn nhanh và chính xác hơn."
//               inputProps={{ maxLength: 2000 }}
//               helperText={`${formData.supportMessage.length}/2000 ký tự`}
//             />

//             {/* Submit Button */}
//             <div className='text-center'>
//               <button
//                 type='submit'
//                 disabled={isSubmitting}
//                 className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
//                   isSubmitting
//                     ? 'bg-gray-400 cursor-not-allowed text-[#fff]'
//                     : 'bg-blue-600 hover:bg-blue-700 text-[#fff] hover:shadow-lg transform hover:-translate-y-0.5'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <div className='flex items-center gap-2'>
//                     <Icon name='loading' />
//                     <span>Đang gửi yêu cầu...</span>
//                   </div>
//                 ) : (
//                   <div className='flex items-center gap-2'>
//                     <Icon name='send' />
//                     <span>Gửi yêu cầu hỗ trợ</span>
//                   </div>
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Message */}
//           {message && (
//             <div className={`mt-6 p-4 rounded-lg text-center ${
//               messageType === 'success' 
//                 ? 'bg-green-100 text-green-800 border border-green-300' 
//                 : 'bg-red-100 text-red-800 border border-red-300'
//             }`}>
//               <div className='flex items-center justify-center gap-2'>
//                 <Icon name={messageType === 'success' ? 'check' : 'warning'} />
//                 <span>{message}</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Contact Info */}
//         <div className='bg-gray-100 rounded-lg p-6 mt-6'>
//           <h3 className='font-semibold text-gray-900 mb-4'>📞 Thông tin liên hệ khác:</h3>
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700'>
//             <div className='flex items-center gap-2'>
//               <Icon name='email' />
//               <span>nttanh0412@gmail.com</span>
//             </div>
//             <div className='flex items-center gap-2'>
//               <Icon name='clock' />
//               <span>2-3 ngày làm việc</span>
//             </div>
//             <div className='flex items-center gap-2'>
//               <Icon name='support' />
//               <span>Hỗ trợ 24/7</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }