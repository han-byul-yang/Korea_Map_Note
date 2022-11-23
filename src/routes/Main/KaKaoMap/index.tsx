import { Dispatch, useCallback, useEffect } from 'react'
import { Map, ZoomControl } from 'react-kakao-maps-sdk'
import { useRecoilState, useRecoilValue } from 'recoil'
import { collection, query } from 'firebase/firestore'

import useOpenMessageModal from 'hooks/useOpenMessageModal'
import { isDeleteSearchMarkerAtom, mapLevelAtom, mapPositionAtom, markPositionAtom, userIdAtom } from 'store/atom'
import { IGeolocationPosition, IGeolocationError } from 'types/geolocationType'
import modalMessage from 'utils/modalMessage'
import { getDocsFromFirebase, snapShotFirebaseData } from 'utils/firebaseService/firebaseDBService'
import { firebaseDBService } from 'utils/firebaseService/firebaseSetting'
import { getMemoPositionFromFirebaseHandler } from 'utils/getDataFromFirebaseHandle'
import Marker from './Marker'

import geolocationMarkImg from 'assets/img/geolocationMark.png'
import locationMarkImg from 'assets/img/locationMark.png'
import searchMarkImg from 'assets/img/searchMark.png'

interface IKakaoMapProps {
  setIsMapLoaded: Dispatch<React.SetStateAction<boolean>>
  isMapLoaded: boolean
}

const KakaoMap = ({ setIsMapLoaded, isMapLoaded }: IKakaoMapProps) => {
  const userId = useRecoilValue(userIdAtom)
  const [mapPosition, setMapPosition] = useRecoilState(mapPositionAtom)
  const [markPosition, setMarkPosition] = useRecoilState(markPositionAtom)
  const [mapLevel, setMapLevel] = useRecoilState(mapLevelAtom)
  const isDeleteSearchMarker = useRecoilValue(isDeleteSearchMarkerAtom)
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
    const document = query(collection(firebaseDBService, userId))
    const snapShotHandler = () => {
      getDocsFromFirebase(userId).then((memoDocs) =>
        setMarkPosition((prevMarkPosition) => getMemoPositionFromFirebaseHandler(memoDocs, prevMarkPosition))
      )
    }
    const snapShotEvent = snapShotFirebaseData(document, snapShotHandler)

    return () => {
      snapShotEvent()
    }
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
      {markPosition.memoPlacePosition.map((memoPosition: any, iMarker: number) => {
        const memoMarkerKey = `memoMarker-${iMarker}`
        return <Marker key={memoMarkerKey} markPosition={memoPosition} isMapLoaded={isMapLoaded} />
      })}
      <Marker markImg={geolocationMarkImg} markPosition={markPosition.geolocation} isMapLoaded={isMapLoaded} />
      {!isDeleteSearchMarker && (
        <Marker markImg={searchMarkImg} markPosition={markPosition.searchPosition} isMapLoaded={isMapLoaded} />
      )}
      <Marker markImg={locationMarkImg} markPosition={markPosition.location} isMapLoaded={isMapLoaded} />
      <ZoomControl position={kakao.maps.ControlPosition.BOTTOMRIGHT} />
    </Map>
  )
}

export default KakaoMap

// location 이름 직관적으로 바꾸기 -> clickedLocation, clickedPosition
// setOpenAddNoteForm, openAddNoteForm context api 로 핸들
// memoPosition.image[0] ||
