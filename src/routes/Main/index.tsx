import { useEffect, useState } from 'react'
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'

import modalMessage from 'utils/modalMessage'
import { IMessage } from 'types/messageType'
import { IGeolocationError, IGeolocationPosition } from 'types/geolocationType'
import MessageModal from 'components/Modal/MessageModal'
import AddNoteModal from 'components/Modal/AddNoteModal'
import InfoWindow from './InfoWindow'
import ModalPortal from 'components/Modal/ModalPortal'

import markImg from 'assets/img/mark.png'

const Main = () => {
  const [geolocation, setGeolocation] = useState({
    latitude: 0,
    longitude: 0,
  })
  const [markPosition, setMarkPosition] = useState({ latitude: 0, longitude: 0 })
  const [openInfoWindow, setOpenInfoWindow] = useState(false)
  const [openMessageModal, setOpenMessageModal] = useState(false)
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false)
  const [message, setMessage] = useState<IMessage>({ kind: '', message: '' })

  const retrieveSuccess = (position: IGeolocationPosition) => {
    setGeolocation({ latitude: position.coords.latitude!, longitude: position.coords.longitude! })
    setMarkPosition({ latitude: position.coords.latitude!, longitude: position.coords.longitude! })
  }

  const retrieveError = (error: IGeolocationError) => {
    setOpenMessageModal(true)
    if (error.code === 1) setMessage(modalMessage().error.geolocation.PERMISSION_DENIED)
    if (error.code === 2) setMessage(modalMessage().error.geolocation.POSITION_UNAVAILABLE)
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setOpenMessageModal(true)
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
          width: '100%',
          height: '100%',
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
          onClick={() => setOpenInfoWindow((prev) => !prev)}
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
          {openInfoWindow && (
            <InfoWindow setOpenInfoWindow={setOpenInfoWindow} setOpenAddNoteModal={setOpenAddNoteModal} />
          )}
        </MapMarker>
      </Map>
      {openMessageModal && (
        <ModalPortal>
          <MessageModal message={message} setOpenMessageModal={setOpenMessageModal} />
        </ModalPortal>
      )}
      {openAddNoteModal && (
        <ModalPortal>
          <AddNoteModal setOpenAddNoteModal={setOpenAddNoteModal} />
        </ModalPortal>
      )}
    </>
  )
}

export default Main

// declare 정확히 알기
// env 파일에 key 집어넣기
// 지도 렌더링 시간 너무 오래걸림
