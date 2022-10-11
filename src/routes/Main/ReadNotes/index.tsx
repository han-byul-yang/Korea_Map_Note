import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import useResize from 'hooks/useResize'
import { isOpenReadNotesAtom, markPositionAtom, memoAtom, userIdAtom } from 'store/atom'
import { getDocsFromFirebase } from 'utils/firebaseService/firebaseDBService'
import { IMemoDocs } from 'types/memoType'
import ReadNote from './ReadNote'

import { XIcon, HamburgerCloseIcon } from 'assets/svgs'
import styles from './readNotes.module.scss'

const ReadNotes = () => {
  const [storedMemoList, setStoredMemoList] = useState<IMemoDocs[]>([])
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
      setStoredMemoList(
        memoDocs.docs
          .map((firebaseMemo) => firebaseMemo.data().data)
          .filter(
            (doc) =>
              doc.geolocation?.latitude === markPosition.clickedPosition.latitude &&
              doc.geolocation?.longitude === markPosition.clickedPosition.longitude
          )
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
        <ul>
          {storedMemoList.map((storedMemo) => (
            <ReadNote key={`${storedMemo.createAt}`} storedMemo={storedMemo} />
          ))}
        </ul>
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
