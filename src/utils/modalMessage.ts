const modalMessage = () => {
  const messages = {
    error: {
      auth: {
        NO_ACCOUNT: { kind: 'error', message: '일치하는 계정이 없습니다. 다시 확인해주세요.' },
      },
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
        No_SAME_IMAGE: { kind: 'error', message: '중복된 이미지를 사용할 수 없습니다.' },
      },
    },
    notification: {
      memo: {
        NO_PLACE_NAME: { kind: 'notification', message: '장소 이름 입력은 필수입니다.' },
        NOTE_UPDATED: { kind: 'notification', message: '메모가 성공적으로 저장되었습니다' },
      },
    },
    warning: {
      memo: {
        CLOSE_ADD_NOTE_FORM: { kind: 'warning', message: '작성을 그만 두시겠습니까?' },
        DELETE_MEMO: { kind: 'warning', message: '메모를 삭제하시겠습니까?' },
        ADD_NOTE_FORM: { kind: 'warning', message: '메모를 추가 하시겠습니까?' },
        UPDATE_NOTE_FORM: { kind: 'warning', message: '메모를 업데이트 하시겠습니까?' },
      },
    },
  }

  return messages
}

export default modalMessage
