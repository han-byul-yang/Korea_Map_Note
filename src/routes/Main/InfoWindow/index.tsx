import { Dispatch, useEffect, useRef } from 'react'

import useNotTargetClick from 'hooks/useNotTargetClick'

import { NotebookIcon, WriteIcon } from 'assets/svgs'
import styles from './infoWindow.module.scss'

interface IInfoWindowProps {
  handleClickOutside: () => void // type 재설정
  setOpenAddNoteForm: Dispatch<React.SetStateAction<boolean>>
}

const InfoWindow = ({ handleClickOutside, setOpenAddNoteForm }: IInfoWindowProps) => {
  const containerRef = useRef(null)
  const { notTargetClickEvent } = useNotTargetClick(containerRef, handleClickOutside)

  useEffect(() => {
    notTargetClickEvent()
  }, [notTargetClickEvent])

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
