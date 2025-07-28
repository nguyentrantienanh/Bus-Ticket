import logo from '../assets/logo/Bus_Ticket_Header.png'
import { LinearProgress } from '@mui/material'

export default function LoadingPage() {
  return (
    <div className='loading-page fixed w-full h-full items-center flex justify-center bg-[#ffffff] z-1000'>
      <div className='flex flex-col items-center  gap-4  animate-pulse'>
        <div className='  border-4 border-[#0c7700] w-40 h-40 rounded-full p-1  '>
          <img src={logo} alt='' className=' object-cover ' />
        </div>
        <div>
          <LinearProgress color='success' />
          <p className='text-gray-500 text-sm'>Đang tải dữ liệu...</p>
        </div>
      </div>
    </div>
  )
}
