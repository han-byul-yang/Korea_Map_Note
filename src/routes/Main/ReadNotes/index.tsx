import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import useResize from 'hooks/useResize'
import { isOpenReadNotesAtom, markPositionAtom, memoAtom, userIdAtom } from 'store/atom'
import { getDocsFromFirebase } from 'utils/firebaseService/firebaseDBService'

import { XIcon, HamburgerCloseIcon } from 'assets/svgs'
import styles from './readNotes.module.scss'

const ReadNotes = () => {
  const userId = useRecoilValue(userIdAtom)
  const [openReadNotes, setOpenReadNotes] = useRecoilState(isOpenReadNotesAtom)
  const setMemo = useSetRecoilState(memoAtom)
  const markPosition = useRecoilValue(markPositionAtom)
  const { size, isSize: isMobile } = useResize()

  useEffect(() => {
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [size.MOBILE])

  useEffect(() => {
    getDocsFromFirebase(userId).then((memoDocs) => {
      const result = memoDocs.docs
        .map((firebaseMemo) => firebaseMemo.data().data)
        .filter(
          (doc) =>
            doc.geolocation?.latitude === markPosition.clickedPosition.latitude &&
            doc.geolocation?.longitude === markPosition.clickedPosition.longitude
        )
    })
  }, [markPosition.clickedPosition.latitude, markPosition.clickedPosition.longitude, userId])

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
