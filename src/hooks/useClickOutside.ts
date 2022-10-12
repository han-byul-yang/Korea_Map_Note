import { MutableRefObject } from 'react'

const useClickOutside = (targetRef: MutableRefObject<HTMLDivElement | null>, clickOutsideHandle: () => void) => {
  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (!targetRef.current || targetRef.current.contains(event.target as Node)) return
    clickOutsideHandle()
  }

  const clickOutsideEvent = () => {
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)

    return () => {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('touchstart', handleOutsideClick)
    }
  }

  return { clickOutsideEvent }
}

export default useClickOutside
