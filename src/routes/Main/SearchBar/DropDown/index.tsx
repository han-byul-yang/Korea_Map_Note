import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'

import modalMessage from 'utils/modalMessage'
import { getSearchPlacesApi } from 'services/api/getSearchPlacesApi'
import { dropDownClickedPlaceAtom, isOpenMessageModalAtom, messageAtom } from 'store/atom'
import { ISearchResultInfo } from 'types/searchPlacesType'

interface IDropDownProps {
  searchInput: string
  map: boolean
}

const DropDown = ({ searchInput, map }: IDropDownProps) => {
  const [showDropDown, setShowDropDown] = useState(true)
  const [resultTempData, setResultTempData] = useState<ISearchResultInfo[]>([])
  const setDropDownClickedPlace = useSetRecoilState(dropDownClickedPlaceAtom)
  const setMessage = useSetRecoilState(messageAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)

  const { isLoading, data } = useQuery(['getSearchPlaces', searchInput], () => getSearchPlacesApi(searchInput, map), {
    onSuccess: (res: ISearchResultInfo[]) => {
      console.log(res)
      setResultTempData(res)
    },
    cacheTime: 1000 * 60 * 60,
    enabled: !!searchInput, // dropdown이 mount 될 때 query도 생성되니까 없어도 됨
    keepPreviousData: true,
    onError: () => {
      setOpenMessageModal(true)
      setMessage(modalMessage().error.api.SOMETHING_WRONG)
    },
  })

  if (isLoading) {
    return <div>loading...</div>
  }

  const handleResultPlaceClick = (resultPlace: ISearchResultInfo) => {
    setDropDownClickedPlace({
      latitude: resultPlace.x,
      longitude: resultPlace.y,
    })
    setShowDropDown(false)
  }

  return (
    <ul>
      {showDropDown &&
        resultTempData?.map((resultPlace, i) => {
          const placeKey = `place-${i}`
          return (
            <li key={placeKey}>
              <button type='button' onClick={() => handleResultPlaceClick(resultPlace)}>
                {resultPlace?.place_name}
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
