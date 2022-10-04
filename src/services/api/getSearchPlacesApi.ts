import axios from 'axios'
import { useEffect } from 'react'

/* const getSearchPlacesApiList = {
  searchListByQuery: (searchQuery: string) =>
    axios.get('/search.json', {
      params: {
        engine: 'google_maps',
        type: 'search',
        gl: 'kr',
        hl: 'ko',
        q: searchQuery,
        api_key: process.env.REACT_APP_GOOGLE_SEARCH_PLACES_KEY,
      },
    }),
  searchPlaceById: (dataId: string, latitude: number, longitude: number) =>
    axios.get('/search.json', {
      params: {
        engine: 'google_maps',
        type: 'place',
        gl: 'kr',
        hl: 'ko',
        data: `!4m5!3m4!1s${dataId}!8m2!3d${latitude}!4d${longitude}`,
        api_key: process.env.REACT_APP_GOOGLE_SEARCH_PLACES_KEY,
      },
    }),
}

export const getSearchPlacesApi = {
  searchListByQuery: async (searchQuery: string) => {
    const data = await getSearchPlacesApiList.searchListByQuery(searchQuery)
    console.log(searchQuery)
    return data
  },
  searchPlaceById: async (dataId: string, latitude: number, longitude: number) => {
    const data = await getSearchPlacesApiList.searchPlaceById(dataId, latitude, longitude)
    return data
  },
}
*/

/* export const getSearchPlaceApi = (searchQuery: string) => {
  const data = axios.get('/v1/search/local.json', {
    params: {
      query: searchQuery,
      display: 10,
      sort: 'comment',
    },
    headers: {
      'X-Naver-Client-Id': process.env.REACT_APP_NAVER_SEARCH_PLACES_ID!,
      'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_SEARCH_PLACES_KEY!,
    },
  })
  return data
}
*/

/* export const getSearchPlaceApi = (searchQuery: string) => {
  const data = axios.get('/v2/acllo/search/keyword.json', {
    params: {
      query: searchQuery,
    },
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_SEARCH_PLACES_KEY}`,
    },
  })
  return data
}
*/
export const getSearchPlaceApi = (searchQuery: string, map: boolean) => {
  return new Promise((resolve, reject) => {
    if (!map) return
    const searchPlaces = new kakao.maps.services.Places()
    searchPlaces.keywordSearch(searchQuery, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // const bounds = new kakao.maps.LatLngBounds()
        resolve(data)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds)
      }
      if (status === kakao.maps.services.Status.ERROR) {
        reject(new Error('에러 발생 했습니다.'))
      }
      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        reject(new Error('검색 결과가 없습니다.'))
      }
    })
  })
}
