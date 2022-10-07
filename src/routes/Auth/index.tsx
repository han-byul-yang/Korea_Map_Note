import { FormEvent, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { firebaseAuthService } from 'utils/firebaseService/firebaseSetting'

import worldMap from 'assets/img/worldMap.jpg'
import styles from './auth.module.scss'

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true)
  const [authData, setAuthData] = useState({ email: '', password: '' })

  const handleAuthChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    if (name === 'email')
      setAuthData((prevData) => {
        return { ...prevData, email: value }
      })
    if (name === 'password')
      setAuthData((prevData) => {
        return { ...prevData, password: value }
      })
  }

  const handleAuthSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (newAccount) await createUserWithEmailAndPassword(firebaseAuthService, authData.email, authData.password)
      else await signInWithEmailAndPassword(firebaseAuthService, authData.email, authData.password)
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    }
  }

  const handleChangeAuthFormClick = () => {
    setNewAccount((prevState) => !prevState)
  }

  return (
    <main className={styles.authContainer}>
      <img alt='auth_page_image' src={worldMap} />
      <div className={styles.authBox}>
        <div className={styles.helloMessage}>
          {newAccount ? '환영합니다:)' : '다시 오셨군요!!'}
          <p>내가 방문한 여행지, 식당, 카페, 공원 등의 추억을 내 지도에 기록하세요</p>
        </div>
        <form onSubmit={handleAuthSumbit}>
          <input
            type='email'
            name='email'
            placeholder='이메일을 입력해주세요'
            value={authData.email}
            onChange={handleAuthChange}
          />
          <input
            type='password'
            name='password'
            placeholder='비밀번호를 입력해주세요'
            value={authData.password}
            onChange={handleAuthChange}
          />
          <input type='submit' value={newAccount ? '회원가입' : '로그인'} />
        </form>
        <div className={styles.changeForm}>
          {newAccount ? '이미 계정이 있으신가요?' : '처음 오셨나요?'}
          <button type='button' onClick={handleChangeAuthFormClick}>
            {newAccount ? '로그인 하기' : '회원가입하기'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default Auth

// 사진 img 태그 안에 넣기
// b태그 적용안됨
