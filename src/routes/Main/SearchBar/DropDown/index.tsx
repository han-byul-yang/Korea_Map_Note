import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'

import { getSearchPlaceApi } from 'services/getSearchPlacesApi'
import { dropDownClickedPlaceAtom } from 'store/atom'
import { IResultPlace } from 'types/searchPlacesType'

interface IDropDownProps {
  searchInput: string
}

const DropDown = ({ searchInput }: IDropDownProps) => {
  const [showDropDown, setShowDropDown] = useState(true)
  const setDropDownClickedPlace = useSetRecoilState(dropDownClickedPlaceAtom)
  const { isFetching, data } = useQuery(['getSearchPlaces', searchInput], () => getSearchPlaceApi(searchInput), {
    onSuccess: (res) => {
      console.log(res.data)
    },
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    onError: (e) => console.log(e),
  })

  if (isFetching) {
    return <div>loading...</div>
  }

  const handleResultPlaceClick = (resultPlace: IResultPlace) => {
    console.log(resultPlace)
    setDropDownClickedPlace({
      latitude: Number(resultPlace.mapx),
      longitude: Number(resultPlace.mapy),
    })
    setShowDropDown(false)
  }

  return (
    <ul>
      {showDropDown &&
        data?.data.items.map((resultPlace: IResultPlace, i: number) => {
          const placeKey = `place-${i}`
          return (
            <li key={placeKey}>
              <button type='button' onClick={() => handleResultPlaceClick(resultPlace)}>
                {resultPlace.title}
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
