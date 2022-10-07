export interface IPosition {
  latitude: number
  longitude: number
}

interface IMarkPositionKey {
  geolocation: IPosition
  location: IPosition
}

export interface IMarkPosition extends IMarkKeyPosition {
  [key: string]: IPosition | any
}

interface IOpenInfoWindowKey {
  geolocation: boolean
  location: boolean
}

export interface IOpenInfoWindow extends IOpenInfoWindowKey {
  [key: string]: boolean
}
