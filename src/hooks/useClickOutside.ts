import { MutableRefObject } from 'react'

const useClickOutside = (targetRef: MutableRefObject<HTMLDivElement | null>, clickOutsideTarget: () => void) => {
  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (!targetRef.current || targetRef.current.contains(event.target as Node)) return
    clickOutsideTarget()
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
