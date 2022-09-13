import { useState } from 'react'

const useMessages = () => {
  const [message, setMessage] = useState('')

  const messages = {
    error: {
      geolocation: {
        retrieveError: () => setMessage('장소를 불러올 수 없습니다.'),
        notSuppertedError: () => setMessage('해당 브라우저에서 api가 지원되지 않습니다.'),
      },
    },
    notification: {},
  }

  return { messages, message }
}

export default useMessages
