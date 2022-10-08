import { FormEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { memoAtom } from 'store/atom'

const HashTag = () => {
  const [hashTag, setHashTag] = useState('')
  const [hashTagList, setHashTagList] = useState([''])
  const setMemo = useSetRecoilState(memoAtom)

  const handleHashTagChange = (e: FormEvent<HTMLInputElement>) => {
    setHashTag(e.currentTarget.value)
  }

  const handleHashTagSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!hashTagList.includes(hashTag)) {
      setHashTagList((prevHashTags) => [...prevHashTags, hashTag])
      setMemo((prevMemo) => ({ ...prevMemo, hashTag: [...prevMemo.hashTag, hashTag] }))
    }
    setHashTag('')
  }

  const handleHashTagClick = (tag: string) => {
    setHashTagList((prevTags) => prevTags.filter((tags) => tags !== tag))
  }

  return (
    <form onSubmit={handleHashTagSubmit}>
      <p>해시태그</p>
      <ul>
        {hashTagList.map((tag) => {
          return (
            <li key={tag}>
              <button type='button' onClick={() => handleHashTagClick(tag)}>
                {tag}
              </button>
            </li>
          )
        })}
      </ul>
      <input type='text' value={hashTag} onChange={handleHashTagChange} />
      <button type='submit'>+</button>
    </form>
  )
}

export default HashTag
