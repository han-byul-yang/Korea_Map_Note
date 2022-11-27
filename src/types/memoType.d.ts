export interface IMemo {
  createAt: number
  siteName: string
  travelDate: { startDate: Date | null | firestore.Timestamp; endDate: Date | null | firestore.Timestamp }
  text: string
  hashTagList: { color: string; list: Array | null }
}

export interface IStoredMemoInfo {
  geolocation: {
    latitude: number
    longitude: number
  }
  memo: IMemo
  writer: string
}

export interface IMemoDoc {
  memoInfo: IStoredMemoInfo
  docId: string
}
