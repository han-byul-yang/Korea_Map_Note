import { ISearchAddressResultInfo, ISearchPlaceNameResultInfo, ISearchPlacesResultInfo } from 'types/searchPlacesType'
import { IPosition } from 'types/markPositionType'

const searchProcess = (
  resolve: (value: unknown) => void,
  reject: (value: unknown) => void,
  data: ISearchPlacesResultInfo[] | ISearchAddressResultInfo[] | ISearchPlaceNameResultInfo[],
  status: kakao.maps.services.Status
) => {
  if (status === kakao.maps.services.Status.OK) {
    resolve(data)
  }
  if (status === kakao.maps.services.Status.ERROR) {
    reject(new Error())
  }
  if (status === kakao.maps.services.Status.ZERO_RESULT) {
    resolve(null)
  }
}

export const getPlacesByKeywordApi = (searchQuery: string, map: boolean) => {
  return new Promise((resolve, reject) => {
    if (!map) return

    const searchPlaces = new kakao.maps.services.Places()
    searchPlaces.keywordSearch(searchQuery, (data, status) => searchProcess(resolve, reject, data, status))
  })
}

export const getAddressByPositionApi = (position: IPosition, map: boolean) => {
  return new Promise((resolve, reject) => {
    if (!map) return

    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.coord2Address(position.longitude, position.latitude, (data, status) =>
      searchProcess(resolve, reject, data, status)
    )
  })
}

export const getPlaceNameByAddressApi = (address: string, map: boolean) => {
  return new Promise((resolve, reject) => {
    if (!map) return

    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.addressSearch(address, (data, status) => searchProcess(resolve, reject, data, status))
  })
}
