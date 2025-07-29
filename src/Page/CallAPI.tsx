import { useEffect, useState } from 'react'

// Định nghĩa interface cho dữ liệu API
interface Movie {
  status: boolean
  msg: string
  movie: {
    tmdb: {
      type: string
      id: string
      season: number
      vote_average: number
      vote_count: number
    }
    imdb: {
      vote_average: number
      vote_count: number
      id: string
    }
    created: {
      time: string
    }
    modified: {
      time: string
    }
    _id: string
    name: string
    origin_name: string
    content: string
    type: string
    status: string
    thumb_url: string
    trailer_url: string
    time: string
    episode_current: string
    episode_total: string
    quality: string
    lang: string
    notify?: string
    showtimes?: string
    slug: string
    year: number
    view: number
    actor: string[]
    director?: string[]
    category?: { id: string; name: string; slug: string }[]
    country?: { id: string; name: string; slug: string }[]
    is_copyright?: boolean
    chieurap?: boolean
    poster_url?: string
    sub_docquyen?: boolean
  }
  episodes?: {
    server_name?: string
    server_data?: {
      name?: string
      slug?: string
      filename?: string
      link_embed?: string
      link_m3u8?: string
    }[]
  }[]
}

const CallApi = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('') // Lưu giá trị input
  const [slug, setSlug] = useState('ma-soi') // Slug ban đầu

  // Hàm chuyển đổi tên phim thành slug
  const convertToSlug = (text: string): string => {
    return text
      .toLowerCase() // Chuyển thành chữ thường (hoặc dùng .toUpperCase() nếu muốn chữ hoa)
      .trim()
      .replace(/[\s]+/g, '-') // Thay khoảng trắng bằng dấu -
      .replace(/[^a-z0-9-]/g, '') // Xóa ký tự đặc biệt
  }

  // Hàm gọi API
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://ophim1.com/phim/${slug}`)
      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu')
      }
      const result: Movie = await response.json()
      if (result.status) {
        const episodes = result.episodes?.[0]?.server_data || []
        setData(
          episodes.map((ep: any) => ({
            name: ep.name,
            filename: ep.filename,
            link_embed: ep.link_embed
          }))
        )
        setError('')
      } else {
        setError(result.msg || 'Không tìm thấy phim')
        setData([])
      }
    } catch (error: any) {
      setError(error.message || 'Lỗi không xác định')
      setData([])
    } finally {
      setLoading(false)
    }
  }

  // Gọi API khi slug thay đổi
  useEffect(() => {
    if (slug) {
      fetchData()
    }
  }, [slug])

  // Xử lý khi người dùng nhấn tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      const newSlug = convertToSlug(searchTerm)
      setSlug(newSlug)
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Tìm Kiếm Phim</h1>

      {/* Form tìm kiếm */}
      <form onSubmit={handleSearch} className='mb-4'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Nhập tên phim (VD: Ngôi Trường Xác Sống)'
          className='border p-2 rounded w-full md:w-1/2'
        />
        <button type='submit' className='ml-2 bg-blue-500 text-[#fff] p-2 rounded hover:bg-blue-600'>
          Tìm kiếm
        </button>
      </form>

      {/* Hiển thị trạng thái */}
      {loading && <p>Đang tải...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {/* Hiển thị danh sách tập phim */}
      {data.length > 0 ? (
        <ul className='list-disc pl-5'>
          {data.map((item, index) => (
            <li key={index} className='mb-2'>
              <strong>Tập {item.name}</strong>: {item.filename} -{' '}
              <a
                href={item.link_embed}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'
              >
                Xem phim
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>Không có dữ liệu phim.</p>
      )}
    </div>
  )
}

export default CallApi
