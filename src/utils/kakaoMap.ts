declare global {
  interface Window {
    kakao: any
  }
}

interface IKakaoMap {
  latitude: number | null
  longitude: number | null
}

const { kakao } = window

export default function kakaoMap(latitude: IKakaoMap['latitude'], longitude: IKakaoMap['longitude']) {
  const container = document.getElementById('kakaoMap')
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 12,
  }

  const map = new kakao.maps.Map(container, options)

  return map
}

export function kakaoMapMark(map: any) {
  const marker = new kakao.maps.Marker({
    position: map.getCenter(),
  })
  marker.setMap(map)

  kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
    const latlng = mouseEvent.latLng

    marker.setPosition(latlng)
  })
}

/* export function handleKakaoMapMarkClick(map: any) {
  kakao.maps.event.addListener(map, 'click', (mouseEvent: any)=> {
    const latlng = mouseEvent.latLng

    marker.setPosition(latlng)
  })
}
*/
