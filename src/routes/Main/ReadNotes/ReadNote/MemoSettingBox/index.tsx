import { Dispatch, useEffect, useRef } from 'react'

import useClickOutside from 'hooks/useClickOutside'

import styles from './memoSettingBox.module.scss'

interface IMemoSettingBoxProps {
  setOpenMemoSettingBox: Dispatch<React.SetStateAction<boolean>>
}

const MemoSettingBox = ({ setOpenMemoSettingBox }: IMemoSettingBoxProps) => {
  const boxRef = useRef(null)

  const clickOutsideHandle = () => {
    setOpenMemoSettingBox(false)
  }

  const { clickOutsideEvent } = useClickOutside(boxRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  return (
    <div className={styles.settingBox} ref={boxRef}>
      <button className={styles.settingButton} type='button'>
        메모 수정
      </button>
      <button className={styles.settingButton} type='button'>
        메모 삭제
      </button>
    </div>
  )
}

export default MemoSettingBox
