import Linechart from '../Chart/Linechart'
import BarChart from '../Chart/BarChart'
import BasicPie from '../Chart/BasicPie'
import BasicRadar from '../Chart/BasicRadar'

export default function Statistics() {
  return (
    <>
      <div className='flex flex-col h-full px-2 w-full p-4  pt-2 '>
        <div className='py-3 flex justify-between px-3 items-center text-center w-full  shadow-md bg-[#fff] rounded-lg '>
          <h1 className='text-1xl sm:text-2xl font-bold text-gray-700'>Thống kê</h1>
        </div>
        <div className='flex flex-col h-full px-2 w-full p-4  pt-2 '>
          <div>
            <h1 className='text-1xl sm:text-2xl font-bold text-gray-700'>Thống kê theo Năm</h1>

            <div className='border-2 rounded-lg p-4 m-2 bg-gray-100 shadow-md'>
              <BarChart />
            </div>
          </div>
          <div className='flex flex-col h-full px-2 w-full p-4  pt-2 '>
            <h1 className='text-1xl sm:text-2xl font-bold text-gray-700'>Thống kê theo Tháng</h1>
            <div className='border-2 rounded-lg p-4 m-2 bg-gray-100 shadow-md'>
              <div className='flex flex-col sm:flex-row gap-4'>
                <h1 className='text-1xl sm:text-2xl font-bold text-gray-700'>Thống kê theo Ngày</h1>
                <Linechart />
              </div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col justify-center items-center  '>
                  <BasicPie />
                  <span className='text-[10px] sm:text-[15px]'> biểu đồ Pie</span>
                </div>
                <div className=' flex flex-col justify-center items-center  '>
                  <BasicRadar />
                  <span className='text-[10px] sm:text-[15px]'> biểu đồ Radar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
