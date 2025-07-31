import google from '../assets/auth/google.svg'
import facebook from '../assets/auth/facebook.svg'
import linkedin from '../assets/auth/linkdin.svg'

function Icon(props: { name: string }) {
  if (props.name == 'phone') {
    // Biểu tượng điện thoại
    return <i className='fa-solid fa-phone-volume'></i>
  } else if (props.name == 'email') {
    // Biểu tượng email
    return <i className='fa-solid fa-envelope'></i>
  } else if (props.name == 'signin') {
    // Biểu tượng đăng nhập
    return <i className='fa-solid fa-right-to-bracket'></i>
  } else if (props.name == 'signup') {
    // Biểu tượng đăng ký
    return <i className='fa-solid fa-user-plus'></i>
  } else if (props.name == 'language') {
    // Biểu tượng ngôn ngữ
    return <i className='fa-solid fa-globe'></i>
  } else if (props.name == 'facebook') {
    // Biểu tượng Facebook
    return <i className='fa-brands fa-facebook'></i>
  } else if (props.name == 'twitter') {
    // Biểu tượng Twitter
    return <i className='fa-brands fa-twitter'></i>
  } else if (props.name == 'instagram') {
    // Biểu tượng Instagram
    return <i className='fa-brands fa-instagram'></i>
  } else if (props.name == 'youtube') {
    // Biểu tượng YouTube
    return <i className='fa-brands fa-youtube'></i>
  } else if (props.name == 'arrow-right') {
    // Biểu tượng mũi tên phải
    return <i className='fa-regular fa-square-caret-right'></i>
  } else if (props.name == 'arrow-left') {
    // Biểu tượng mũi tên trái
    return <i className='fa-regular fa-square-caret-left'></i>
  } else if (props.name == 'gps') {
    // Biểu tượng GPS
    return <i className='fa-solid fa-map-pin'></i>
  } else if (props.name == 'directionarrow') {
    // Biểu tượng mũi tên chỉ hướng
    return <i className='fa-solid fa-location-arrow'></i>
  } else if (props.name == 'location') {
    // Biểu tượng vị trí
    return <i className='fa-solid fa-location-dot'></i>
  } else if (props.name == 'calendar') {
    // Biểu tượng lịch
    return <i className='fa-solid fa-calendar-days'></i>
  } else if (props.name == 'search') {
    // Biểu tượng tìm kiếm
    return <i className='fa-solid fa-magnifying-glass'></i>
  } else if (props.name == 'ticket') {
    // Biểu tượng vé
    return <i className='fa-solid fa-ticket'></i>
  } else if (props.name == 'bill') {
    // Biểu tượng hóa đơn
    return <i className='fa-solid fa-money-bill-1-wave'></i>
  } else if (props.name == 'wifi') {
    // Biểu tượng wifi
    return <i className='fa-solid fa-wifi'></i>
  } else if (props.name == 'pillow') {
    // Gối
    return <i className='fa-solid fa-bed'></i>
  } else if (props.name == 'water') {
    // Bình nước
    return <i className='fa-solid fa-bottle-water'></i>
  } else if (props.name == 'drink') {
    // Cốc nước
    return <i className='fa-solid fa-wine-glass'></i>
  } else if (props.name == 'dow') {
    // Dấu mũi tên xuống
    return <i className='fa-solid fa-chevron-down'></i>
  } else if (props.name == 'up') {
    // Dấu mũi tên lên
    return <i className='fa-solid fa-chevron-up'></i>
  } else if (props.name == 'address') {
    // Địa chỉ
    return <i className='fa-solid fa-map-marker-alt'></i>
  } else if (props.name == 'menu') {
    // Dấu 3 gạch ngang
    return <i className='fa-solid fa-bars'></i>
  } else if (props.name == 'close') {
    // Dấu X
    return <i className='fa-solid fa-xmark'></i>
  } else if (props.name == 'vertical') {
    // Dấu chấm dọc
    return <i className='fa-solid fa-ellipsis-vertical'></i>
  } else if (props.name == 'home') {
    // Trang chủ
    return <i className='fa-solid fa-house'></i>
  } else if (props.name == 'about') {
    // Giới thiệu
    return <i className='fa-solid fa-info-circle'></i>
  } else if (props.name == 'faqs') {
    // Câu hỏi thường gặp
    return <i className='fa-solid fa-question-circle'></i>
  } else if (props.name == 'blog') {
    return <i className='fa-solid fa-blog'></i>
  } else if (props.name == 'contact') {
    // Liên hệ
    return <i className='fa-solid fa-address-book'></i>
  } else if (props.name == 'bus') {
    // Xe buýt
    return <i className='fa-solid fa-bus'></i>
  } else if (props.name == 'road') {
    // Đường đi
    return <i className='fa-solid fa-road'></i>
  } else if (props.name == 'clock') {
    // Đồng hồ
    return <i className='fa-regular fa-clock'></i>
  } else if (props.name == 'seat') {
    // Ghế ngồi
    return <i className='fa-solid fa-chair'></i>
  } else if (props.name == 'google') {
    // Google Sign In
    return <img src={google} alt='Google Icon' className='w-5 h-5' />
  } else if (props.name == 'facebooksign') {
    // Facebook Sign In
    return <img src={facebook} alt='Facebook Icon' className='w-5 h-5' />
  } else if (props.name == 'linkedin') {
    // LinkedIn
    return <img src={linkedin} alt='LinkedIn Icon' className='w-5 h-5' />
  } else if (props.name == 'support') {
    // Hỗ trợ
    return <i className='fa-solid fa-headset'></i>
  } else if (props.name == 'user') {
    // Người dùng
    return <i className='fa-solid fa-user'></i>
  } else if (props.name == 'send') {
    // Gửi
    return <i className='fa-solid fa-paper-plane'></i>
  } else if (props.name == 'computer') {
    // Máy tính
    return <i className='fa-solid fa-desktop'></i>
  } else if (props.name == 'dashboard') {
    return <i className='fa-solid fa-chart-simple'></i>
  } else if (props.name == 'check') {
    // Dấu tích
    return <i className='fa-solid fa-check'></i>
  } else if (props.name == 'circle-right') {
    // Dấu chấm tròn bên phải
    return <i className='fa-regular fa-circle-right'></i>
  } else if (props.name == 'circle-left') {
    // Dấu chấm tròn bên trái
    return <i className='fa-regular fa-circle-left'></i>
  } else if (props.name == 'arrowleft') {
    // Mũi tên bên nhọn
    return <i className='fa-solid fa-arrow-left'></i>
  } else if (props.name == 'logout') {
    // Đăng xuất
    return <i className='fa-solid fa-right-from-bracket'></i>
  } else if (props.name == 'notification') {
    // Thông báo
    return <i className='fa-solid fa-bell'></i>
  } else if (props.name == 'users') {
    // Người dùng nhiều
    return <i className='fa-solid fa-users'></i>
  } else if (props.name == 'sms') {
    // Tin nhắn
    return <i className='fa-solid fa-sms'></i>
  } else if (props.name == 'check-circle') {
    // Dấu tích tròn
    return <i className='fa-solid fa-check-circle'></i>
  } else if (props.name == 'x-circle') {
    // Dấu X tròn
    return <i className='fa-solid fa-xmark-circle'></i>
  } else if (props.name == 'money') {
    // Biểu tượng tiền
    return <i className='fa-solid fa-money-check-dollar'></i>
  } else if (props.name == 'eye') {
    // Biểu tượng mắt (hiện mật khẩu)
    return <i className='fa-solid fa-eye'></i>
  } else if (props.name == 'eye-off') {
    // Biểu tượng mắt bị gạch chéo (ẩn mật khẩu)
    return <i className='fa-solid fa-eye-slash'></i>
  } else if (props.name == 'lock') {
    // Biểu tượng khóa
    return <i className='fa-solid fa-lock'></i>
  } else if (props.name == 'support') {
    return <i className='fa-solid fa-headset'></i>
  } else if (props.name == 'send') {
    // gửi tin nhắn
    return <i className='fa-solid fa-paper-plane'></i>
  } else if (props.name == 'trash') {
    // Biểu tượng thùng rác
    return <i className='fa-solid fa-trash-can'></i>
  } else if (props.name == 'cancel') {
    // Biểu tượng hủy
    return <i className='fa-solid fa-ban'></i>
  } else if (props.name == 'id') {
    // Biểu tượng ID
    return <i className='fa-solid fa-id-card'></i>
  } else if (props.name == 'chat') {
    // Biểu tượng chat
    return <i className='fa-solid fa-comments'></i>
  } else if (props.name == 'addchat') {
    // Biểu tượng thêm chat
    return <i className='fa-solid fa-comment-dots'></i>
  } else if (props.name == 'bus-go') {
    // Biểu tượng xe buýt đang chạy
    return <i className='fa-solid fa-bus-side'></i>
  } else if (props.name == 'download') {
    // Biểu tượng tải xuống
    return <i className='fa-solid fa-cloud-arrow-down'></i>
  } else if (props.name == 'upload') {
    // Biểu tượng tải lên
    return <i className='fa-solid fa-cloud-arrow-up'></i>
  } else if (props.name == 'loading') {
    // Biểu tượng đang tải
    return <i className='fa-solid fa-spinner animate-spin'></i>
  }
}

export default Icon
