import { Fragment } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { imageListAtom, isOpenMessageModalAtom, messageAtom } from 'store/atom'
import modalMessage from 'utils/modalMessage'

import { ImageIcon } from 'assets/svgs'
import styles from './picture.module.scss'

const Picture = () => {
  const [imageFiles, setImageFiles] = useRecoilState(imageListAtom)
  const setMessage = useSetRecoilState(messageAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)

  const handleImageChange = (e: any) => {
    const { files } = e.target

    if ([...files, ...imageFiles].length > 4) {
      setOpenMessageModal(true)
      setMessage(modalMessage().error.memo.LIMIT_IMAGE_NUMBER)
    } else {
      setImageFiles((prevFile) => ({ ...prevFile, file: [...files, ...prevFile] }))
    }
  }

  const handleDeletePictureClick = (fileImage: File) => {
    setImageFiles((prevFile) => ({ ...prevFile, file: prevFile.filter((file) => file.name !== fileImage.name) }))
  }

  return (
    <div className={styles.image}>
      {imageFiles.map((fileImage, index) => {
        const fileImageKey = `fileImage-${index}`
        return (
          <Fragment key={fileImageKey}>
            <img className={styles.prevShowImage} alt={`${fileImage.name}`} src={URL.createObjectURL(fileImage)} />
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
