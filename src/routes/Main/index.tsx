import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import modalMessage from 'utils/modalMessage'
import { IMessage } from 'types/messageType'
import { IGeolocationError, IGeolocationPosition } from 'types/geolocationType'
import Modal from 'components/Modal'
import InfoWindow from './InfoWindow'
import ModalPortal from 'components/Modal/ModalPortal'

import markImg from 'assets/img/mark.png'
import styles from './main.module.scss'

const Main = () => {
  const [geolocation, setGeolocation] = useState({
    latitude: 0,
    longitude: 0,
  })
  const [markPosition, setMarkPosition] = useState({ latitude: 0, longitude: 0 })
  const [openInfoWindow, setOpenInfoWindow] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [message, setMessage] = useState<IMessage>({ kind: '', message: '' })

  const retrieveSuccess = (position: IGeolocationPosition) => {
    setGeolocation({ latitude: position.coords.latitude!, longitude: position.coords.longitude! })
    setMarkPosition({ latitude: position.coords.latitude!, longitude: position.coords.longitude! })
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
      <Map
        center={{
          lat: geolocation.latitude,
          lng: geolocation.longitude,
        }}
        style={{
          width: '100vw',
          height: '100vh',
        }}
        level={12}
        onClick={(_t, mouseEvent) =>
          setMarkPosition({
            latitude: mouseEvent.latLng.getLat(),
            longitude: mouseEvent.latLng.getLng(),
          })
        }
      >
        <MapMarker
          position={{ lat: markPosition.latitude, lng: markPosition.longitude }}
          clickable
          onClick={() => setOpenInfoWindow(true)}
          image={{
            src: markImg,
            size: {
              width: 74,
              height: 79,
            },
            options: {
              offset: {
                x: 27,
                y: 69,
              },
            },
          }}
        >
          {openInfoWindow && <InfoWindow />}
        </MapMarker>
      </Map>
      {openModal && (
        <ModalPortal>
          <Modal message={message} setOpenModal={setOpenModal} />
        </ModalPortal>
      )}
    </>
  )
}

export default Main

// declare 정확히 알기
// env 파일에 key 집어넣기
// 지도 렌더링 시간 너무 오래걸림
