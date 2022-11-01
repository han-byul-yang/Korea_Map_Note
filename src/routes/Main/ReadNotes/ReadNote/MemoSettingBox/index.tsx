import { Dispatch, useEffect, useRef } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import useOpenMessageModal from 'hooks/useOpenMessageModal'
import { getDocsFromFirebase } from 'utils/firebaseService/firebaseDBService'
import { firebaseDBService } from 'utils/firebaseService/firebaseSetting'
import modalMessage from 'utils/modalMessage'
import { isOpenAddNoteFormAtom, isOpenReadNotesAtom, memoAtom, userIdAtom } from 'store/atom'

import styles from './memoSettingBox.module.scss'

interface IMemoSettingBoxProps {
  setOpenMemoSettingBox: Dispatch<React.SetStateAction<boolean>>
  docId: string
}

const MemoSettingBox = ({ setOpenMemoSettingBox, docId }: IMemoSettingBoxProps) => {
  const userId = useRecoilValue(userIdAtom)
  const setOpenAddNoteForm = useSetRecoilState(isOpenAddNoteFormAtom)
  const setOpenReadNotes = useSetRecoilState(isOpenReadNotesAtom)
  const setMemo = useSetRecoilState(memoAtom)
  const { openMessageModal, closeMessageModal } = useOpenMessageModal()
  const boxRef = useRef(null)

  const clickOutsideHandle = () => {
    setOpenMemoSettingBox(false)
  }

  const { clickOutsideEvent } = useClickOutside(boxRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleModifyMemoClick = () => {
    setOpenAddNoteForm({ type: 'edit', isOpen: true })
    setOpenReadNotes(false)
    getDocsFromFirebase(userId).then((memoDocs) =>
      setMemo(memoDocs.docs.filter((ele) => ele.id === docId)[0].data().data.memo)
    )
  }

  const deleteMessageOkButtonHandle = async () => {
    await deleteDoc(doc(firebaseDBService, userId, docId))
    closeMessageModal()
  }

  const handleDeleteMemoClick = () => {
    openMessageModal(modalMessage().warning.memo.DELETE_MEMO, deleteMessageOkButtonHandle)
  }

  return (
    <div className={styles.settingBox} ref={boxRef}>
      <button className={styles.settingButton} type='button' onClick={handleModifyMemoClick}>
        메모 수정
      </button>
      <button className={styles.settingButton} type='button' onClick={handleDeleteMemoClick}>
        메모 삭제
      </button>
    </div>
  )
}

export default MemoSettingBox

// async await 필요할지
