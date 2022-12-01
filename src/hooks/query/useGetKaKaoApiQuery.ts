import { useQuery } from '@tanstack/react-query'

import useOpenMessageModal from '../useOpenMessageModal'
import { getAddressByPositionApi, getPlacesByKeywordApi } from 'services/api/searchKakaoApi'
import { IMarkPosition } from 'types/markPositionType'
import { ISearchPlacesResultInfo } from 'types/searchPlacesType'
import modalMessage from 'constants/modalMessage'

export const useGetAddressByPositionApiQuery = (markPosition: IMarkPosition, isMapLoaded: boolean) => {
  const { openMessageModal } = useOpenMessageModal()

  const query = useQuery(
    ['getAddressByPosition', markPosition.clickedPosition.latitude, markPosition.clickedPosition.longitude],
    () => getAddressByPositionApi(markPosition.clickedPosition, isMapLoaded),
    {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      enabled: !!markPosition.clickedPosition.latitude || !!markPosition.clickedPosition.longitude,
      onError: () => {
        openMessageModal(modalMessage.error.api.SOMETHING_WRONG)
      },
    }
  )

  return query
}

export const useGetPlacesByKeywordApiQuery = (debouncedSearchInput: string, isMapLoaded: boolean) => {
  const { openMessageModal } = useOpenMessageModal()

  const query = useQuery(
    ['getPlacesByKeyword', debouncedSearchInput],
    () => getPlacesByKeywordApi(debouncedSearchInput, isMapLoaded),
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSuccess: (res: ISearchPlacesResultInfo[]) => {},
      staleTime: 1000,
      cacheTime: 1000,
      enabled: !!debouncedSearchInput,
      keepPreviousData: true,
      onError: () => {
        openMessageModal(modalMessage.error.api.SOMETHING_WRONG)
      },
    }
  )

  return query
}
