const modalMessage = () => {
  const messages = {
    error: {
      geolocation: {
        PERMISSION_DENIED: { kind: 'error', message: '위치정보 수집이 거부되었습니다.' },
        POSITION_UNAVAILABLE: { kind: 'error', message: '장소를 불러올 수 없습니다.' },
        NOT_SUPPOERTED: { kind: 'error', message: '해당 브라우저에서 api가 지원되지 않습니다.' },
      },
      api: {
        NO_NETWORK: { kind: 'error', message: '네트워크 연결을 확인해주세요' },
        SOMETHING_WRONG: { kind: 'error', message: '데이터를 불러오는 중 오류 발생했습니다.' },
      },
      memo: {
        LIMIT_IMAGE_NUMBER: { kind: 'error', message: '이미지 개수가 4개를 초과할 수 없습니다.' },
      },
    },
    notification: {},
    warning: {
      memo: {
        CLOSE_ADD_NOTE_FORM: { kind: 'warning', message: '작성을 그만 두시겠습니까?' },
      },
    },
  }

  return messages
}

export default modalMessage
