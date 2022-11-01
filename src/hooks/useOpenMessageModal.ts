import { MouseEventHandler } from 'react'
import { useSetRecoilState } from 'recoil'

import { isOpenMessageModalAtom, messageAtom } from 'store/atom'

const useOpenMessageModal = () => {
  const setMessage = useSetRecoilState(messageAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)

  const openMessageModal = (
    message: { kind: string; message: string },
    warningMessageOkButtonHandle?: MouseEventHandler<HTMLButtonElement> | undefined
  ) => {
    setOpenMessageModal(true)
    setMessage({ ...message, warningMessageOkButtonHandle })
  }

  const closeMessageModal = () => {
    setOpenMessageModal(false)
  }

  return { openMessageModal, closeMessageModal }
}

export default useOpenMessageModal
