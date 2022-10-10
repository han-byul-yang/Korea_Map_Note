import { Dispatch, Fragment, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { isOpenMessageModalAtom, memoAtom, messageAtom } from 'store/atom'
import modalMessage from 'utils/modalMessage'

import { ImageIcon } from 'assets/svgs'
import styles from './picture.module.scss'

interface IPictureProps {
  setFileImageList: Dispatch<React.SetStateAction<File[]>>
  fileImageList: File[]
}

const Picture = ({ setFileImageList, fileImageList }: IPictureProps) => {
  const setMemo = useSetRecoilState(memoAtom)
  const setMessage = useSetRecoilState(messageAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)

  const handleImageChange = (e: any) => {
    const { files } = e.target

    if ([...files, ...fileImageList].length > 4) {
      setOpenMessageModal(true)
      setMessage(modalMessage().error.memo.LIMIT_IMAGE_NUMBER)
    } else {
      setFileImageList((prevFile) => [...files, ...prevFile])
    }
  }

  useEffect(() => {
    const settingFileList = () => {
      fileImageList.forEach((fileImage: File) => {
        const reader = new FileReader()
        reader.readAsDataURL(fileImage)

        reader.onload = () => {
          setMemo((prevMemo) => ({ ...prevMemo, picture: [reader.result, ...prevMemo.picture] }))
        }
      })
    }
    settingFileList()
  }, [fileImageList, setMemo])

  const handleDeletePictureClick = (fileImage: File) => {
    setFileImageList((prevFile) => prevFile.filter((file) => file.name !== fileImage.name))
  }

  return (
    <div className={styles.image}>
      {fileImageList.map((fileImage, index) => {
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
