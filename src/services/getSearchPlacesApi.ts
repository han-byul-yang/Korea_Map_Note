import axios from 'axios'

const getSearchPlacesApiList = {
  searchListByQuery: (searchQuery: string) =>
    axios.get('/search.json', {
      params: {
        engine: 'google_maps',
        type: 'search',
        gl: 'kr',
        hl: 'ko',
        q: searchQuery,
        api_key: process.env.REACT_APP_GOOGLE_SEARCH_PLACES_KEY,
      },
    }),
  searchPlaceById: (dataId: string, latitude: number, longitude: number) =>
    axios.get('/search.json', {
      params: {
        engine: 'google_maps',
        type: 'place',
        gl: 'kr',
        hl: 'ko',
        data: `!4m5!3m4!1s${dataId}!8m2!3d${latitude}!4d${longitude}`,
        api_key: process.env.REACT_APP_GOOGLE_SEARCH_PLACES_KEY,
      },
    }),
}

export const getSearchPlacesApi = {
  searchListByQuery: async (searchQuery: string) => {
    const data = await getSearchPlacesApiList.searchListByQuery(searchQuery)
    console.log(searchQuery)
    return data
  },
  searchPlaceById: async (dataId: string, latitude: number, longitude: number) => {
    const data = await getSearchPlacesApiList.searchPlaceById(dataId, latitude, longitude)
    return data
  },
}
