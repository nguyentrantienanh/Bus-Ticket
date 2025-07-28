import { Link } from 'react-router-dom'
import Icon from '../../../icons/Icon' // Assuming you have an Icon component for icons
import { BlogData } from '../../../Data/Blog'

function BlogPost() {
  const blogPost = BlogData().filter((post: any) => post.id >= 1 && post.id <= 3)

  return (
    <>
      <div className='grid grid-cols-3  max-[900px]:grid-cols-2 max-[450px]:grid-cols-1 items-center justify-items-center gap-5 max-[450px]:px-1  py-0 '>
        {blogPost.map((post: any, blogid) => (
          <div
            key={post.id}
            className={`p-5 shadow-xl max-[450px]:px-1 ${blogid === blogPost.length - 1 ? 'max-[900px]:col-span-2 max-[900px]:px-[30%] max-[450px]:col-span-1 max-[450px]:px-0' : ''} `}
          >
            <img src={post.image} alt={post.title} className='w-full h-50 object-cover rounded-lg' />
            <div className='   mt-3'>
              <i className='text-[#1db000]'>
                <Icon name='calendar' />
              </i>
            </div>

            <Link to={`/blog/${post.path}`}>
              <h2 className='text-[20px] font-semibold  line-clamp-1 text-ellipsis  '>{post.title}</h2>
              <p className='text-gray-600 mt-2 line-clamp-1 text-ellipsis  '>{post.content}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default BlogPost
