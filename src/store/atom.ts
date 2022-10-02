import { atom } from 'recoil'

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
    latitude: 0,
    longitude: 0,
  },
})

export const messageAtom = atom({
  key: 'message',
  default: { kind: '', message: '' },
})

export const isOpenAddNoteFormAtom = atom({
  key: 'isOpenAddNoteForm',
  default: false,
}) // constext api 사용 or props 로 넘겨주기

export const isOpenMessageModalAtom = atom({
  key: 'isOpenMessageModal',
  default: false,
}) // context api 사용 or props로 넘겨주기
