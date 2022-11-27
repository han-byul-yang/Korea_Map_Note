import { useQueryClient } from '@tanstack/react-query'

import { IMarkPosition } from 'types/markPositionType'
import { ISearchAddressResultInfo, ISearchPlacesResultInfo } from 'types/searchPlacesType'

const useGetKakaoQueryData = () => {
  const queryClient = useQueryClient()

  const getAddressResultData = (markPosition: IMarkPosition) => {
    const queryData: ISearchAddressResultInfo[] | undefined = queryClient.getQueryData([
      'getAddressByPosition',
      markPosition.clickedPosition.latitude,
      markPosition.clickedPosition.longitude,
    ])

    return queryData
  }

  const getPlaceResultData = (markPosition: IMarkPosition) => {
    const queryDatas: ISearchPlacesResultInfo[] | undefined = queryClient.getQueryData(['getPlacesByKeyword'], {
      exact: false,
    })
    const queryData = queryDatas?.filter(
      (place) =>
        Number(place.x) === markPosition.clickedPosition.longitude &&
        Number(place.y) === markPosition.clickedPosition.latitude
    )

    return queryData
  }

  const resultQueryData = {
    getAddressResultData,
    getPlaceResultData,
  }

  return resultQueryData
}

export default useGetKakaoQueryData
