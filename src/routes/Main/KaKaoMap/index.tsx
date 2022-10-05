import { Dispatch, useCallback, useEffect, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  isOpenAddNoteFormAtom,
  isOpenMessageModalAtom,
  mapLevelAtom,
  mapPositionAtom,
  markPositionAtom,
  messageAtom,
} from 'store/atom'
import { IGeolocationPosition, IGeolocationError } from 'types/geolocationType'
import modalMessage from 'utils/modalMessage'
import Marker from './Marker'

import geolocationMarkImg from 'assets/img/geolocationMark.png'
import locationMarkImg from 'assets/img/locationMark.png'
import searchMarkImg from 'assets/img/searchMark.png'

interface IKakaoMapProps {
  setMap: Dispatch<React.SetStateAction<boolean>>
}

const KakaoMap = ({ setMap }: IKakaoMapProps) => {
  const [mapPosition, setMapPosition] = useRecoilState(mapPositionAtom)
  const [markPosition, setMarkPosition] = useRecoilState(markPositionAtom)
  const [openAddNoteForm, setOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)
  const [mapLevel, setMapLevel] = useRecoilState(mapLevelAtom)
  const setMessage = useSetRecoilState(messageAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)

  const retrieveSuccess = useCallback(
    (position: IGeolocationPosition) => {
      setMapPosition({ latitude: position.coords.latitude!, longitude: position.coords.longitude! })
      setMarkPosition((prev) => {
        return { ...prev, geolocation: { latitude: position.coords.latitude!, longitude: position.coords.longitude! } }
      })
      setMapLevel(12)
    },
    [setMapLevel, setMapPosition, setMarkPosition]
  )

  const retrieveError = useCallback(
    (error: IGeolocationError) => {
      setOpenMessageModal(true)
      if (error.code === 1) setMessage(modalMessage().error.geolocation.PERMISSION_DENIED)
      if (error.code === 2) setMessage(modalMessage().error.geolocation.POSITION_UNAVAILABLE)
    },
    [setMessage, setOpenMessageModal]
  )

  useEffect(() => {
    if (!navigator.geolocation) {
      setOpenMessageModal(true)
      setMessage(modalMessage().error.geolocation.NOT_SUPPOERTED)
    } else navigator.geolocation.watchPosition(retrieveSuccess, retrieveError)
  }, [retrieveError, retrieveSuccess, setMessage, setOpenMessageModal])

  const handleMapPositionClick = (_t: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    setMarkPosition((prev) => {
      return {
        ...prev,
        location: { latitude: mouseEvent.latLng.getLat(), longitude: mouseEvent.latLng.getLng() },
      }
    })
    if (openAddNoteForm) setOpenAddNoteForm(false)
  }

  return (
    <Map
      center={{
        lat: mapPosition.latitude,
        lng: mapPosition.longitude,
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
      level={mapLevel}
      onClick={handleMapPositionClick}
      onCreate={() => setMap(true)}
    >
      <Marker
        markImg={geolocationMarkImg}
        markPosition={markPosition.geolocation}
        setOpenAddNoteForm={setOpenAddNoteForm}
      />
      <Marker markImg={locationMarkImg} markPosition={markPosition.location} setOpenAddNoteForm={setOpenAddNoteForm} />
      <Marker
        markImg={searchMarkImg}
        markPosition={markPosition.searchPosition}
        setOpenAddNoteForm={setOpenAddNoteForm}
      />
    </Map>
  )
}

export default KakaoMap

// location 이름 직관적으로 바꾸기 -> clickedLocation, clickedPosition
// setOpenAddNoteForm, openAddNoteForm context api 로 핸들
