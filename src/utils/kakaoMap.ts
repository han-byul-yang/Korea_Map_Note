declare global {
  interface Window {
    kakao: any
  }
}

interface IKakaoMap {
  latitude: any
  longitude: any
}

const { kakao } = window

export default function kakaoMap(latitude: IKakaoMap['latitude'], longitude: IKakaoMap['longitude']) {
  const container = document.getElementById('kakaoMap')
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 12,
  }

  const map = new kakao.maps.Map(container, options)
}
