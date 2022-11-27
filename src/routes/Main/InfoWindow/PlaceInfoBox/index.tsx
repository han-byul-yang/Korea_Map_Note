import { memo, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import useGetKakaoQueryData from 'hooks/query/useGetKaKaoQueryData'
import { markPositionAtom } from 'store/atom'
import { ISearchAddressResultInfo, ISearchPlacesResultInfo } from 'types/searchPlacesType'

import styles from './placeInfoBox.module.scss'

interface IPlaceInfoBoxProps {
  isLoading: boolean
}

const PlaceInfoBox = ({ isLoading }: IPlaceInfoBoxProps) => {
  const markPosition = useRecoilValue(markPositionAtom)
  const { getAddressResultData, getPlaceResultData } = useGetKakaoQueryData()

  const addressResultData: ISearchAddressResultInfo[] | undefined = useMemo(
    () => getAddressResultData(markPosition),
    [getAddressResultData, markPosition]
  )
  const placeResultData: ISearchPlacesResultInfo[] | undefined = useMemo(
    () => getPlaceResultData(markPosition),
    [getPlaceResultData, markPosition]
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
          <p>기본 주소: {addressResultData![0].address.address_name}</p>
          <p>도로명 주소: {addressResultData![0].road_address?.address_name}</p>
        </>
      )}
    </div>
  )
}

export default memo(PlaceInfoBox)
