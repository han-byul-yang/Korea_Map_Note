import { ISearchAddressResultInfo } from 'types/searchPlacesType'

import { LocationIcon } from 'assets/svgs'
import styles from './address.module.scss'

interface IAddressProps {
  addressResult: ISearchAddressResultInfo[] | undefined
}

const Address = ({ addressResult }: IAddressProps) => {
  return (
    <div className={styles.address}>
      <LocationIcon className={styles.loactionIcon} />
      <span className={styles.addressTitle}>주소</span>
      <div className={styles.locationAddress}>
        <p>기본 주소: {addressResult && addressResult[0]?.address?.address_name}</p>
        <p>도로명 주소: {addressResult && addressResult[0]?.road_address?.address_name}</p>
      </div>
    </div>
  )
}

export default Address
