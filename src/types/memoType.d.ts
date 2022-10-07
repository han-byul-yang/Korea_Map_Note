export interface IMemo {
  siteName: string
  travelDate: string
  text: string
  picture: string | null
  hashTag: Array | null
}

export interface IMemoDocs {
  createAt: Date
  geolocation: {
    latitude: number
    longitude: number
  }
  memo: IMemo
  writer: string
}
