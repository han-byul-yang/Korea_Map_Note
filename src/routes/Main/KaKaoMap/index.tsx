import { Dispatch, useCallback, useEffect } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  isOpenAddNoteFormAtom,
  isOpenMessageModalAtom,
  mapLevelAtom,
  mapPositionAtom,
  markPositionAtom,
  memoAtom,
  messageAtom,
} from 'store/atom'
import { IGeolocationPosition, IGeolocationError } from 'types/geolocationType'
import { IPosition } from 'types/markPositionType'
import modalMessage from 'utils/modalMessage'
import { getDocsFromFirebase } from 'utils/firebaseService/firebaseDBService'
import Marker from './Marker'

import geolocationMarkImg from 'assets/img/geolocationMark.png'
import locationMarkImg from 'assets/img/locationMark.png'
import searchMarkImg from 'assets/img/searchMark.png'

interface IKakaoMapProps {
  setIsMapLoaded: Dispatch<React.SetStateAction<boolean>>
  isMapLoaded: boolean
  setChangeMemoPlaceName: Dispatch<React.SetStateAction<boolean>>
}

const KakaoMap = ({ setIsMapLoaded, isMapLoaded, setChangeMemoPlaceName }: IKakaoMapProps) => {
  const [mapPosition, setMapPosition] = useRecoilState(mapPositionAtom)
  const [markPosition, setMarkPosition] = useRecoilState(markPositionAtom)
  const [openAddNoteForm, setOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)
  const [mapLevel, setMapLevel] = useRecoilState(mapLevelAtom)
  const setMessage = useSetRecoilState(messageAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)
  const setMemo = useSetRecoilState(memoAtom) // type 설정

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

  useEffect(() => {
    getDocsFromFirebase('memoInfo').then((memoDocs) =>
      memoDocs.forEach((memo) => {
        setMarkPosition((prevPosition) => {
          return { ...prevPosition, memoPlacePosition: [memo.data().geolocation, ...prevPosition.memoPlacePosition] }
        })
      })
    )
  }, [setMarkPosition])

  const handleMapPositionClick = (_t: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    setMarkPosition((prev) => {
      return {
        ...prev,
        location: { latitude: mouseEvent.latLng.getLat(), longitude: mouseEvent.latLng.getLng() },
      }
    })
    setMemo({ siteName: '', travelDate: '', text: '', picture: '', hashTag: [''] })
    setChangeMemoPlaceName(false)
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
      onCreate={() => setIsMapLoaded(true)}
    >
      <Marker
        markImg={geolocationMarkImg}
        markPosition={markPosition.geolocation}
        isMapLoaded={isMapLoaded}
        setChangeMemoPlaceName={setChangeMemoPlaceName}
      />
      <Marker
        markImg={locationMarkImg}
        markPosition={markPosition.location}
        isMapLoaded={isMapLoaded}
        setChangeMemoPlaceName={setChangeMemoPlaceName}
      />
      <Marker
        markImg={searchMarkImg}
        markPosition={markPosition.searchPosition}
        isMapLoaded={isMapLoaded}
        setChangeMemoPlaceName={setChangeMemoPlaceName}
      />
      {markPosition.memoPlacePosition.map((memoPosition: IPosition, i: number) => (
        <Marker
          key={i}
          markImg={geolocationMarkImg}
          markPosition={memoPosition}
          isMapLoaded={isMapLoaded}
          setChangeMemoPlaceName={setChangeMemoPlaceName}
        />
      ))}
    </Map>
  )
}

export default KakaoMap

// location 이름 직관적으로 바꾸기 -> clickedLocation, clickedPosition
// setOpenAddNoteForm, openAddNoteForm context api 로 핸들
