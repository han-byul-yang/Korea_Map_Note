import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { collection, query } from 'firebase/firestore'

import useResize from 'hooks/useResize'
import { isOkChangeMarkAtom, isOpenReadNotesAtom, markPositionAtom, memoAtom, userIdAtom } from 'store/atom'
import { getDocsFromFirebase, snapShotFirebaseData } from 'utils/firebaseService/firebaseDBService'
import { firebaseDBService } from 'utils/firebaseService/firebaseSetting'
import { getMarkPositionDocsFromFirebaseHandler } from 'utils/getDataFromFirebaseHandle'
import { IMemoDoc } from 'types/memoType'
import ReadNote from './ReadNote'

import { XIcon, HamburgerCloseIcon } from 'assets/svgs'
import styles from './readNotes.module.scss'

const ReadNotes = () => {
  const [storedMemoDoc, setStoredMemoDoc] = useState<IMemoDoc[]>([])
  const [isMemoDocLoading, setIsMemoDocLoading] = useState(false)
  const userId = useRecoilValue(userIdAtom)
  const [isOpenReadNotes, setIsOpenReadNotes] = useRecoilState(isOpenReadNotesAtom)
  const setMemo = useSetRecoilState(memoAtom)
  const markPosition = useRecoilValue(markPositionAtom)
  const [isOkChangeMark, setIsOkChangeMark] = useRecoilState(isOkChangeMarkAtom)
  const { size, isSize: isMobile } = useResize()

  useEffect(() => {
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [size.MOBILE])

  useEffect(() => {
    const document = query(collection(firebaseDBService, userId))
    const snapShotHandler = getDocsFromFirebase(userId)
      .then((memoDocs) => {
        if (isOkChangeMark) {
          setIsMemoDocLoading(true)
          setStoredMemoDoc(getMarkPositionDocsFromFirebaseHandler(memoDocs, markPosition))
        }
      })
      .finally(() => setIsMemoDocLoading(false))

    const snapShotEvent = snapShotFirebaseData(document, () => snapShotHandler)

    setIsOkChangeMark(false)
    return () => {
      snapShotEvent()
    }
  }, [isOkChangeMark, markPosition, setIsOkChangeMark, userId])

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
        {/* eslint-disable-next-line no-nested-ternary */}
        {isMemoDocLoading ? (
          <div>loading memo...</div>
        ) : storedMemoDoc.length !== 0 ? (
          <ul>
            {storedMemoDoc.reverse().map((storedMemo) => (
              <ReadNote key={`${storedMemo.memoInfo.memo.createAt}`} storedMemo={storedMemo} />
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
