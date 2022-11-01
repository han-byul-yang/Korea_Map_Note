import { Dispatch, useCallback, useEffect } from 'react'
import { Map, ZoomControl } from 'react-kakao-maps-sdk'
import { useRecoilState, useRecoilValue } from 'recoil'

import useOpenMessageModal from 'hooks/useOpenMessageModal'
import { mapLevelAtom, mapPositionAtom, markPositionAtom, userIdAtom } from 'store/atom'
import { IGeolocationPosition, IGeolocationError } from 'types/geolocationType'
import modalMessage from 'utils/modalMessage'
import { getDocsFromFirebase } from 'utils/firebaseService/firebaseDBService'
import Marker from './Marker'

import geolocationMarkImg from 'assets/img/geolocationMark.png'
import locationMarkImg from 'assets/img/locationMark.png'
import searchMarkImg from 'assets/img/searchMark.png'
import memoMarkImg from 'assets/img/memoMark.png'

interface IKakaoMapProps {
  setIsMapLoaded: Dispatch<React.SetStateAction<boolean>>
  isMapLoaded: boolean
}

const KakaoMap = ({ setIsMapLoaded, isMapLoaded }: IKakaoMapProps) => {
  const userId = useRecoilValue(userIdAtom)
  const [mapPosition, setMapPosition] = useRecoilState(mapPositionAtom)
  const [markPosition, setMarkPosition] = useRecoilState(markPositionAtom)
  const [mapLevel, setMapLevel] = useRecoilState(mapLevelAtom)
  const { openMessageModal } = useOpenMessageModal()

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
      if (error.code === 1) openMessageModal(modalMessage().error.geolocation.PERMISSION_DENIED)
      if (error.code === 2) openMessageModal(modalMessage().error.geolocation.POSITION_UNAVAILABLE)
    },
    [openMessageModal]
  )

  useEffect(() => {
    if (!navigator.geolocation) {
      openMessageModal(modalMessage().error.geolocation.NOT_SUPPOERTED)
    } else navigator.geolocation.getCurrentPosition(retrieveSuccess, retrieveError)
  }, [openMessageModal, retrieveError, retrieveSuccess])

  useEffect(() => {
    getDocsFromFirebase(userId).then((memoDocs) =>
      setMarkPosition((prevPosition) => {
        return {
          ...prevPosition,
          memoPlacePosition: memoDocs.docs.map((doc) => {
            const {
              geolocation: { latitude, longitude },
              memo: { picture },
            } = doc.data().data
            return {
              latitude,
              longitude,
              image: picture,
            }
          }),
        }
      })
    )
  }, [setMarkPosition, userId])

  const handleMapPositionClick = (_t: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    setMarkPosition((prev) => {
      return {
        ...prev,
        location: { latitude: mouseEvent.latLng.getLat(), longitude: mouseEvent.latLng.getLng() },
      }
    })
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
      <Marker markImg={geolocationMarkImg} markPosition={markPosition.geolocation} isMapLoaded={isMapLoaded} />
      <Marker markImg={locationMarkImg} markPosition={markPosition.location} isMapLoaded={isMapLoaded} />
      <Marker markImg={searchMarkImg} markPosition={markPosition.searchPosition} isMapLoaded={isMapLoaded} />
      {markPosition.memoPlacePosition.map((memoPosition: any, i: number) => {
        const memoMarkerKey = `memoMarker-${i}`
        return (
          <Marker key={memoMarkerKey} markImg={memoMarkImg} markPosition={memoPosition} isMapLoaded={isMapLoaded} />
        )
      })}
      <ZoomControl position={kakao.maps.ControlPosition.BOTTOMRIGHT} />
    </Map>
  )
}

export default KakaoMap

// location 이름 직관적으로 바꾸기 -> clickedLocation, clickedPosition
// setOpenAddNoteForm, openAddNoteForm context api 로 핸들
// memoPosition.image[0] ||
