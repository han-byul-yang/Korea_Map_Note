import { FormEvent, useState } from 'react'
import { useRecoilState } from 'recoil'

import { memoAtom } from 'store/atom'

const HashTag = () => {
  const [hashTag, setHashTag] = useState('')
  const [memo, setMemo] = useRecoilState(memoAtom)

  const handleHashTagChange = (e: FormEvent<HTMLInputElement>) => {
    setHashTag(e.currentTarget.value)
  }

  const handleHashTagSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!memo.hashTagList.includes(hashTag)) {
      setMemo((prevMemo) => ({ ...prevMemo, hashTag: [...prevMemo.hashTagList, hashTag] }))
    }
    setHashTag('')
  }

  const handleHashTagClick = (tag: string) => {
    setMemo((prevTags) => {
      return { ...prevTags, hashTagList: prevTags.hashTagList.filter((tags: string) => tags !== tag) }
    })
  }

  return (
    <form onSubmit={handleHashTagSubmit}>
      <p>해시태그</p>
      <ul>
        {memo.hashTagList.map((tag: string) => {
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
