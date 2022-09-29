import { atom } from 'recoil'

export const userIdAtom = atom({
  key: 'userId',
  default: '',
})

export const clickedMarkPositionAtom = atom({
  key: 'clickedMarkPosition',
  default: { latitude: 0, longitude: 0 },
})

export const clickedResultPlaceInfoAtom = atom({
  key: 'clickedResultPlaceInfo',
  default: {
    id: '0x357ad8c1a4766239:0x121821fa1995715e',
    latitude: 36.8006907,
    longitude: 127.05965579999999,
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
