import { ISearchAddressResultInfo } from 'types/searchPlacesType'

interface IAddressProps {
  addressResult: ISearchAddressResultInfo[] | undefined
}

const Address = ({ addressResult }: IAddressProps) => {
  return (
    <p>
      기본 주소: {addressResult && addressResult[0]?.address?.address_name}
      <br />
      도로명 주소: {addressResult && addressResult[0]?.road_address?.address_name}
    </p>
  )
}

export default Address
