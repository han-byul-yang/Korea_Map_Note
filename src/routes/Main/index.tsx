import { useEffect, useState } from 'react'

import kakaoMap, { kakaoMapMark } from 'utils/kakaoMap'
import modalMessage from 'utils/modalMessage'
import { IMessage } from 'types/messageType'
import { IGeolocationError, IGeolocationPosition } from 'types/geolocationType'
import Modal from 'components/Modal'
import ModalPortal from 'components/Modal/ModalPortal'

import styles from './main.module.scss'

const Main = () => {
  const [openModal, setOpenModal] = useState(false)
  const [message, setMessage] = useState<IMessage>({ kind: '', message: '' })

  const retrieveSuccess = (position: IGeolocationPosition) => {
    const map = kakaoMap(position.coords.latitude, position.coords.longitude)
    kakaoMapMark(map)
  }

  const retrieveError = (error: IGeolocationError) => {
    setOpenModal(true)
    if (error.code === 1) setMessage(modalMessage().error.geolocation.PERMISSION_DENIED)
    if (error.code === 2) setMessage(modalMessage().error.geolocation.POSITION_UNAVAILABLE)
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setOpenModal(true)
      setMessage(modalMessage().error.geolocation.NOT_SUPPOERTED)
    } else navigator.geolocation.watchPosition(retrieveSuccess, retrieveError)
  }, [])

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
// 지도 렌더링 시간 너무 오래걸림
