import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import useResize from 'hooks/useResize'
import { isOpenReadNotesAtom, markPositionAtom, memoAtom, userIdAtom } from 'store/atom'
import { getDocsFromFirebase } from 'utils/firebaseService/firebaseDBService'
import { IMemoDoc } from 'types/memoType'
import ReadNote from './ReadNote'

import { XIcon, HamburgerCloseIcon } from 'assets/svgs'
import styles from './readNotes.module.scss'

const ReadNotes = () => {
  const [storedMemoDoc, setStoredMemoDoc] = useState<IMemoDoc[]>([])
  const userId = useRecoilValue(userIdAtom)
  const [isOpenReadNotes, setIsOpenReadNotes] = useRecoilState(isOpenReadNotesAtom)
  const setMemo = useSetRecoilState(memoAtom)
  const markPosition = useRecoilValue(markPositionAtom)
  // const [isOkChangeMark, setIsOkChangeMark] = useRecoilState(isOkChangeMarkAtom)
  const { size, isSize: isMobile } = useResize()

  useEffect(() => {
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [size.MOBILE])

  useEffect(() => {
    if (isOpenReadNotes) {
      getDocsFromFirebase(userId).then((memoDocs) => {
        setStoredMemoDoc(
          [...memoDocs.docs]
            .reverse()
            .map((firebaseMemo) => {
              return { memoInfo: firebaseMemo.data().data, docId: firebaseMemo.id }
            })
            .filter(
              (doc) =>
                doc.memoInfo.geolocation?.latitude === markPosition.clickedPosition.latitude &&
                doc.memoInfo.geolocation?.longitude === markPosition.clickedPosition.longitude
            )
        )
      })
    }
  }, [markPosition.clickedPosition.latitude, markPosition.clickedPosition.longitude, isOpenReadNotes, userId])

  const handleCloseButtonClick = () => {
    setIsOpenReadNotes(false)
    setMemo((prevMemo) => ({ ...prevMemo, siteName: '' }))
  }

  const handleHamburgerCloseButtonClick = () => {
    setIsOpenReadNotes(false)
  }

  return (
    <div className={isOpenReadNotes ? styles.openContainer : styles.closeContainer}>
      <div className={styles.readNotesBox}>
        {isMobile && (
          <HamburgerCloseIcon className={styles.hamburgerCloseIcon} onClick={handleHamburgerCloseButtonClick} />
        )}
        {storedMemoDoc.length !== 0 ? (
          <ul>
            {storedMemoDoc.reverse().map((storedMemo) => (
              <ReadNote key={`${storedMemo.memoInfo.createAt}`} storedMemo={storedMemo} />
            ))}
          </ul>
        ) : (
          <p>저장된 추억이 없습니다</p>
        )}
      </div>
      {!isMobile && isOpenReadNotes && (
        <button className={isOpenReadNotes && styles.closeButton} type='button' onClick={handleCloseButtonClick}>
          <XIcon className={styles.arrowIcon} />
        </button>
      )}
    </div>
  )
}

export default ReadNotes
