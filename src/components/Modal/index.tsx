import { Dispatch } from 'react'

import styles from './modal.module.scss'

interface IModalProps {
  message: string
  setOpenModal: Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ message, setOpenModal }: IModalProps) => {
  const handleModalButtonClick = () => {
    setOpenModal(false)
  }

  return (
    <div className={styles.modalBox}>
      {}
      <p>{message}</p>
      <button type='button' onClick={handleModalButtonClick}>
        확인
      </button>
    </div>
  )
}

export default Modal
