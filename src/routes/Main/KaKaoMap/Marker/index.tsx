import { useState } from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'
import { useSetRecoilState } from 'recoil'

import InfoWindow from 'routes/Main/InfoWindow'
import { clickedMarkPositionAtom, isOpenAddNoteFormAtom, memoAtom } from 'store/atom'
import { IPosition } from 'types/markPositionType'

interface IMarker {
  markImg: any
  markPosition: IPosition | any
  isMapLoaded: boolean
}

const Marker = ({ markImg, markPosition, isMapLoaded }: IMarker) => {
  const [openInfoWindow, setOpenInfoWindow] = useState(false)
  const setClickedMarkPosition = useSetRecoilState(clickedMarkPositionAtom)
  const setOpenAddNoteForm = useSetRecoilState(isOpenAddNoteFormAtom)
  const setMemo = useSetRecoilState(memoAtom) // type 설정

  const handleMapMarkerClick = () => {
    setOpenInfoWindow((prev) => !prev)
    setClickedMarkPosition({
      latitude: markPosition.latitude,
      longitude: markPosition.longitude,
    })
    setMemo({ siteName: '', travelDate: '', text: '', picture: '', hashTag: [''] })
    setOpenAddNoteForm(false)
  }

  return (
    <MapMarker
      position={{ lat: markPosition.latitude, lng: markPosition.longitude }}
      clickable
      onClick={handleMapMarkerClick}
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
      {openInfoWindow && (
        <InfoWindow
          setOpenInfoWindow={setOpenInfoWindow}
          setOpenAddNoteForm={setOpenAddNoteForm}
          isMapLoaded={isMapLoaded}
        />
      )}
    </MapMarker>
  )
}

export default Marker

// img any 타입
// setOpenAddNoteForm 를 context api 로 변경
// isMapLoaded context api 변경
