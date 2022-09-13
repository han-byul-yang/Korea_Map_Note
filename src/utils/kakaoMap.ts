declare global {
  interface Window {
    kakao: any
  }
}

const { kakao } = window

export default function kakaoMap() {
  const container = document.getElementById('kakaoMap')
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 10,
  }

  const map = new kakao.maps.Map(container, options)
}
