import { Dispatch, useEffect, useRef } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import useOpenMessageModal from 'hooks/useOpenMessageModal'
import { getDocsFromFirebase } from 'utils/firebaseService/firebaseDBService'
import { firebaseDBService } from 'utils/firebaseService/firebaseSetting'
import modalMessage from 'utils/modalMessage'
import {
  imageListAtom,
  isOkChangeMarkAtom,
  isOpenAddNoteFormAtom,
  isOpenReadNotesAtom,
  memoAtom,
  userIdAtom,
} from 'store/atom'
import { IMemoDoc, IStoredMemoInfo } from 'types/memoType'

import styles from './memoSettingBox.module.scss'

interface IMemoSettingBoxProps {
  setOpenMemoSettingBox: Dispatch<React.SetStateAction<boolean>>
  storedMemo: IMemoDoc
  pictureList: File[] | string[]
}

const MemoSettingBox = ({ setOpenMemoSettingBox, storedMemo, pictureList }: IMemoSettingBoxProps) => {
  const userId = useRecoilValue(userIdAtom)
  const setIsOpenAddNoteForm = useSetRecoilState(isOpenAddNoteFormAtom)
  const setIsOpenReadNotes = useSetRecoilState(isOpenReadNotesAtom)
  const setMemo = useSetRecoilState(memoAtom)
  const setIsOkChangeMark = useSetRecoilState(isOkChangeMarkAtom)
  const [imageFiles, setImageFiles] = useRecoilState(imageListAtom)
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
    setIsOpenAddNoteForm({ type: 'edit', isOpen: true })
    setIsOpenReadNotes(false)
    /* getDocsFromFirebase(userId).then((memoDocs) =>
      setMemo(memoDocs.docs.filter((ele) => ele.id === docId)[0].data().data.memo)
    ) */
    setMemo({
      ...storedMemo.memoInfo.memo,
      travelDate: {
        startDate: storedMemo.memoInfo.memo.travelDate.startDate.toDate(),
        endDate: storedMemo.memoInfo.memo.travelDate.endDate.toDate(),
      },
    })
    // setImageFiles(pictureList)
  }

  const deleteMessageOkButtonHandle = async () => {
    await deleteDoc(doc(firebaseDBService, userId, `${storedMemo.docId}`))
    setIsOkChangeMark(true)
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
