import { useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'

import { markPositionAtom } from 'store/atom'
import { ISearchAddressResultInfo, ISearchPlacesResultInfo } from 'types/searchPlacesType'

import styles from './placeInfoBox.module.scss'

interface IPlaceInfoBoxProps {
  isLoading: boolean
}

const PlaceInfoBox = ({ isLoading }: IPlaceInfoBoxProps) => {
  const markPosition = useRecoilValue(markPositionAtom)
  const queryClient = useQueryClient()

  const addressResultsData: ISearchAddressResultInfo[] | undefined = queryClient.getQueryData([
    'getAddressByPosition',
    markPosition.clickedPosition.latitude,
    markPosition.clickedPosition.longitude,
  ])
  const placesResultsData: ISearchPlacesResultInfo[] | undefined = queryClient.getQueryData(['getPlacesByKeyword'], {
    exact: false,
  })
  const placeResultData = useMemo(
    () => placesResultsData?.filter((place) => Number(place.x) === markPosition.clickedPosition.longitude),
    [markPosition.clickedPosition.longitude, placesResultsData]
  )

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div className={styles.placeInfoBox}>
      {placeResultData && placeResultData.length !== 0 ? (
        <>
          <p>{placeResultData[0].place_name}</p>
          <p>카테고리: {placeResultData[0]?.category_name}</p>
          <p>기본 주소: {placeResultData[0]?.address_name}</p>
          <p>도로명 주소: {placeResultData[0]?.road_address_name}</p>
        </>
      ) : (
        <>
          <p>기본 주소: {addressResultsData![0].address.address_name}</p>
          <p>도로명 주소: {addressResultsData![0].road_address?.address_name}</p>
        </>
      )}
    </div>
  )
}

export default PlaceInfoBox
