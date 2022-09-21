import { Dispatch, useEffect } from 'react'

import useResize from 'hooks/useResize'

import { LeftArrowIcon, RightArrowIcon, XIcon } from 'assets/svgs'
import styles from './addNoteForm.module.scss'

interface IAddNoteProps {
  setOpenAddNoteForm: Dispatch<React.SetStateAction<boolean>>
  openAddNoteForm: boolean
}

const AddNoteForm = ({ setOpenAddNoteForm, openAddNoteForm }: IAddNoteProps) => {
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
        <p>지금 </p>
        <form />
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
