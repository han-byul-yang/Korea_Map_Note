import { memo, useEffect, useState } from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { collection, query } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import { getImagesUrlFromFirebase, snapShotFirebaseData } from 'utils/firebaseService/firebaseDBService'
import { firebaseDBService, firebaseStorageService } from 'utils/firebaseService/firebaseSetting'
import { isOpenAddNoteFormAtom, markPositionAtom, memoAtom, pictureUpdateSnapShotAtom, userIdAtom } from 'store/atom'
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
  const setMemo = useSetRecoilState(memoAtom)
  const setMarkPosition = useSetRecoilState(markPositionAtom)
  const [imageCalled, setImageCalled] = useState([''])
  const userId = useRecoilValue(userIdAtom)
  const setIsOpenAddNoteForm = useSetRecoilState(isOpenAddNoteFormAtom)
  const pictureUpdateSnapShot = useRecoilValue(pictureUpdateSnapShotAtom)

  useEffect(() => {
    if (!markImg || pictureUpdateSnapShot) {
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
    // if (markPosition.siteName) {
    //   setMemo((prevMemo) => ({ ...prevMemo, siteName: markPosition.siteName }))
    // }
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
