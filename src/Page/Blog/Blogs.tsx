import Bloghome from '../Blog/components/Blog_card-home'
import Blog1 from './Content/Posts/Why_Choose_ViserBus'
import Blog2 from './Content/Posts/Top_10_Tips_for_Stress-Free_Bus_Travel'
import Blog3 from './Content/Posts/How_to_Book_Bus_Tickets_Online'
import Blog4 from './Content/Posts/Exploring_the_Benefits_of_Online_Bus_Ticket_Booking'
import Blog5 from './Content/Posts/The_Future_of_Bus_Travel'
import Blog6 from './Content/Posts/How_to_Choose_the_Right_Bus_Service_for_Your_Journey'
import Blog7 from './Content/Posts/The_Ultimate_Guide_to_Bus_Travel_Etiquette'
import Blog8 from './Content/Posts/Exploring_Scenic_Routes'
import BlogLayout from './BlogLayout'

import { Routes, Route } from 'react-router-dom'

function Blog() {
  return (
    <>
      <Routes>
        <Route path='/' element={<BlogLayout />}>
          <Route index element={<Bloghome />} />
          <Route path='Why-Choose-ViserBus' element={<Blog1 />} />
          <Route path='Top-10-Tips-for-Stress-Free-Bus-Travel' element={<Blog2 />} />
          <Route path='How-to-Book-Bus-Tickets-Online' element={<Blog3 />} />
          <Route path='Exploring-the-Benefits-of-Online-Bus-Ticket-Booking' element={<Blog4 />} />
          <Route path='The-Future-of-Bus-Travel' element={<Blog5 />} />
          <Route path='How-to-Choose-the-Right-Bus-Service-for-Your-Journey' element={<Blog6 />} />
          <Route path='The-Ultimate-Guide-to-Bus-Travel-Etiquette' element={<Blog7 />} />
          <Route path='Exploring-Scenic-Routes' element={<Blog8 />} />
        </Route>
      </Routes>
    </>
  )
}
export default Blog
