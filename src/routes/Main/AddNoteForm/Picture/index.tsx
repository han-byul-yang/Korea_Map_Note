import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { memoAtom } from 'store/atom'

import { ImageIcon } from 'assets/svgs'
import styles from './picture.module.scss'

const Picture = () => {
  const setMemo = useSetRecoilState(memoAtom)
  const [fileImage, setFileImage] = useState('')

  const handleImageChange = (e: any) => {
    console.log(e.target.files)
    const file = e.target.files[0]
    setFileImage(URL.createObjectURL(file))
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise(() => {
      reader.onload = () => {
        setMemo((prevMemo) => ({ ...prevMemo, picture: reader.result }))
      }
    })
  }

  return (
    <div className={styles.image}>
      <img className={styles.prevShowImage} alt='fileImage' src={fileImage} />
      <label className={styles.imageLabel} htmlFor='chooseFile'>
        <ImageIcon className={styles.imageBtn} />
        사진 추가 👈
      </label>
      <input type='file' multiple id='chooseFile' accept='image/*' onChange={handleImageChange} />
    </div>
  )
}

export default Picture

// any type 설정
