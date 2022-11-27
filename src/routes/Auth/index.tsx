import { FormEvent, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import useOpenMessageModal from 'hooks/useOpenMessageModal'
import { firebaseAuthService } from 'utils/firebaseService/firebaseSetting'
import { isOpenMessageModalAtom } from 'store/atom'
import modalMessage from 'constants/modalMessage'
import { errorMessages } from 'constants/errorMessages'
import ModalPortal from 'components/Modal/ModalPortal'
import MessageModal from 'components/Modal/MessageModal'

import worldMap from 'assets/img/worldMap.jpg'
import styles from './auth.module.scss'

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true)
  const [authData, setAuthData] = useState({ email: '', password: '' })
  const [errorText, setErrorText] = useState({ email: '', password: '' })
  const isOpenMessageModal = useRecoilValue(isOpenMessageModalAtom)
  const { openMessageModal } = useOpenMessageModal()

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

  // eslint-disable-next-line consistent-return
  const handleAuthSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorText({ email: '', password: '' })
    const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const passwordRegexp = /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/

    try {
      if (!emailRegexp.test(authData.email)) throw new Error('INVALID_EMAIL')
      if (!passwordRegexp.test(authData.password)) throw new Error('INVALID_PASSWORD')
      if (newAccount)
        await createUserWithEmailAndPassword(firebaseAuthService, authData.email, authData.password).catch((error) => {
          if (error instanceof FirebaseError) throw new Error(error.code)
        })
      else
        await signInWithEmailAndPassword(firebaseAuthService, authData.email, authData.password).catch((error) => {
          if (error instanceof FirebaseError) throw new Error(error.code)
        })
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case errorMessages.INVALID_EMAIL:
            setErrorText((prevText) => ({ ...prevText, email: modalMessage.error.auth.INVALID_EMAIL.message }))
            break
          case errorMessages.INVALID_PASSWORD:
            setErrorText((prevText) => ({
              ...prevText,
              password: modalMessage.error.auth.INVALID_PASSWORD.message,
            }))
            break
          case errorMessages['auth/email-already-in-use']:
            openMessageModal(modalMessage.error.auth['auth/email-already-in-use'])
            break
          case errorMessages['auth/user-disabled']:
            openMessageModal(modalMessage.error.auth['auth/user-disabled'])
            break
          case errorMessages['auth/user-not-found']:
            openMessageModal(modalMessage.error.auth['auth/user-not-found'])
            break
          case errorMessages['auth/wrong-password']:
            openMessageModal(modalMessage.error.auth['auth/wrong-password'])
            break
          default:
            openMessageModal(modalMessage.error.auth['auth/something-went-wrong'])
        }
      }
    }
  }

  const handleChangeAuthFormClick = () => {
    setNewAccount((prevState) => !prevState)
  }

  return (
    <>
      <main className={styles.authContainer}>
        <img alt='auth_page_image' src={worldMap} />
        <div className={styles.authBox}>
          <div className={styles.helloMessage}>
            {newAccount ? '환영합니다:)' : '다시 오셨군요!!'}
            <p>내가 방문한 여행지, 식당, 카페, 공원 등의 추억을 내 지도에 기록하세요</p>
          </div>
          <form onSubmit={handleAuthSumbit}>
            <input
              type='text'
              name='email'
              placeholder='이메일을 입력해주세요'
              value={authData.email}
              onChange={handleAuthChange}
            />
            <p>{errorText.email}</p>
            <input
              type='password'
              name='password'
              placeholder='비밀번호를 입력해주세요'
              value={authData.password}
              onChange={handleAuthChange}
            />
            <p>{errorText.password}</p>
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
      {isOpenMessageModal && (
        <ModalPortal>
          <MessageModal />
        </ModalPortal>
      )}
    </>
  )
}

export default Auth

// 사진 img 태그 안에 넣기
// b태그 적용안됨
