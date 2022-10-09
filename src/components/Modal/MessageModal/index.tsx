import { useRecoilValue, useSetRecoilState } from 'recoil'

import { isOpenMessageModalAtom, messageAtom } from 'store/atom'

import { ErrorIcon, NoticeIcon, WarningIcon, XIcon } from 'assets/svgs'
import styles from './messageModal.module.scss'

const MessageModal = () => {
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)
  const message = useRecoilValue(messageAtom)

  const handleModalButtonClick = () => {
    setOpenMessageModal(false)
  }

  const modalIcon = {
    ERROR: <ErrorIcon className={styles.typeIcon} />,
    NOTIFICATION: <NoticeIcon className={styles.typeIcon} />,
    WARNING: <WarningIcon className={styles.typeIcon} />,
  }[message.kind.toUpperCase()]

  const messageModalButton = {
    ERROR: <button type='button'>확인</button>,
    NOTIFICATION: (
      <div className={styles.buttonBox}>
        <button type='button'>예</button>
        <button type='button'>아니오</button>
      </div>
    ),
    WARNING: <button type='button'>확인했습니다</button>,
  }[message.kind.toUpperCase()]

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox}>
        {/* <XIcon className={styles.xIcon} onClick={handleModalButtonClick} /> */}
        <div className={styles.typeBox}>
          {modalIcon}
          {message.kind.toUpperCase()}
        </div>
        <p>{message.message}</p>
        {messageModalButton}
      </div>
    </>
  )
}

export default MessageModal
