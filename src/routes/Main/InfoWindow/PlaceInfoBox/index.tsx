import { ISearchAddressResultInfo } from 'types/searchPlacesType'

import styles from './placeInfoBox.module.scss'

interface IPlaceInfoBoxProps {
  addressResultData: ISearchAddressResultInfo[] | undefined
  isLoading: boolean
}

const PlaceInfoBox = ({ addressResultData, isLoading }: IPlaceInfoBoxProps) => {
  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div className={styles.placeInfoBox}>
      <p>기본 주소: {addressResultData![0].address.address_name}</p>
      <p>도로명 주소: {addressResultData![0].road_address && addressResultData![0].road_address.address_name}</p>
    </div>
  )
}

export default PlaceInfoBox
