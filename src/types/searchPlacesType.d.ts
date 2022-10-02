/* interface IGpsCoordinates {
  latitude: number
  longitude: number
}

interface IOperatingHours {
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
  monday: string
  tuesday: string
}

interface IServiceOptions {
  takeout: boolean
  delivery: boolean
}

export interface ILocalResult {
  position: number
  title: string
  place_id: string
  data_id: string
  data_cid: string
  reviews_link: string
  photos_link: string
  gps_coordinates: IGpsCoordinates
  place_id_search: string
  rating: number
  reviews: number
  price: string
  type: string
  address: string
  open_state: string
  hours: string
  operating_hours: IOperatingHours
  phone: string
  website: string
  description: string
  service_options: IServiceOptions
  thumbnail: string
}

export interface IPlacesListResult {
  local_results: ILocalResult[]
}

interface PlaceGpsCoordinates {
  latitude: number
  longitude: number
}

interface ServiceOptions {
  dine_in: boolean
  takeout: boolean
  delivery: boolean
}

interface Extension {
  highlights?: string[]
  popular_for?: string[]
}

interface Hour {
  friday?: string
  saturday?: string
  sunday?: string
}

interface Image {
  title: string
  thumbnail: string
}

interface UserReviews {
  summary: Summary[]
  most_relevant: MostRelevant[]
}

interface Summary {
  snippet: string
}

interface MostRelevant {
  username: string
  rating: number
  description: string
  date: string
}

interface PeopleAlsoSearchFor {
  search_term: string
  local_results: LocalResult[]
}

interface LocalResult {
  position: number
  title: string
  data_id: string
  data_cid: number
  gps_coordinates: LocalGpsCoordinates
  place_id_search: string
  rating: number
  reviews: number
  thumbnail: string
  type: string[]
}

interface LocalGpsCoordinates {
  latitude: number
  longitude: number
}

interface PlaceResults {
  title: string
  place_id: string
  data_id: string
  data_cid: string
  reviews_link: string
  photos_link: string
  gps_coordinates: PlaceGpsCoordinates
  place_id_search: string
  thumbnail: string
  rating: number
  reviews: number
  price: string
  type: string[]
  description: string
  service_options: ServiceOptions
  extensions: Extension[]
  address: string
  website: string
  phone: string
  open_state: string
  hours: Hour[]
  images: Image[]
  user_reviews: UserReviews
  people_also_search_for: PeopleAlsoSearchFor[]
}

export interface IPlaceResult {
  place_results: PlaceResults
}
*/

export interface IPlacesList {
  address: string
  category: string
  description: string
  link: string
  mapx: string
  mapy: string
  roadAddress: string
  telephone: string
  title: string
}

export interface IPlaceResult {
  display: number
  items: IPlacesList[]
  lastBuildDate: string
  start: number
  total: number
}
