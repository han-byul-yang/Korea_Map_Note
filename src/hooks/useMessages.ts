import { useState } from 'react'

import { IMessage } from 'types/messageType'

const useMessages = () => {
  const [message, setMessage] = useState<IMessage>({ kind: '', message: '' })

  const messages = {
    error: {
      geolocation: {
        retrieveError: () => setMessage({ kind: 'error', message: '장소를 불러올 수 없습니다.' }),
        notSuppertedError: () => setMessage({ kind: 'error', message: '해당 브라우저에서 api가 지원되지 않습니다.' }),
      },
    },
    notification: {},
  }

  return { messages, message }
}

export default useMessages
