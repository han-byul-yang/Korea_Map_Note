import { useRecoilValue, useSetRecoilState } from 'recoil'

import { isOpenMessageModalAtom, messageAtom } from 'store/atom'

import { ErrorIcon, NoticeIcon, WarningIcon } from 'assets/svgs'
import styles from './messageModal.module.scss'

const MessageModal = () => {
  const setIsOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)
  const message = useRecoilValue(messageAtom)

  const handleMessageButtonClick = () => {
    setIsOpenMessageModal(false)
  }

  const modalIcon = {
    ERROR: <ErrorIcon className={styles.typeIcon} />,
    NOTIFICATION: <NoticeIcon className={styles.typeIcon} />,
    WARNING: <WarningIcon className={styles.typeIcon} />,
  }[message.kind.toUpperCase()]

  const messageModalButton = {
    ERROR: (
      <button type='button' onClick={handleMessageButtonClick}>
        확인
      </button>
    ),
    NOTIFICATION: (
      <button type='button' onClick={handleMessageButtonClick}>
        확인했습니다
      </button>
    ),
    WARNING: (
      <div className={styles.buttonBox}>
        <button type='button' onClick={message.warningMessageOkButtonHandle}>
          예
        </button>
        <button type='button' onClick={handleMessageButtonClick}>
          아니오
        </button>
      </div>
    ),
  }[message.kind.toUpperCase()]

  return (
    <>
      <div className={styles.background} />
      <div className={styles.modalBox}>
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
