import { Outlet } from 'react-router-dom'
import Listchat from './Listchat'
export default function Chatlayout() {
  return (
    <>
      <div className='flex gap-1 w-full  '>
        <div className='   w-1/5 shadow-2xl  max-xl:w-2/5   '>
          <Listchat />
        </div>

        <div className=' w-full '>
          <Outlet />
        </div>
      </div>
    </>
  )
}
