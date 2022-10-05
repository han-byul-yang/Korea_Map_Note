export interface ISearchPlacesResultInfo {
  address_name: string
  category_group_code: string | null
  category_group_name: string | null
  category_name: string | null
  distance: string | null
  id: string
  phone: string | null
  place_name: string
  place_url: string | null
  road_address_name: string | null
  x: string
  y: string
}

export interface ISearchAddressResultInfo {
  address: kakao.maps.services.Address
  road_address: kakao.maps.services.RoadAaddress | null
}

export interface ISearchPlaceNameResultInfo {
  address_name: string
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR'
  x: string
  y: string
  address: kakao.maps.services.Address
  road_address: kakao.maps.services.RoadAaddress
}
