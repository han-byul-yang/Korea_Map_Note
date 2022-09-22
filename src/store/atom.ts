import { atom } from 'recoil'

export const userIdAtom = atom({
  key: 'userId',
  default: '',
})

export const clickedMarkPositionAtom = atom({
  key: 'clickedMarkPosition',
  default: { latitude: 0, longitude: 0 },
})
