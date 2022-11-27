import { Dispatch, SetStateAction } from 'react'
import Slider from 'react-slick'

import { XIcon } from 'assets/svgs'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './carouselModal.module.scss'

interface IModalProps {
  pictureList?: string[]
  setIsOpenCarouselModal: Dispatch<SetStateAction<boolean>>
}

const CarouselModal = ({ pictureList, setIsOpenCarouselModal }: IModalProps) => {
  const handleCloseCarouselModalClick = () => {
    setIsOpenCarouselModal(false)
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className={styles.background}>
      <button type='button' onClick={handleCloseCarouselModalClick}>
        <XIcon className={styles.xIcon} />
      </button>
      <div className={styles.modalContainer}>
        <Slider {...settings}>
          {pictureList?.map((img, index) => {
            const imageKey = `img-${index}`
            return (
              <li key={imageKey}>
                <img className={styles.modalImage} src={img} alt={`캐로셀 이미지-${index}`} />
              </li>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default CarouselModal
