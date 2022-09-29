import { useState } from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'
import { useSetRecoilState } from 'recoil'

import InfoWindow from 'routes/Main/InfoWindow'
import { clickedMarkPositionAtom, isOpenAddNoteFormAtom } from 'store/atom'
import { IMarkPosition, IOpenInfoWindow } from 'types/markPositionType'

interface IMarker {
  clickPosition: string
  markImg: any
  markPosition: IMarkPosition
}

const Marker = ({ clickPosition, markImg, markPosition }: IMarker) => {
  const [openInfoWindow, setOpenInfoWindow] = useState<IOpenInfoWindow>({ geolocation: false, location: false })
  const setClickedMarkPosition = useSetRecoilState(clickedMarkPositionAtom)
  const setOpenAddNoteForm = useSetRecoilState(isOpenAddNoteFormAtom)

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
    setOpenAddNoteForm(false)
  }

  const clickOutsideTarget = (mark: string) => {
    setOpenInfoWindow((prev) => {
      return { ...prev, [mark]: false }
    })
  }

  return (
    <MapMarker
      position={{ lat: markPosition.location.latitude, lng: markPosition.location.longitude }}
      clickable
      onClick={() => handleMapMarkerClick(clickPosition)}
      image={{
        src: markImg,
        size: {
          width: 64,
          height: 69,
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
        <InfoWindow clickOutsideTarget={() => clickOutsideTarget('location')} setOpenAddNoteForm={setOpenAddNoteForm} />
      )}
    </MapMarker>
  )
}

export default Marker

// img any 타입
// setOpenAddNoteForm 를 context api 로 변경
