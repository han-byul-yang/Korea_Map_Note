import { Dispatch } from 'react'

import { IMessage } from 'types/messageType'

import { ErrorIcon, NoticeIcon, WarningIcon, XIcon } from 'assets/svgs'
import styles from './modal.module.scss'

interface IModalProps {
  message: IMessage
  setOpenModal: Dispatch<React.SetStateAction<boolean>>
}

const modalIcon = {
  ERROR: <ErrorIcon className={styles.typeIcon} />,
  NOTIFICATION: <NoticeIcon className={styles.typeIcon} />,
  WARNING: <WarningIcon className={styles.typeIcon} />,
}

const Modal = ({ message, setOpenModal }: IModalProps) => {
  const handleModalButtonClick = () => {
    setOpenModal(false)
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

export default Modal
