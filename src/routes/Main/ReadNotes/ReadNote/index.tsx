import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'

import { getImagesUrlFromFirebase } from 'utils/firebaseService/firebaseDBService'
import updatedDate from 'utils/updatedDate'
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
      <p className={styles.siteName}>{siteName} 에서..</p>
      {!travelDate.endDate ? (
        <p className={styles.travelDate}>{dayjs(travelDate.startDate).format('YYYY.MM.DD')}</p>
      ) : (
        <p className={styles.travelDate}>
          {dayjs(travelDate.startDate).format('YYYY.MM.DD')} -{dayjs(travelDate.endDate).format('YYYY.MM.DD')}
        </p>
      )}
      <button className={styles.moreButton} type='button' onClick={handleMoreButtonClick}>
        <MoreIcon className={styles.moreIcon} />
      </button>
      {openMemoSettingBox && <MemoSettingBox setOpenMemoSettingBox={setOpenMemoSettingBox} storedMemo={storedMemo} />}
      {pictureList.length !== 0 && (
        <ul className={styles.imageBox}>
          {pictureList.map((singlePicture) => (
            <li key={`${singlePicture}`}>
              <img alt='memoSinglePicture' src={`${singlePicture}`} />
            </li>
          ))}
        </ul>
      )}

      <ul className={styles.hashTagList}>
        {hashTagList.list.map((hashTag: string) => (
          <li key={hashTag} style={{ backgroundColor: `${hashTagList.color}` }}>
            {hashTag}
          </li>
        ))}
      </ul>
      <p>{text}</p>

      <p className={styles.updateDate}>{updatedDate(`${dayjs(createAt).format()}`)}</p>
    </li>
  )
}

export default ReadNote
