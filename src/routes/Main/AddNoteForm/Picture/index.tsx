import { Fragment } from 'react'
import { useRecoilState } from 'recoil'

import { imageListAtom } from 'store/atom'
import useOpenMessageModal from 'hooks/useOpenMessageModal'
import modalMessage from 'utils/modalMessage'

import { ImageIcon, TrashCanIcon } from 'assets/svgs'
import styles from './picture.module.scss'

const Picture = () => {
  const [imageFiles, setImageFiles] = useRecoilState(imageListAtom)
  const { openMessageModal } = useOpenMessageModal()

  const handleImageChange = (e: any) => {
    const { files } = e.target

    const imageFileNames = imageFiles.map((file) => file.name)
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < files.length; i++) {
      if (imageFileNames.includes(files[i].name)) {
        openMessageModal(modalMessage().error.memo.No_SAME_IMAGE)
        return
      }
    }

    if ([...files, ...imageFiles].length > 4) {
      openMessageModal(modalMessage().error.memo.LIMIT_IMAGE_NUMBER)
      return
    }
    setImageFiles((prevFile) => [...files, ...prevFile])
  }

  const handleDeletePictureClick = (fileImage: File) => {
    setImageFiles((prevFile) => prevFile.filter((file) => file.name !== fileImage.name))
  }

  return (
    <div className={styles.image}>
      <label className={styles.imageLabel} htmlFor='chooseFile'>
        <ImageIcon className={styles.imageIcon} />
        사진 추가 👈
      </label>
      <input type='file' multiple id='chooseFile' accept='image/*' onChange={handleImageChange} />
      <ul className={styles.imageList}>
        {imageFiles.map((fileImage, index) => {
          const fileImageKey = `fileImage-${index}`
          return (
            <li key={fileImageKey}>
              <img className={styles.prevShowImage} alt={`${fileImage.name}`} src={URL.createObjectURL(fileImage)} />
              <p>{fileImage.name}</p>
              <TrashCanIcon className={styles.trashCanIcon} onClick={() => handleDeletePictureClick(fileImage)} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Picture

// any type 설정
