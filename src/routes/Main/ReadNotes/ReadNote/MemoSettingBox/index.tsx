import { Dispatch, useEffect, useRef } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { useRecoilValue } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import { firebaseDBService } from 'utils/firebaseService/firebaseSetting'
import { userIdAtom } from 'store/atom'

import styles from './memoSettingBox.module.scss'

interface IMemoSettingBoxProps {
  setOpenMemoSettingBox: Dispatch<React.SetStateAction<boolean>>
  docId: string
}

const MemoSettingBox = ({ setOpenMemoSettingBox, docId }: IMemoSettingBoxProps) => {
  const userId = useRecoilValue(userIdAtom)
  const boxRef = useRef(null)

  const clickOutsideHandle = () => {
    setOpenMemoSettingBox(false)
  }

  const { clickOutsideEvent } = useClickOutside(boxRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleModifyMemoClick = () => {}

  const handleDeleteMemoClick = async () => {
    await deleteDoc(doc(firebaseDBService, userId, docId))
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
