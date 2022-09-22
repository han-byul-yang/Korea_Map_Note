import { useCallback, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import modalMessage from 'utils/modalMessage'
import { clickedMarkPositionAtom } from 'store/atom'
import { IMessage } from 'types/messageType'
import { IGeolocationError, IGeolocationPosition } from 'types/geolocationType'
import { IMarkPosition, IOpenInfoWindow } from 'types/markPositionType'
import MessageModal from 'components/Modal/MessageModal'
import AddNoteForm from 'routes/Main/AddNoteForm'
import InfoWindow from './InfoWindow'
import ModalPortal from 'components/Modal/ModalPortal'

import positionMarkImg from 'assets/img/mark.png'
import geolocationMarkImg from 'assets/img/mark2.png'

const Main = () => {
  const [markPosition, setMarkPosition] = useState<IMarkPosition>({
    geolocation: { latitude: 0, longitude: 0 },
    location: { latitude: 0, longitude: 0 },
  })
  const setClickedMarkPosition = useSetRecoilState(clickedMarkPositionAtom)
  const [openInfoWindow, setOpenInfoWindow] = useState<IOpenInfoWindow>({ geolocation: false, location: false })
  const [openMessageModal, setOpenMessageModal] = useState(false)
  const [openAddNoteForm, setOpenAddNoteForm] = useState(false)
  const [message, setMessage] = useState<IMessage>({ kind: '', message: '' })

  const retrieveSuccess = useCallback(
    (position: IGeolocationPosition) => {
      setMarkPosition((prev) => {
        return { ...prev, geolocation: { latitude: position.coords.latitude!, longitude: position.coords.longitude! } }
      })
    },
    [setMarkPosition]
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

  const handleMapPositionClick = (_t: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    setMarkPosition((prev) => {
      return {
        ...prev,
        location: { latitude: mouseEvent.latLng.getLat(), longitude: mouseEvent.latLng.getLng() },
      }
    })
    setOpenAddNoteForm(false)
  }

  const handleMapMarkerClick = (clickedPosition: string) => {
    setOpenInfoWindow((prev) => {
      return {
        ...prev,
        [clickedPosition]: !prev[clickedPosition],
      }
    })
    setClickedMarkPosition({
      latitude: markPosition[clickedPosition].latitude,
      longitude: markPosition[clickedPosition].longitude,
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
          lat: markPosition.geolocation.latitude,
          lng: markPosition.geolocation.longitude,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
        level={12}
        onClick={handleMapPositionClick}
      >
        <MapMarker
          position={{ lat: markPosition.location.latitude, lng: markPosition.location.longitude }}
          clickable
          onClick={() => handleMapMarkerClick('location')}
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
          {openInfoWindow.location && (
            <InfoWindow
              clickOutsideTarget={() => clickOutsideTarget('location')}
              setOpenAddNoteForm={setOpenAddNoteForm}
            />
          )}
        </MapMarker>
        <MapMarker
          position={{ lat: markPosition.geolocation.latitude, lng: markPosition.geolocation.longitude }}
          clickable
          onClick={() => handleMapMarkerClick('geolocation')}
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
