import { Dispatch, useEffect, useRef } from 'react'

import useClickOutside from 'hooks/useClickOutside'
import useResize from 'hooks/useResize'

import { NotebookIcon, WriteIcon } from 'assets/svgs'
import styles from './infoWindow.module.scss'

interface IInfoWindowProps {
  setOpenInfoWindow: Dispatch<React.SetStateAction<boolean>>
  setOpenAddNoteModal: Dispatch<React.SetStateAction<boolean>>
}

const InfoWindow = ({ setOpenInfoWindow, setOpenAddNoteModal }: IInfoWindowProps) => {
  const containerRef = useRef(null)
  const { outsideClickEvent } = useClickOutside(containerRef, setOpenInfoWindow)
  const { size, isSize: isMobile } = useResize()

  useEffect(() => {
    outsideClickEvent()
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [outsideClickEvent, size.MOBILE])

  const handleAddNoteClick = () => {
    if (isMobile) setOpenAddNoteModal(true)
  }

  const handleReadNoteClick = () => {}

  return (
    <>
      <div className={styles.background} />
      <div className={styles.infoWindowContainer} ref={containerRef}>
        <button className={styles.box} type='button' onClick={handleAddNoteClick}>
          <WriteIcon className={styles.icon} />
          추억 추가
        </button>
        <button className={styles.box} type='button' onClick={handleReadNoteClick}>
          <NotebookIcon className={styles.icon} />
          추억 보기
        </button>
      </div>
    </>
  )
}

export default InfoWindow
