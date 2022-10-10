import { Dispatch } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { isOpenAddNoteFormAtom, isOpenMessageModalAtom, memoAtom, messageAtom } from 'store/atom'

import { ErrorIcon, NoticeIcon, WarningIcon, XIcon } from 'assets/svgs'
import styles from './messageModal.module.scss'

interface IMessageModalProps {
  setChangeMemoPlaceName: Dispatch<React.SetStateAction<boolean>>
  setFileImageList: Dispatch<React.SetStateAction<File[]>>
}

const MessageModal = ({ setChangeMemoPlaceName, setFileImageList }: IMessageModalProps) => {
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)
  const setOpenAddNoteForm = useSetRecoilState(isOpenAddNoteFormAtom)
  const setMemo = useSetRecoilState(memoAtom)
  const message = useRecoilValue(messageAtom)

  const handleErrorOkButtonClick = () => {
    setOpenMessageModal(false)
  }

  const handleWarningOkButtonClick = () => {
    setOpenAddNoteForm(false)
    setOpenMessageModal(false)
    setMemo({ siteName: '', travelDate: '', text: '', picture: [], hashTagList: [] })
    setChangeMemoPlaceName(false)
    setFileImageList([])
  }

  const handleWarningCancelButtonClick = () => {
    setOpenMessageModal(false)
  }

  const modalIcon = {
    ERROR: <ErrorIcon className={styles.typeIcon} />,
    NOTIFICATION: <NoticeIcon className={styles.typeIcon} />,
    WARNING: <WarningIcon className={styles.typeIcon} />,
  }[message.kind.toUpperCase()]

  const messageModalButton = {
    ERROR: (
      <button type='button' onClick={handleErrorOkButtonClick}>
        확인
      </button>
    ),
    NOTIFICATION: <button type='button'>확인했습니다</button>,
    WARNING: (
      <div className={styles.buttonBox}>
        <button type='button' onClick={handleWarningOkButtonClick}>
          예
        </button>
        <button type='button' onClick={handleWarningCancelButtonClick}>
          아니오
        </button>
      </div>
    ),
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
