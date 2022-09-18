import { useState } from 'react'

const useResize = () => {
  const [isSize, setIsSize] = useState(false)

  const size = {
    DESKTOP: {
      RESIZE: () => setIsSize(window.innerWidth < 1440),
      SIZEEVENT: () => {
        resizeEvent(size.DESKTOP.RESIZE)
      },
    },
    TABLET: {
      RESIZE: () => setIsSize(window.innerWidth < 768),
      SIZEEVENT: () => {
        resizeEvent(size.TABLET.RESIZE)
      },
    },
    MOBILE: {
      RESIZE: () => setIsSize(window.innerWidth < 425),
      SIZEEVENT: () => {
        resizeEvent(size.MOBILE.RESIZE)
      },
    },
  }

  const resizeEvent = (handleResize: EventListenerOrEventListenerObject) => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }
  return { size, isSize }
}

export default useResize
