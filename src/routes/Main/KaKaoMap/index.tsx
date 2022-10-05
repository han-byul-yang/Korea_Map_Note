import { Dispatch, useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Map } from 'react-kakao-maps-sdk'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { getSearchPlacesApi } from 'services/api/getSearchPlacesApi'
import { dropDownClickedPlaceAtom, isOpenAddNoteFormAtom, isOpenMessageModalAtom, messageAtom } from 'store/atom'
import { IGeolocationPosition, IGeolocationError } from 'types/geolocationType'
import { IMarkPosition, IPosition } from 'types/markPositionType'
import modalMessage from 'utils/modalMessage'
import Marker from './Marker'

import geolocationMarkImg from 'assets/img/geolocationMark.png'
import locationMarkImg from 'assets/img/locationMark.png'
import searchMarkImg from 'assets/img/searchMark.png'

interface IKakaoMapProps {
  setMap: Dispatch<React.SetStateAction<boolean>>
}

const KakaoMap = ({ setMap }: IKakaoMapProps) => {
  const [mapPosition, setMapPosition] = useState<IPosition>({ latitude: 0, longitude: 0 })
  const [markPosition, setMarkPosition] = useState<IMarkPosition>({
    geolocation: { latitude: 0, longitude: 0 },
    location: { latitude: 0, longitude: 0 },
    searchPosition: { latitude: 0, longitude: 0 },
  })
  const [mapLevel, setMapLevel] = useState(0)
  const dropDownClickedPlace = useRecoilValue(dropDownClickedPlaceAtom)
  const setMessage = useSetRecoilState(messageAtom)
  const [openAddNoteForm, setOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)

  /* const { isFetching, data } = useQuery(
    ['getSearchPlace', [dropDownClickedPlace.id, dropDownClickedPlace.latitude, dropDownClickedPlace.longitude]],
    () =>
      getSearchPlacesApi.searchPlaceById(
        dropDownClickedPlace.id,
        dropDownClickedPlace.latitude,
        dropDownClickedPlace.longitude
      ),
    {
      onSuccess: (res) => {
        console.log(res.data)
        setMapPosition({
          latitude: dropDownClickedPlace.latitude, // res.data?.gps_coordinates?.latitude가 안 되는 이유
          longitude: dropDownClickedPlace.longitude, // res.data?.gps_coordinates?.longitude 안 되는 이유
        })
        setMarkPosition((prev) => {
          return {
            ...prev,
            searchPosition: {
              latitude: dropDownClickedPlace.latitude,
              longitude: dropDownClickedPlace.longitude,
            },
          }
        })
        setMapLevel(4)
      },
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      onError: (e) => console.log(e),
    }
  ) */

  const retrieveSuccess = useCallback((position: IGeolocationPosition) => {
    setMapPosition({ latitude: position.coords.latitude!, longitude: position.coords.longitude! })
    setMarkPosition((prev) => {
      return { ...prev, geolocation: { latitude: position.coords.latitude!, longitude: position.coords.longitude! } }
    })
    setMapLevel(12)
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
      level={mapLevel}
      onClick={handleMapPositionClick}
      onCreate={() => setMap(true)}
    >
      <Marker markImg={geolocationMarkImg} markPosition={markPosition.geolocation} />
      <Marker markImg={locationMarkImg} markPosition={markPosition.location} />
      <Marker markImg={searchMarkImg} markPosition={markPosition.searchPosition} />
    </Map>
  )
}

export default KakaoMap

// location 이름 직관적으로 바꾸기 -> clickedLocation, clickedPosition
