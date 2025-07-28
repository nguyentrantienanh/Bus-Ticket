import Icon from '../icons/Icon'
import { useState, useEffect } from 'react'

const ScrollToShow = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isclick, setclick] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const triggerPosition = 200 // Mức cuộn để hiển thị (px)

      if (window.scrollY > triggerPosition) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
  }, [])

  const handleclick = () => {
    setclick(!isclick)
    window.scrollTo(0, 0)
  }

  return (
    <div>
      {isVisible && (
        <div>
          <p
            onClick={handleclick}
            className='fixed py-2 px-3 rounded-[10px] right-5 bottom-10 bg-red-100 z-300 text-red-500 cursor-pointer'
          >
            <i>
              <Icon name='up' />{' '}
            </i>
          </p>
        </div>
      )}
    </div>
  )
}

export default ScrollToShow
