import { BlogData } from '../../../Data/Blog'
import Icon from '../../../icons/Icon'
import { Link } from 'react-router-dom'

function Blog() {
  return (
    <>
      <section className='flex flex-col gap-5  '>
        <div className='grid grid-cols-4 max-[1700px]:grid-cols-3  max-[900px]:grid-cols-2 max-[500px]:grid-cols-1 items-center justify-items-center gap-5 max-[450px]:px-1  py-0 '>
          {BlogData().map((post: any) => (
            <div key={post.id} className='p-5 shadow-xl  '>
              <img src={post.image} alt={post.title} className='w-full h-60 object-cover rounded-lg' />
              <div className='   mt-3'>
                <i className='text-[#1db000]'>
                  <Icon name='calendar' />
                </i>
              </div>
              <Link to={post.path}>
                <h2 className='text-xl font-semibold  line-clamp-1 text-ellipsis'>{post.title}</h2>
                <p className='text-gray-600 mt-2 line-clamp-1 text-ellipsis'>{post.content}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
export default Blog
