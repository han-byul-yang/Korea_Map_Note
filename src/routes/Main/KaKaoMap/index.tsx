import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Map } from 'react-kakao-maps-sdk'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { getSearchPlacesApi } from 'services/getSearchPlacesApi'
import { clickedResultPlaceInfoAtom, isOpenAddNoteFormAtom, isOpenMessageModalAtom, messageAtom } from 'store/atom'
import { IGeolocationPosition, IGeolocationError } from 'types/geolocationType'
import { IMarkPosition, IPosition } from 'types/markPositionType'
import modalMessage from 'utils/modalMessage'
import Marker from './Marker'

import geolocationMarkImg from 'assets/img/geolocationMark.png'
import locationMarkImg from 'assets/img/locationMark.png'

const KakaoMap = () => {
  const [mapPosition, setMapPosition] = useState<IPosition>({ latitude: 36, longitude: 127 })
  const [markPosition, setMarkPosition] = useState<IMarkPosition>({
    geolocation: { latitude: 0, longitude: 0 },
    location: { latitude: 0, longitude: 0 },
  })
  const clickedResultPlaceInfo = useRecoilValue(clickedResultPlaceInfoAtom)
  const setMessage = useSetRecoilState(messageAtom)
  const [openAddNoteForm, setOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)

  const { isFetching, data } = useQuery(
    ['getSearchPlace', [clickedResultPlaceInfo.id, clickedResultPlaceInfo.latitude, clickedResultPlaceInfo.longitude]],
    () =>
      getSearchPlacesApi.searchPlaceById(
        clickedResultPlaceInfo.id,
        clickedResultPlaceInfo.latitude,
        clickedResultPlaceInfo.longitude
      ),
    {
      onSuccess: (res) => {
        setMapPosition({ latitude: clickedResultPlaceInfo.latitude, longitude: clickedResultPlaceInfo.longitude })
      },
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      onError: (e) => console.log(e),
    }
  )

  const retrieveSuccess = useCallback((position: IGeolocationPosition) => {
    setMarkPosition((prev) => {
      return { ...prev, geolocation: { latitude: position.coords.latitude!, longitude: position.coords.longitude! } }
    })
    setMapPosition({ latitude: position.coords.latitude!, longitude: position.coords.longitude! })
  }, [])

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
      level={3}
      onClick={handleMapPositionClick}
    >
      <Marker clickPosition='geolocation' markImg={geolocationMarkImg} markPosition={markPosition} />
      <Marker clickPosition='location' markImg={locationMarkImg} markPosition={markPosition} />
    </Map>
  )
}

export default KakaoMap
