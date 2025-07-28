import { Outlet, useLocation } from 'react-router-dom'
import Blog_col from '../Blog/components/Blog_col'
import backgroundBlog from '../../assets/background.jpg'
import { BlogData } from '../../Data/Blog'

function BlogLayout() {
  const location = useLocation()
  const isDetail = location.pathname !== '/blog'

  const blogPost = BlogData().find((post: any) => post.path === location.pathname.replace('/blog/', ''))

  return (
    <>
      <div
        className='w-full h-50 flex items-center justify-center'
        style={{ backgroundImage: `url(${backgroundBlog})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='w-full h-full flex items-center justify-center bg-[#00000068]'>
          <h1 className={`font-bold mb-4 text-[#fff] text-[20px] sm:text-2xl lg:text-4xl text-center  `}>
            {isDetail ? blogPost?.title : 'Blog'}
          </h1>
        </div>
      </div>
      <div
        className={`flex ${isDetail ? 'flex-col md:flex-row' : 'flex-col'} gap-4 px-5 py-5 bg-[#f9f9f9] 2xl:px-[20%]`}
      >
        <div className={`w-full ${isDetail ? '  md:w-4/5 ' : 'w-full'} ${isDetail ? 'md:pr-4' : ''}`}>
          <Outlet />
        </div>
        {isDetail && (
          <div className='w-full md:w-3/5'>
            <Blog_col />
          </div>
        )}
      </div>{' '}
    </>
  )
}

export default BlogLayout
