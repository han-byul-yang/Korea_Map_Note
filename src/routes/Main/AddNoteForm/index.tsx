import { Dispatch, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import useResize from 'hooks/useResize'
import presentDate from 'utils/presentDate'
import { clickedMarkPositionAtom } from 'store/atom'
import Picture from './Picture'
import HashTag from './HashTag'

import { LeftArrowIcon, RightArrowIcon, XIcon } from 'assets/svgs'
import styles from './addNoteForm.module.scss'

interface IAddNoteProps {
  setOpenAddNoteForm: Dispatch<React.SetStateAction<boolean>>
  openAddNoteForm: boolean
}

const AddNoteForm = ({ setOpenAddNoteForm, openAddNoteForm }: IAddNoteProps) => {
  const [picture, setPicture] = useState<Blob>()
  const clickedMarkPosition = useRecoilValue(clickedMarkPositionAtom)
  const { size, isSize: isMobile } = useResize()

  useEffect(() => {
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [size.MOBILE])

  const handleXButtonClick = () => {
    setOpenAddNoteForm(false)
  }

  const handleCloseButtonClick = () => {
    setOpenAddNoteForm((prev) => !prev)
  }

  return (
    <div className={openAddNoteForm ? styles.openContainer : styles.closeContainer}>
      <div className={styles.addNoteBox}>
        {isMobile && <XIcon className={styles.xIcon} onClick={handleXButtonClick} />}
        <p>
          현재 위치는 ...
          <br />
          경도: {clickedMarkPosition.latitude} / 위도: {clickedMarkPosition.longitude}
        </p>
        <form>
          <label>
            이 장소의 이름은?
            <input type='text' name='name' />
          </label>
          <p>
            방문 시기: {presentDate()}
            <button type='button'>날짜 변경</button>
          </p>
          <input type='text' />
          <Picture setPicture={setPicture} />
          <HashTag />
        </form>
      </div>
      {!isMobile && (
        <button className={styles.closeButton} type='button' onClick={handleCloseButtonClick}>
          {openAddNoteForm ? (
            <LeftArrowIcon className={styles.arrowIcon} />
          ) : (
            <RightArrowIcon className={styles.arrowIcon} />
          )}
        </button>
      )}
    </div>
  )
}

export default AddNoteForm
