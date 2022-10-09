import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import useResize from 'hooks/useResize'
import { isOpenReadNotesAtom, memoAtom } from 'store/atom'

import { XIcon, HamburgerCloseIcon } from 'assets/svgs'
import styles from './readNotes.module.scss'

const ReadNotes = () => {
  const [openReadNotes, setOpenReadNotes] = useRecoilState(isOpenReadNotesAtom)
  const setMemo = useSetRecoilState(memoAtom)
  const { size, isSize: isMobile } = useResize()

  useEffect(() => {
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [size.MOBILE])

  const handleCloseButtonClick = () => {
    setOpenReadNotes(false)
    setMemo((prevMemo) => ({ ...prevMemo, siteName: '' }))
  }

  const handleHamburgerCloseButtonClick = () => {
    setOpenReadNotes(false)
  }

  return (
    <div className={openReadNotes ? styles.openContainer : styles.closeContainer}>
      <div className={styles.readNotesBox}>
        {isMobile && (
          <HamburgerCloseIcon className={styles.hamburgerCloseIcon} onClick={handleHamburgerCloseButtonClick} />
        )}
      </div>
      {!isMobile && openReadNotes && (
        <button className={openReadNotes && styles.closeButton} type='button' onClick={handleCloseButtonClick}>
          <XIcon className={styles.arrowIcon} />
        </button>
      )}
    </div>
  )
}

export default ReadNotes
