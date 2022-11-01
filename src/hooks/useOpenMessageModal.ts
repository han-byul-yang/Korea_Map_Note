import { MouseEventHandler } from 'react'
import { useSetRecoilState } from 'recoil'

import { isOpenMessageModalAtom, messageAtom } from 'store/atom'

const useOpenMessageModal = () => {
  const setMessage = useSetRecoilState(messageAtom)
  const setIsOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)

  const openMessageModal = (
    message: { kind: string; message: string },
    warningMessageOkButtonHandle?: MouseEventHandler<HTMLButtonElement> | undefined
  ) => {
    setIsOpenMessageModal(true)
    setMessage({ ...message, warningMessageOkButtonHandle })
  }

  const closeMessageModal = () => {
    setIsOpenMessageModal(false)
  }

  return { openMessageModal, closeMessageModal }
}

export default useOpenMessageModal
