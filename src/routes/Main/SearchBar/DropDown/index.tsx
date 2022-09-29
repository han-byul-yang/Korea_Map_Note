import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'

import { getSearchPlacesApi } from 'services/getSearchPlacesApi'
import { dropDownClickedPlaceAtom } from 'store/atom'
import { ILocalResult } from 'types/searchPlacesType'

interface IDropDownProps {
  searchInput: string
}

const DropDown = ({ searchInput }: IDropDownProps) => {
  const setDropDownClickedPlace = useSetRecoilState(dropDownClickedPlaceAtom)
  const { isFetching, data } = useQuery(
    ['getSearchPlaces', searchInput],
    () => getSearchPlacesApi.searchListByQuery(searchInput),
    {
      onSuccess: (res) => {
        console.log(res.data)
      },
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      onError: (e) => console.log(e),
    }
  )

  if (isFetching) {
    return <div>loading...</div>
  }

  const handleResultPlaceClick = (resultPlaces: ILocalResult) => {
    setDropDownClickedPlace({
      id: resultPlaces.data_id,
      latitude: resultPlaces.gps_coordinates.latitude,
      longitude: resultPlaces.gps_coordinates.longitude,
    })
  }

  return (
    <ul>
      {data?.data.local_results?.map((resultPlaces: ILocalResult) => {
        return (
          <li key={resultPlaces.data_id}>
            <button type='button' onClick={() => handleResultPlaceClick(resultPlaces)}>
              {resultPlaces.title}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default React.memo(DropDown)

// suspense 이용, tanstack-query의 isFetching 이용 차이
// suspense 는 한 번에 데이터 fetching, 하지만 여기는 부모 자식 관계가 없어(data fetching 행위가 한 번만 이루어짐) 여기서는 필요하지 않을 듯
// 또 컴포넌트를 data 받아오는 행위에 상관없이 render 시작(suspense)
