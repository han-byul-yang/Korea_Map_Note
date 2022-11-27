import { useEffect, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import dayjs from 'dayjs'

import useResize from 'hooks/useResize'
import useResetMemo from 'hooks/useResetMemo'
import useGetKakaoQueryData from 'hooks/query/useGetKaKaoQueryData'
import useOpenMessageModal from 'hooks/useOpenMessageModal'
import {
  addImagesToFirebase,
  createDocsToFirebase,
  updateDocsToFirebase,
  updateImagesToFirebase,
} from 'utils/firebaseService/firebaseDBService'
import {
  isOpenAddNoteFormAtom,
  markPositionAtom,
  memoAtom,
  userIdAtom,
  imageListAtom,
  isOkChangeMarkAtom,
  isEditMemoPlaceNameAtom,
  pictureUpdateSnapShotAtom,
} from 'store/atom'
import { ISearchAddressResultInfo, ISearchPlacesResultInfo } from 'types/searchPlacesType'
import modalMessage from 'constants/modalMessage'
import Address from './Address'
import PlaceName from './PlaceName'
import DescriptionText from './DescriptionText'
import HashTag from './HashTag'
import Picture from './Picture'
import TravelDate from './TravelDate'

import { XIcon } from 'assets/svgs'
import styles from './addNoteForm.module.scss'

const AddNoteForm = () => {
  const userId = useRecoilValue(userIdAtom)
  const [isOpenAddNoteForm, setIsOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)
  const memo = useRecoilValue(memoAtom) // type 설정
  const imageFiles = useRecoilValue(imageListAtom)
  const [isOkChangeMark, setIsOkChangeMark] = useRecoilState(isOkChangeMarkAtom)
  const markPosition = useRecoilValue(markPositionAtom)
  const { openMessageModal, closeMessageModal } = useOpenMessageModal()
  const { size, isSize: isMobile } = useResize()
  const { getAddressResultData, getPlaceResultData } = useGetKakaoQueryData()
  const [addressResultData, setAddressResultData] = useState<ISearchAddressResultInfo[] | undefined>(
    getAddressResultData(markPosition)
  )
  const [placeResultData, setPlaceResultData] = useState<ISearchPlacesResultInfo[] | undefined>([])
  const isEditMemoPlaceName = useRecoilValue(isEditMemoPlaceNameAtom)
  const setPictureUpdateSnapShot = useSetRecoilState(pictureUpdateSnapShotAtom)
  const resetMemoData = useResetMemo()

  useEffect(() => {
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [size.MOBILE])

  useEffect(() => {
    if (isOkChangeMark) {
      setAddressResultData(getAddressResultData(markPosition))
      setPlaceResultData(getPlaceResultData(markPosition))
    }
    setIsOkChangeMark(false)
  }, [getAddressResultData, getPlaceResultData, isOkChangeMark, markPosition, setIsOkChangeMark])

  const warningMessageOkButtonHandle = () => {
    closeMessageModal()
    setIsOpenAddNoteForm((prevState) => ({ ...prevState, isOpen: false }))
    resetMemoData()
  }

  const handleCloseButtonClick = () => {
    openMessageModal(modalMessage.warning.memo.CLOSE_ADD_NOTE_FORM, warningMessageOkButtonHandle)
  }

  const sendMemoData = useMemo(
    () => ({
      writer: userId,
      geolocation: {
        latitude: markPosition.clickedPosition.latitude,
        longitude: markPosition.clickedPosition.longitude,
      },
      memo: {
        createAt: isOpenAddNoteForm.type === 'add' ? dayjs(new Date()).valueOf() : memo.createAt,
        siteName: isEditMemoPlaceName
          ? memo.siteName
          : (placeResultData && placeResultData.length !== 0 && placeResultData[0].place_name) || memo.siteName,
        travelDate: memo.travelDate,
        text: memo.text,
        hashTagList: memo.hashTagList,
      },
    }),
    [
      isEditMemoPlaceName,
      isOpenAddNoteForm.type,
      markPosition.clickedPosition.latitude,
      markPosition.clickedPosition.longitude,
      memo.createAt,
      memo.hashTagList,
      memo.siteName,
      memo.text,
      memo.travelDate,
      placeResultData,
      userId,
    ]
  )

  const addNoteMessageOkButtonHandle = () => {
    try {
      createDocsToFirebase(userId, sendMemoData.memo.createAt, sendMemoData)
      setPictureUpdateSnapShot(addImagesToFirebase(imageFiles, userId, sendMemoData.memo.createAt))
      resetMemoData()
      openMessageModal(modalMessage.notification.memo.NOTE_UPDATED)
    } catch {
      openMessageModal(modalMessage.error.memo.CREATE)
    }
  }

  const updateNoteMessageOkButtonHandle = () => {
    try {
      updateDocsToFirebase(userId, memo.createAt, sendMemoData)
      setPictureUpdateSnapShot(updateImagesToFirebase(imageFiles, userId, sendMemoData.memo.createAt))
      resetMemoData()
      openMessageModal(modalMessage.notification.memo.NOTE_UPDATED)
    } catch {
      openMessageModal(modalMessage.error.memo.UPDATE)
    }
  }

  const handleMemoSubmitClick = async () => {
    if (!memo.siteName && !(placeResultData && placeResultData.length !== 0)) {
      openMessageModal(modalMessage.notification.memo.NO_PLACE_NAME)
    } else if (isOpenAddNoteForm.type === 'add') {
      openMessageModal(modalMessage.warning.memo.ADD_NOTE_FORM, addNoteMessageOkButtonHandle)
    } else {
      openMessageModal(modalMessage.warning.memo.UPDATE_NOTE_FORM, updateNoteMessageOkButtonHandle)
    }
  }

  return (
    <div className={styles.addNoteContainer}>
      <div className={styles.addNoteBox}>
        {isMobile && <XIcon className={styles.xIcon} onClick={handleCloseButtonClick} />}
        <div className={styles.addNote}>
          <PlaceName placeResult={placeResultData} />
          <DescriptionText />
          <HashTag />
          <Address addressResult={addressResultData} />
          <TravelDate />
          <Picture />
        </div>
        <button className={styles.submitButton} type='button' onClick={handleMemoSubmitClick}>
          {isOpenAddNoteForm.type === 'add' ? '메모 저장' : '메모 수정'}
        </button>
      </div>
      {!isMobile && isOpenAddNoteForm.isOpen && (
        <button className={isOpenAddNoteForm && styles.closeButton} type='button' onClick={handleCloseButtonClick}>
          <XIcon className={styles.arrowIcon} />
        </button>
      )}
    </div>
  )
}

export default AddNoteForm
