import { Dispatch, useEffect, useRef } from 'react'

import useClickOutside from 'hooks/useClickOutside'

import { NotebookIcon, WriteIcon } from 'assets/svgs'
import styles from './infoWindow.module.scss'

interface IInfoWindowProps {
  setOpenInfoWindow: Dispatch<React.SetStateAction<boolean>>
  setOpenAddNoteForm: Dispatch<React.SetStateAction<boolean>>
}

const InfoWindow = ({ setOpenInfoWindow, setOpenAddNoteForm }: IInfoWindowProps) => {
  const containerRef = useRef(null)

  const clickOutsideTarget = () => {
    setOpenInfoWindow(false)
  }

  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideTarget)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleAddNoteClick = () => {
    setOpenAddNoteForm(true)
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
