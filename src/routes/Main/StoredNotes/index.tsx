import { useRecoilValue } from 'recoil'

import { isOpenReadNotesAtom } from 'store/atom'

import styles from './storedNotes.module.scss'

const StoredNotes = () => {
  const openReadNotes = useRecoilValue(isOpenReadNotesAtom)

  return (
    <div className={openReadNotes ? styles.openContainer : styles.closeContainer}>
      <div className={styles.readNotesBox}>dd</div>
    </div>
  )
}

export default StoredNotes
