import { memo, useEffect, useState } from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'
import { useSetRecoilState, useRecoilValue } from 'recoil'

import { getImagesUrlFromFirebase } from 'utils/firebaseService/firebaseDBService'
import { isOpenAddNoteFormAtom, markPositionAtom, pictureUpdateSnapShotAtom, userIdAtom } from 'store/atom'
import { IPosition } from 'types/markPositionType'
import InfoWindow from 'routes/Main/InfoWindow'

import memoMarkNoImg from 'assets/img/memoMark.png'

interface IMarker {
  markImg?: any
  markPosition: IPosition | any
  isMapLoaded: boolean
}

const Marker = ({ markImg, markPosition, isMapLoaded }: IMarker) => {
  const [openInfoWindow, setOpenInfoWindow] = useState(false)
  const setMarkPosition = useSetRecoilState(markPositionAtom)
  const [imageCalled, setImageCalled] = useState([''])
  const userId = useRecoilValue(userIdAtom)
  const setIsOpenAddNoteForm = useSetRecoilState(isOpenAddNoteFormAtom)
  const pictureUpdateSnapShot = useRecoilValue(pictureUpdateSnapShotAtom)

  useEffect(() => {
    if (!markImg) {
      getImagesUrlFromFirebase(userId, markPosition.createAt).then((url) => setImageCalled(url))

      pictureUpdateSnapShot?.on('state_changed', null, null, () => {
        getImagesUrlFromFirebase(userId, markPosition.createAt).then((url) => setImageCalled(url))
      })
    }
  }, [markImg, markPosition.createAt, pictureUpdateSnapShot, userId])

  const handleMapMarkerClick = () => {
    setOpenInfoWindow((prev) => !prev)
    setIsOpenAddNoteForm((prevState) => ({ ...prevState, type: 'add' }))
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
        src: markImg || imageCalled[0] || memoMarkNoImg,
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

export default memo(Marker)

// img any 타입
// setOpenAddNoteForm 를 context api 로 변경
// isMapLoaded context api 변경
