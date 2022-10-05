import { atom } from 'recoil'

import { IMarkPosition, IPosition } from 'types/markPositionType'

export const userIdAtom = atom({
  key: 'userId',
  default: '',
})

export const clickedMarkPositionAtom = atom({
  key: 'clickedMarkPosition',
  default: { latitude: 0, longitude: 0 },
})

export const dropDownClickedPlaceAtom = atom({
  key: 'dropDownClickedPlace',
  default: {
    latitude: '',
    longitude: '',
  },
})

export const messageAtom = atom({
  key: 'message',
  default: { kind: '', message: '' },
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
  },
})

export const isOpenAddNoteFormAtom = atom({
  key: 'isOpenAddNoteFormAtom',
  default: false,
}) // context api 사용 or props로 넘겨주기

export const isOpenMessageModalAtom = atom({
  key: 'isOpenMessageModal',
  default: false,
}) // context api 사용 or props로 넘겨주기
