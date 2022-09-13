import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { onAuthStateChanged } from 'firebase/auth'

import { firebaseAuthService } from 'utils/firebaseSetting'
import { userIdAtom } from 'store/atom'
import Main from './Main'
import Auth from './Auth'

const App = () => {
  const [isLoggin, setIsLoggin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const setUserId = useSetRecoilState(userIdAtom)

  useEffect(() => {
    onAuthStateChanged(firebaseAuthService, (user) => {
      setIsLoading(true)
      if (user) {
        setIsLoggin(true)
        setUserId(user.uid)
      } else {
        setIsLoggin(false)
      }
      setIsLoading(false)
    })
  })

  return <Routes>{isLoggin ? <Route path='/' element={<Main />} /> : <Route path='/' element={<Auth />} />}</Routes>
}

export default App
