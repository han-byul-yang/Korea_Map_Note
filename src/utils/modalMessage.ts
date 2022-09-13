const modalMessage = () => {
  const messages = {
    error: {
      geolocation: {
        PERMISSION_DENIED: { kind: 'error', message: '위치정보 수집이 거부되었습니다.' },
        POSITION_UNAVAILABLE: { kind: 'error', message: '장소를 불러올 수 없습니다.' },
        NOT_SUPPOERTED: { kind: 'error', message: '해당 브라우저에서 api가 지원되지 않습니다.' },
      },
    },
    notification: {},
  }

  return messages
}

export default modalMessage
