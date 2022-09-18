import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { onAuthStateChanged } from 'firebase/auth'

import { firebaseAuthService } from 'utils/firebaseSetting'
import { userIdAtom } from 'store/atom'
import Main from './Main'
import Auth from './Auth'

import styles from './routes.module.scss'

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

  return (
    <div className={styles.page}>
      <Routes>{isLoggin ? <Route path='/' element={<Main />} /> : <Route path='/' element={<Auth />} />}</Routes>
    </div>
  )
}

export default App
