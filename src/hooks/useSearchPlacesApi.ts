import { useEffect } from 'react'
import { ISearchResultInfo } from 'types/searchPlacesType'

const useSearchPlacesApi = (searchQuery: string, map: boolean) => {
  if (!map) return

  const searchPlaces = new kakao.maps.services.Places()
  const result = searchPlaces.keywordSearch(searchQuery, (data: ISearchResultInfo[], status, _pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      return data
    }
    if (status === kakao.maps.services.Status.ERROR) {
      throw Error('에러 발생 했습니다.')
    }
    // 모달 메시지
    throw Error('검색 결과가 없습니다.')
  })
  // eslint-disable-next-line consistent-return
  return result
}

export default useSearchPlacesApi
