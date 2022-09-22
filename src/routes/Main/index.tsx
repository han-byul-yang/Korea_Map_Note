import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import modalMessage from 'utils/modalMessage'
import { geolocationAtom, markPositionAtom } from 'store/atom'
import { IMessage } from 'types/messageType'
import { IGeolocationError, IGeolocationPosition } from 'types/geolocationType'
import MessageModal from 'components/Modal/MessageModal'
import AddNoteForm from 'routes/Main/AddNoteForm'
import InfoWindow from './InfoWindow'
import ModalPortal from 'components/Modal/ModalPortal'

import positionMarkImg from 'assets/img/mark.png'
import geolocationMarkImg from 'assets/img/mark2.png'

const Main = () => {
  const [geolocation, setGeolocation] = useRecoilState(geolocationAtom)
  const [markPosition, setMarkPosition] = useRecoilState(markPositionAtom)
  const [openInfoWindow, setOpenInfoWindow] = useState({ geolocation: false, position: false })
  const [openMessageModal, setOpenMessageModal] = useState(false)
  const [openAddNoteForm, setOpenAddNoteForm] = useState(false)
  const [message, setMessage] = useState<IMessage>({ kind: '', message: '' })

  const retrieveSuccess = useCallback(
    (position: IGeolocationPosition) => {
      setGeolocation({ latitude: position.coords.latitude!, longitude: position.coords.longitude! })
    },
    [setGeolocation]
  )

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
  }, [retrieveSuccess])

  const handleMapMarkerClick = () => {
    setOpenInfoWindow((prev) => {
      return {
        ...prev,
        geolocation: !prev.geolocation,
      }
    })
  }

  const clickOutsideTarget = (mark: string) => {
    setOpenInfoWindow((prev) => {
      return { ...prev, [mark]: false }
    })
  }

  return (
    <>
      <AddNoteForm setOpenAddNoteForm={setOpenAddNoteForm} openAddNoteForm={openAddNoteForm} />
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
          onClick={handleMapMarkerClick}
          image={{
            src: positionMarkImg,
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
          {openInfoWindow.position && (
            <InfoWindow
              clickOutsideTarget={() => clickOutsideTarget('position')}
              setOpenAddNoteForm={setOpenAddNoteForm}
            />
          )}
        </MapMarker>
        <MapMarker
          position={{ lat: geolocation.latitude, lng: geolocation.longitude }}
          clickable
          onClick={handleMapMarkerClick}
          image={{
            src: geolocationMarkImg,
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
          {openInfoWindow.geolocation && (
            <InfoWindow
              clickOutsideTarget={() => clickOutsideTarget('geolocation')}
              setOpenAddNoteForm={setOpenAddNoteForm}
            />
          )}
        </MapMarker>
      </Map>
      {openMessageModal && (
        <ModalPortal>
          <MessageModal message={message} setOpenMessageModal={setOpenMessageModal} />
        </ModalPortal>
      )}
    </>
  )
}

export default Main

// declare 정확히 알기
// env 파일에 key 집어넣기
// 지도 렌더링 시간 너무 오래걸림
// mapmarker 리팩토링, handleMapMarkerClick 함수도
