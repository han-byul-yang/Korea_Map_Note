export interface IGeolocationError {
  code: number
  message: string
}

export interface IGeolocationPosition {
  coords: {
    accuracy: number | null
    altitude: number | null
    altitudeAccuracy: number | null
    heading: number | null
    latitude: number | null
    longitude: number | null
    speed: number | null
  }
  timestamp: number | null
}
