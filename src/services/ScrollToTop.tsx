import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop({ scrollRef }: { scrollRef?: React.RefObject<HTMLDivElement> }) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTop = 0
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
