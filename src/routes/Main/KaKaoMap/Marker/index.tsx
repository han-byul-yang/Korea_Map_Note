import { Dispatch, useState } from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'
import { useSetRecoilState } from 'recoil'

import InfoWindow from 'routes/Main/InfoWindow'
import { clickedMarkPositionAtom } from 'store/atom'
import { IPosition } from 'types/markPositionType'

interface IMarker {
  markImg: any
  markPosition: IPosition
  setOpenAddNoteForm: Dispatch<React.SetStateAction<boolean>>
}

const Marker = ({ markImg, markPosition, setOpenAddNoteForm }: IMarker) => {
  const [openInfoWindow, setOpenInfoWindow] = useState(false)
  const setClickedMarkPosition = useSetRecoilState(clickedMarkPositionAtom)

  const handleMapMarkerClick = () => {
    setOpenInfoWindow((prev) => !prev)
    setClickedMarkPosition({
      latitude: markPosition.latitude,
      longitude: markPosition.longitude,
    })
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
      {openInfoWindow && <InfoWindow setOpenInfoWindow={setOpenInfoWindow} setOpenAddNoteForm={setOpenAddNoteForm} />}
    </MapMarker>
  )
}

export default Marker

// img any 타입
// setOpenAddNoteForm 를 context api 로 변경
