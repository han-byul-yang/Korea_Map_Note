import { Dispatch } from 'react'
import { useRecoilValue } from 'recoil'

import { messageAtom } from 'store/atom'

import { ErrorIcon, NoticeIcon, WarningIcon, XIcon } from 'assets/svgs'
import styles from './messageModal.module.scss'

interface IModalProps {
  setOpenMessageModal: Dispatch<React.SetStateAction<boolean>>
}

const modalIcon = {
  ERROR: <ErrorIcon className={styles.typeIcon} />,
  NOTIFICATION: <NoticeIcon className={styles.typeIcon} />,
  WARNING: <WarningIcon className={styles.typeIcon} />,
}

const MessageModal = ({ setOpenMessageModal }: IModalProps) => {
  const message = useRecoilValue(messageAtom)
  const handleModalButtonClick = () => {
    setOpenMessageModal(false)
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox}>
        <XIcon className={styles.xIcon} onClick={handleModalButtonClick} />
        <div className={styles.typeBox}>
          {modalIcon.ERROR}
          {message.kind.toUpperCase()}
        </div>
        <p>{message.message}</p>
        <button type='button' onClick={handleModalButtonClick}>
          확인
        </button>
      </div>
    </>
  )
}

export default MessageModal
