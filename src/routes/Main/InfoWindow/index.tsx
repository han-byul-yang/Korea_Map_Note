import { Dispatch, useEffect, useRef } from 'react'

import useClickOutside from 'hooks/useClickOutside'

import { NotebookIcon, WriteIcon } from 'assets/svgs'
import styles from './infoWindow.module.scss'

interface IInfoWindowProps {
  setOpenInfoWindow: Dispatch<React.SetStateAction<boolean>>
}

const InfoWindow = ({ setOpenInfoWindow }: IInfoWindowProps) => {
  const containerRef = useRef(null)
  const { outsideClickEvent } = useClickOutside(containerRef, setOpenInfoWindow)

  useEffect(() => {
    outsideClickEvent()
  }, [outsideClickEvent])

  return (
    <>
      <div className={styles.background} />
      <div className={styles.infoWindowContainer} ref={containerRef}>
        <div className={styles.box}>
          <WriteIcon className={styles.icon} />
          추억 추가
        </div>
        <div className={styles.box}>
          <NotebookIcon className={styles.icon} />
          추억 보기
        </div>
      </div>
    </>
  )
}

export default InfoWindow
