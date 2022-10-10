import { useState } from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import InfoWindow from 'routes/Main/InfoWindow'
import { markPositionAtom, isOpenAddNoteFormAtom, isOpenMessageModalAtom, messageAtom } from 'store/atom'
import { IPosition } from 'types/markPositionType'
import modalMessage from 'utils/modalMessage'

interface IMarker {
  markImg: any
  markPosition: IPosition | any
  isMapLoaded: boolean
}

const Marker = ({ markImg, markPosition, isMapLoaded }: IMarker) => {
  const [openInfoWindow, setOpenInfoWindow] = useState(false)
  const setMarkPosition = useSetRecoilState(markPositionAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)
  const setMessage = useSetRecoilState(messageAtom)
  const openAddNoteForm = useRecoilValue(isOpenAddNoteFormAtom)

  const handleMapMarkerClick = () => {
    setOpenInfoWindow((prev) => !prev)
    if (openAddNoteForm) {
      setOpenMessageModal(true)
      setMessage(modalMessage().warning.memo.CLOSE_ADD_NOTE_FORM)
    }
    setMarkPosition((prevPosition) => ({
      ...prevPosition,
      clickedPosition: { latitude: markPosition.latitude, longitude: markPosition.longitude },
    }))
  }

  return (
    <MapMarker
      position={{ lat: markPosition?.latitude, lng: markPosition?.longitude }}
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
      {openInfoWindow && <InfoWindow setOpenInfoWindow={setOpenInfoWindow} isMapLoaded={isMapLoaded} />}
    </MapMarker>
  )
}

export default Marker

// img any 타입
// setOpenAddNoteForm 를 context api 로 변경
// isMapLoaded context api 변경
