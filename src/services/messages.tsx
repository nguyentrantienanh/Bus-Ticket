import { useState, useEffect } from 'react';
import Icon from '../icons/Icon'; // icon mes
import { useNavigate } from 'react-router-dom';
 

export default function Messages() {
  const [open, setOpen] = useState(false); // Trạng thái mở khung
  const [scrolled, setScrolled] = useState(false); // Trạng thái đã cuộn
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !open) {
        setScrolled(true); // Nếu cuộn và chưa mở => thu vào
        setOpen(true); // ẩn icon mes
      } else if (window.scrollY <= 50) {
        setOpen(false);
        setScrolled(false); // Lên top => hiện lại icon mes
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [open]);
   console.log('open', open);

  

  return (
    <div>
      <div
        className={`fixed    bottom-10 transition-all duration-300 z-[301] flex   justify-center shadow-xl
            
          ${scrolled ? 'right-[-25px]   rounded-[10px]    cursor-pointer items-start ' : ' rounded-full right-5 '}`}
      >
      {open ? (
  <div 
  onClick={
    () => {
      setOpen(false); 
      setScrolled(false);  
    }
  }
  className="relative flex items-center justify-center  w-10 h-10 bg-green-500 rounded-xl shadow-xl   ">
    <div className="absolute left-[-10px] flex items-center justify-center w-10 h-10 bg-green-500 text-[#fff] rounded-lg shadow hover:bg-green-600 transition">
      <Icon name="arrowleft" />
    </div>
  </div>
) : (
  // Khi đóng
  <div
  onClick={
    () => {
      navigate('/user/support/chat')
    }
  }
  className=" cursor-pointer flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:scale-105 hover:bg-green-600 transition">
    <i className='text-[#fff] text-2xl scale-x-[-1] '>
      <Icon name="messages"  />
    </i>
  </div>
)}

      </div>
    </div>
  );
}
