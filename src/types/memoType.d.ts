export interface IMemo {
  siteName: string
  travelDate: string
  text: string
  picture: (string | undefined | null | ArrayBuffer)[]
  hashTagList: Array | null
}

export interface IStoredMemoInfo {
  createAt: Date
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
