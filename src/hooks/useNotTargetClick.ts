import { MutableRefObject } from 'react'

const useNotTargetClick = (targetRef: MutableRefObject<HTMLDivElement | null>, handleClickOutside: () => void) => {
  const handleNotTargetClick = (event: MouseEvent | TouchEvent) => {
    if (!targetRef.current || targetRef.current.contains(event.target as Node)) return
    handleClickOutside()
  }

  const notTargetClickEvent = () => {
    document.addEventListener('mousedown', handleNotTargetClick)
    document.addEventListener('touchstart', handleNotTargetClick)

    return () => {
      document.addEventListener('mousedown', handleNotTargetClick)
      document.addEventListener('touchstart', handleNotTargetClick)
    }
  }

  return { notTargetClickEvent }
}

export default useNotTargetClick
