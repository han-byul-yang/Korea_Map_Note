import { useState } from 'react'

import { IMemoDoc } from 'types/memoType'
import MemoSettingBox from 'routes/Main/ReadNotes/ReadNote/MemoSettingBox'

import { MoreIcon } from 'assets/svgs'
import styles from './readNote.module.scss'

interface IReadNoteProps {
  storedMemo: IMemoDoc
}

const ReadNote = ({ storedMemo }: IReadNoteProps) => {
  const [openMemoSettingBox, setOpenMemoSettingBox] = useState(false)
  const { picture, siteName, travelDate, hashTagList, text } = storedMemo.memoInfo.memo

  const handleMoreButtonClick = () => {
    setOpenMemoSettingBox(true)
  }

  return (
    <li key={`${storedMemo.memoInfo.createAt}`} className={styles.readNoteCard}>
      <button type='button' onClick={handleMoreButtonClick}>
        <MoreIcon className={styles.moreIcon} />
      </button>
      {openMemoSettingBox && <MemoSettingBox setOpenMemoSettingBox={setOpenMemoSettingBox} docId={storedMemo.docId} />}
      <ul className={styles.imgBox}>
        {picture.map((singlePicture) => (
          <img key={`${singlePicture}`} alt='memoSinglePicture' src={`${singlePicture}`} />
        ))}
      </ul>
      <p>{siteName} 에서..</p>
      <p>{travelDate}</p>
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
