export interface IMemo {
  siteName: string
  travelDate: { startDate: Date | null | firestore.Timestamp; endDate: Date | null | firestore.Timestamp }
  text: string
  hashTagList: Array | null
}

export interface IStoredMemoInfo {
  createAt: number
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
