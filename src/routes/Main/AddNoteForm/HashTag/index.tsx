import { FormEvent, useState } from 'react'
import { useRecoilState } from 'recoil'

import { memoAtom } from 'store/atom'
import { colorPalettes } from 'constants/colorPalettes'

import styles from './hashTag.module.scss'

const HashTag = () => {
  const [selecedColor, setSelectedColor] = useState('f95959')
  const [hashTag, setHashTag] = useState('')
  const [memo, setMemo] = useRecoilState(memoAtom)

  const handleColorChange = (e: FormEvent<HTMLInputElement>) => {
    setSelectedColor(e.currentTarget.value)
  }

  const handleHashTagChange = (e: FormEvent<HTMLInputElement>) => {
    setHashTag(e.currentTarget.value)
  }

  const handleHashTagSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!memo.hashTagList.includes(hashTag)) {
      setMemo((prevMemo) => ({ ...prevMemo, hashTagList: [...prevMemo.hashTagList, hashTag] }))
    }
    setHashTag('')
  }

  const handleHashTagClick = (tag: string) => {
    setMemo((prevTags) => {
      return { ...prevTags, hashTagList: prevTags.hashTagList.filter((tags: string) => tags !== tag) }
    })
  }

  return (
    <form className={styles.hashTag} onSubmit={handleHashTagSubmit}>
      <p>해시태그</p>
      {colorPalettes.map((color) => (
        <>
          <input
            key={color}
            type='radio'
            name='palette'
            value={color}
            onChange={handleColorChange}
            style={{ backgroundColor: `${color}` }}
          />
          <label htmlFor={color} />
        </>
      ))}
      <ul>
        {memo.hashTagList.map((tag: string) => {
          return (
            <li key={tag}>
              <button
                type='button'
                onClick={() => handleHashTagClick(tag)}
                style={{ backgroundColor: `${selecedColor}` }}
              >
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
