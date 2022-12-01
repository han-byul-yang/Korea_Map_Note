import { FormEvent, useState } from 'react'
import { useRecoilState } from 'recoil'

import { memoAtom } from 'store/atom'
import { colorPalettes } from 'constants/colorPalettes'

import styles from './hashTag.module.scss'

const HashTag = () => {
  const [hashTag, setHashTag] = useState('')
  const [memo, setMemo] = useRecoilState(memoAtom)

  const handleColorChange = (e: FormEvent<HTMLInputElement>) => {
    setMemo((prevMemo) => ({
      ...prevMemo,
      hashTagList: { ...prevMemo.hashTagList, color: e.currentTarget.value },
    }))
  }

  const handleHashTagChange = (e: FormEvent<HTMLInputElement>) => {
    setHashTag(e.currentTarget.value)
  }

  const handleHashTagSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!memo.hashTagList.list.includes(hashTag)) {
      setMemo((prevMemo) => ({
        ...prevMemo,
        hashTagList: { ...prevMemo.hashTagList, list: [...prevMemo.hashTagList.list, hashTag] },
      }))
    }
    setHashTag('')
  }

  const handleHashTagClick = (tag: string) => {
    setMemo((prevTags) => {
      return {
        ...prevTags,
        hashTagList: {
          ...prevTags.hashTagList,
          list: prevTags.hashTagList.list.filter((tags: string) => tags !== tag),
        },
      }
    })
  }

  return (
    <form className={styles.hashTag} onSubmit={handleHashTagSubmit}>
      <p>해시태그</p>
      <ul className={styles.palette}>
        {colorPalettes.map((color) => (
          <li key={color}>
            <input
              type='radio'
              name='palette'
              value={color}
              defaultChecked={color === '#f95959'}
              onChange={handleColorChange}
              style={{ backgroundColor: `${color}` }}
            />
            <label htmlFor={color} />
          </li>
        ))}
      </ul>
      <div className={styles.hashTagInput}>
        <p>#</p>
        <ul className={styles.hashTagList}>
          {memo.hashTagList.list.map((tag: string) => {
            return (
              <li key={tag}>
                <button
                  type='button'
                  onClick={() => handleHashTagClick(tag)}
                  style={{ backgroundColor: `${memo.hashTagList.color}` }}
                >
                  #{tag}
                </button>
              </li>
            )
          })}
        </ul>
        <input type='text' value={hashTag} onChange={handleHashTagChange} />
      </div>
    </form>
  )
}

export default HashTag
