import { useCallback, useEffect, useState } from 'react'

import kakaoMap from 'utils/kakaoMap'
import useMessages from 'hooks/useMessages'
import Modal from 'components/Modal'
import ModalPortal from 'components/Modal/ModalPortal'

import styles from './main.module.scss'

const Main = () => {
  const [openModal, setOpenModal] = useState(false)
  const { messages, message } = useMessages()

  const retrieveSuccess = (position: any) => {
    kakaoMap(position.coords.latitude, position.coords.longitude)
  }

  const retrieveError = useCallback(() => {
    setOpenModal(true)
    messages.error.geolocation.retrieveError()
  }, [messages.error.geolocation])

  useEffect(() => {
    if (!navigator.geolocation) {
      setOpenModal(true)
      messages.error.geolocation.notSuppertedError()
    } else navigator.geolocation.watchPosition(retrieveSuccess, retrieveError)
  }, [messages.error.geolocation, retrieveError])

  return (
    <>
      <div id='kakaoMap' className={styles.mainMap} />
      {openModal && (
        <ModalPortal>
          <Modal message={message} setOpenModal={setOpenModal} />
        </ModalPortal>
      )}
    </>
  )
}

export default Main

// id를 ref로 바꿀 수 있음
// declare 정확히 알기
// env 파일에 key 집어넣기
