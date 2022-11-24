import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import dayjs from 'dayjs'

import { getImagesUrlFromFirebase } from 'utils/firebaseService/firebaseDBService'
import { IMemoDoc } from 'types/memoType'
import { pictureUpdateSnapShotAtom, userIdAtom } from 'store/atom'
import MemoSettingBox from 'routes/Main/ReadNotes/ReadNote/MemoSettingBox'

import { MoreIcon } from 'assets/svgs'
import styles from './readNote.module.scss'

interface IReadNoteProps {
  storedMemo: IMemoDoc
}

const ReadNote = ({ storedMemo }: IReadNoteProps) => {
  const [pictureList, setPictureList] = useState<File[] | string[]>([])
  const [openMemoSettingBox, setOpenMemoSettingBox] = useState(false)
  const pictureUpdateSnapShot = useRecoilValue(pictureUpdateSnapShotAtom)
  const userId = useRecoilValue(userIdAtom)
  const { createAt, siteName, travelDate, hashTagList, text } = storedMemo.memoInfo.memo

  const handleMoreButtonClick = () => {
    setOpenMemoSettingBox(true)
  }

  useEffect(() => {
    getImagesUrlFromFirebase(userId, createAt).then((url) => setPictureList(url))

    pictureUpdateSnapShot?.on('state_changed', null, null, () => {
      getImagesUrlFromFirebase(userId, createAt).then((url) => setPictureList(url))
    })
  }, [createAt, pictureUpdateSnapShot, userId])

  return (
    <li key={`${createAt}`} className={styles.readNoteCard}>
      <button type='button' onClick={handleMoreButtonClick}>
        <MoreIcon className={styles.moreIcon} />
      </button>
      {openMemoSettingBox && <MemoSettingBox setOpenMemoSettingBox={setOpenMemoSettingBox} storedMemo={storedMemo} />}
      {pictureList.length !== 0 && (
        <ul className={styles.imgBox}>
          {pictureList.map((singlePicture) => (
            <img key={`${singlePicture}`} alt='memoSinglePicture' src={`${singlePicture}`} />
          ))}
        </ul>
      )}
      <p>{siteName} 에서..</p>
      {!travelDate.endDate ? (
        <p>{dayjs(travelDate.startDate?.toDate()).format('YYYY.MM.DD')}</p>
      ) : (
        <p>
          {dayjs(travelDate.startDate?.toDate()).format('YYYY.MM.DD')} -
          {dayjs(travelDate.endDate?.toDate()).format('YYYY.MM.DD')}
        </p>
      )}

      <ul>
        {hashTagList.map((hashTag: string) => (
          <li key={hashTag}>{hashTag}</li>
        ))}
      </ul>
      <p>{text}</p>
    </li>
  )
}

export default ReadNote
