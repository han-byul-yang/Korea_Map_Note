import { IMemoDocs } from 'types/memoType'

import styles from './readNote.module.scss'

interface IReadNoteProps {
  storedMemo: IMemoDocs
}

const ReadNote = ({ storedMemo }: IReadNoteProps) => {
  return (
    <li key={`${storedMemo.createAt}`} className={styles.readNoteCard}>
      <ul className={styles.imgBox}>
        {storedMemo.memo.picture.map((singlePicture) => (
          <img key={`${singlePicture}`} alt='memoSinglePicture' src={`${singlePicture}`} />
        ))}
      </ul>
      <p>{storedMemo.memo.siteName} 에서..</p>
      <p>{storedMemo.memo.travelDate}</p>
      <ul>
        {storedMemo.memo.hashTagList.map((hashTag: string) => (
          <li key={hashTag}>{hashTag}</li>
        ))}
      </ul>
      <p>{storedMemo.memo.text}</p>
    </li>
  )
}

export default ReadNote
