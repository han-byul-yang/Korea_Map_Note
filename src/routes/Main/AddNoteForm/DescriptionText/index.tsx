import { ChangeEvent } from 'react'
import { useRecoilState } from 'recoil'

import { memoAtom } from 'store/atom'

import styles from './descriptionText.module.scss'

const DescriptionText = () => {
  const [memo, setMemo] = useRecoilState(memoAtom) // type 설정

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo((prevMemo) => ({ ...prevMemo, text: e.currentTarget.value }))
  }

  return (
    <textarea className={styles.descriptionText} name='text' rows={100} value={memo.text} onChange={handleTextChange} />
  )
}

export default DescriptionText
