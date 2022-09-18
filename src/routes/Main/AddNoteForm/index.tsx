import { Dispatch } from 'react'

import { XIcon } from 'assets/svgs'
import styles from './addNoteForm.module.scss'

interface IAddNoteProps {
  setOpenAddNoteForm: Dispatch<React.SetStateAction<boolean>>
}

const AddNoteModal = ({ setOpenAddNoteForm }: IAddNoteProps) => {
  const handleXButtonClick = () => {
    setOpenAddNoteForm(false)
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <XIcon className={styles.xIcon} onClick={handleXButtonClick} />
      </div>
    </div>
  )
}

export default AddNoteModal
