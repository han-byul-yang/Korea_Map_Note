import { UploadTask } from 'firebase/storage'
import { atom } from 'recoil'

import { IMarkPosition, IPosition } from 'types/markPositionType'
import { IMemo } from 'types/memoType'
import { IMessage } from 'types/messageType'
import { ISearchPlacesResultInfo } from 'types/searchPlacesType'

export const userIdAtom = atom({
  key: 'userId',
  default: '',
})

export const messageAtom = atom<IMessage>({
  key: 'message',
  default: { kind: '', message: '', warningMessageOkButtonHandle: () => {} },
})

export const mapPositionAtom = atom<IPosition>({
  key: 'mapPosition',
  default: { latitude: 0, longitude: 0 },
})

export const markPositionAtom = atom<IMarkPosition>({
  key: 'markPosition',
  default: {
    geolocation: { latitude: 0, longitude: 0 },
    location: { latitude: 0, longitude: 0 },
    searchPosition: { latitude: 0, longitude: 0 },
    memoPlacePosition: [{ latitude: 0, longitude: 0, createAt: '', siteName: '' }],
    clickedPosition: { latitude: 0, longitude: 0 },
  },
})

export const memoAtom = atom<IMemo>({
  key: 'memo',
  default: {
    createAt: 0,
    siteName: '',
    travelDate: { startDate: new Date(), endDate: null },
    text: '',
    hashTagList: [],
  },
})

export const imageListAtom = atom<File[]>({
  key: 'imageList',
  default: [],
})

export const isOpenAddNoteFormAtom = atom({
  key: 'isOpenAddNoteFormAtom',
  default: {
    type: 'add',
    isOpen: false,
  },
}) // context api 사용 or props로 넘겨주기

export const isOpenReadNotesAtom = atom({
  key: 'isOpenReadNotesAtom',
  default: false,
}) // context api 사용 or props로 넘겨주기

export const isOpenMessageModalAtom = atom({
  key: 'isOpenMessageModal',
  default: false,
}) // context api 사용 or props로 넘겨주기

export const mapLevelAtom = atom({
  key: 'mapLevel',
  default: 12,
})

export const isOkChangeMarkAtom = atom({
  key: 'isOkChangeMark',
  default: true,
})

export const isDeleteSearchMarkerAtom = atom({
  key: 'isDeleteSearchMarker',
  default: false,
})

export const isEditMemoPlaceNameAtom = atom({
  key: 'isEditMemoPlaceName',
  default: false,
})

export const pictureUpdateSnapShotAtom = atom<UploadTask | undefined>({
  key: 'pictureUpdateSnapShot',
  default: undefined,
})

export const tempAtom = atom<ISearchPlacesResultInfo[]>({
  key: 'temp',
  default: [],
}) // 삭제해주기
