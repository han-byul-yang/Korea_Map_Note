import { Fragment, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { memoAtom } from 'store/atom'

import { ImageIcon } from 'assets/svgs'
import styles from './picture.module.scss'

const Picture = () => {
  const setMemo = useSetRecoilState(memoAtom)
  const [fileImageList, setFileImageList] = useState<any>([])

  const handleImageChange = (e: any) => {
    setFileImageList((prevFile: any) =>
      [...e.target.files, ...prevFile].length > 4 ? [...prevFile] : [...e.target.files, ...prevFile]
    )
    const { files } = e.target
    const reader = new FileReader()
    reader.readAsDataURL(files)

    // eslint-disable-next-line consistent-return
    return new Promise(() => {
      reader.onload = () => {
        setMemo((prevMemo) => ({ ...prevMemo, picture: reader.result }))
      }
    })
  }

  const handleDeletePictureClick = (fileImage: any) => {
    setFileImageList((prevFile: any) => prevFile.filter((file: any) => file.name !== fileImage.name))
  }

  return (
    <div className={styles.image}>
      {fileImageList.map((fileImage: any, index: any) => {
        const fileImageKey = `fileImage-${index}`
        return (
          <Fragment key={fileImageKey}>
            <img className={styles.prevShowImage} alt='fileImage' src={URL.createObjectURL(fileImage)} />
            <p>{fileImage.name}</p>
            <button type='button' onClick={() => handleDeletePictureClick(fileImage)}>
              지우기
            </button>
          </Fragment>
        )
      })}
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
