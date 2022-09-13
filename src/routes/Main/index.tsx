import { useEffect } from 'react'

import kakaoMap from 'utils/kakaoMap'

import styles from './main.module.scss'

const Main = () => {
  useEffect(() => {
    kakaoMap()
  }, [])

  return <div id='kakaoMap' className={styles.mainMap} />
}

export default Main

// id를 ref로 바꿀 수 있음
