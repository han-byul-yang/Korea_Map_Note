import { Dispatch, FormEvent, MouseEventHandler, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addDoc, collection, DocumentData } from 'firebase/firestore'

import useResize from 'hooks/useResize'
import presentDate from 'utils/presentDate'
import { firebaseDB } from 'utils/firebaseSetting'
import { clickedMarkPositionAtom, isOpenAddNoteFormAtom, userIdAtom } from 'store/atom'
import Picture from './Picture'
import HashTag from './HashTag'

import { LeftArrowIcon, RightArrowIcon, XIcon } from 'assets/svgs'
import styles from './addNoteForm.module.scss'

const AddNoteForm = () => {
  const [memo, setMemo] = useState<IMemo>({
    siteName: '',
    travelDate: '',
    text: '',
    picture: '',
    hashTag: [''],
  }) // type 설정
  const userId = useRecoilValue(userIdAtom)
  const [openAddNoteForm, setOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)
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

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setMemo((prev) => {
      if (e.currentTarget?.name === 'siteName') {
        return { ...prev, siteName: e.currentTarget.value }
      }
      if (e.currentTarget?.name === 'text') {
        return { ...prev, text: e.currentTarget.value }
      }
      return { ...prev, hashTag: ['여행', '힐링'] }
    })
  }

  const handleMemoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addDoc(collection(firebaseDB, 'memoInfo'), {
      writer: userId,
      createAt: new Date(),
      geolocation: {
        latitude: clickedMarkPosition.latitude,
        logitude: clickedMarkPosition.longitude,
      },
      memo: {
        siteName: memo.siteName,
        travelDate: memo.travelDate,
        text: memo.text,
        picture: memo.picture,
        hashTag: memo.hashTag,
      },
    })
  }

  const handleMemoClick = () => {
    addDoc(collection(firebaseDB, 'memoInfo'), {
      writer: userId,
      createAt: new Date(),
      geolocation: {
        latitude: clickedMarkPosition.latitude,
        logitude: clickedMarkPosition.longitude,
      },
      memo: {
        siteName: memo.siteName,
        travelDate: memo.travelDate,
        text: memo.text,
        picture: memo.picture,
        hashTag: memo.hashTag,
      },
    })
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
        <form onSubmit={handleMemoSubmit}>
          <label>
            이 장소의 이름은?
            <input type='text' name='siteName' value={memo.siteName} onChange={handleInputChange} />
          </label>
          <p>
            방문 시기: {presentDate()}
            <button type='button'>날짜 변경</button>
          </p>
          <input type='text' name='text' value={memo.text} onChange={handleInputChange} />
          <Picture />
          <HashTag />
        </form>
        <button type='button' onClick={handleMemoClick}>
          메모 저장
        </button>
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
