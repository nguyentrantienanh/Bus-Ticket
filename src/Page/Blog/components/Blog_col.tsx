import { BlogData } from '../../../Data/Blog'
import Icon from '../../../icons/Icon'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function BlogCol() {
  const location = useLocation()
  const currentPath = location.pathname.replace('/blog/', '') // Lấy path id hiện tại
  const { t } = useTranslation('Blog')

  return (
    <nav className='flex flex-col gap-4 w-full bg-[#ffffff] p-4 rounded shadow'>
      <h3 className='font-bold mb-2'>{t('Blog-col')}</h3>
      <ul className='flex flex-col gap-3'>
        {BlogData()
          // lọc lấy các bài viết không phải là bài viết currentPath hiện tại
          .filter((post) => post.path !== currentPath)
          .map((post: any) => (
            <li key={post.id}>
              <Link to={post.path} className='flex gap-3 hover:bg-gray-100 p-2 rounded transition'>
                <img src={post.image} alt={post.title} className='w-35 h-25 object-cover rounded' />
                <div className='flex justify-between flex-col'>
                  <span className='text-[17px] font-bold line-clamp-2'>{post.title}</span>
                  <span className='text-[20px] text-[#8a8a8a] flex items-center gap-3'>
                    <Icon name='calendar' /> <span className='text-[14px] text-gray-600'>{post.Date}</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default BlogCol
