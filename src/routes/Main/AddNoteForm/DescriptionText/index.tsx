import { FormEvent } from 'react'
import { useRecoilState } from 'recoil'

import { memoAtom } from 'store/atom'

const DescriptionText = () => {
  const [memo, setMemo] = useRecoilState(memoAtom) // type 설정

  const handleTextChange = (e: FormEvent<HTMLInputElement>) => {
    setMemo((prevMemo) => ({ ...prevMemo, text: e.currentTarget.value }))
  }

  return <input type='text' name='text' value={memo.text} onChange={handleTextChange} />
}

export default DescriptionText
