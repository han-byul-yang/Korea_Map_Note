import { Dispatch, MutableRefObject } from 'react'

const useClickOutside = (
  targetRef: MutableRefObject<HTMLDivElement | null>,
  setShowTarget: Dispatch<React.SetStateAction<boolean>>
) => {
  const handelOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (!targetRef.current || targetRef.current.contains(event.target as Node)) return
    setShowTarget(false)
  }

  const outsideClickEvent = () => {
    document.addEventListener('mousedown', handelOutsideClick)
    document.addEventListener('touchstart', handelOutsideClick)

    return () => {
      document.addEventListener('mousedown', handelOutsideClick)
      document.addEventListener('touchstart', handelOutsideClick)
    }
  }

  return { outsideClickEvent }
}

export default useClickOutside
