import { Dispatch, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { useRecoilState, useRecoilValue } from 'recoil'
import dayjs from 'dayjs'

import useResize from 'hooks/useResize'
import useResetMemo from 'hooks/useResetMemo'
import { storeImagesToFirebase, createDocsToFirebase } from 'utils/firebaseService/firebaseDBService'
import useOpenMessageModal from 'hooks/useOpenMessageModal'
import { firebaseDBService } from 'utils/firebaseService/firebaseSetting'
import modalMessage from 'utils/modalMessage'
import {
  isOpenAddNoteFormAtom,
  markPositionAtom,
  memoAtom,
  isOkChangeMarkAtom,
  userIdAtom,
  imageListAtom,
} from 'store/atom'
import { ISearchAddressResultInfo, ISearchPlacesResultInfo } from 'types/searchPlacesType'
import Address from './Address'
import PlaceName from './PlaceName'
import DescriptionText from './DescriptionText'
import HashTag from './HashTag'
import Picture from './Picture'
import TravelDate from './TravelDate'

import { XIcon } from 'assets/svgs'
import styles from './addNoteForm.module.scss'

interface IAddNoteFormProps {
  setChangeMemoPlaceName: Dispatch<React.SetStateAction<boolean>>
  changeMemoPlaceName: boolean
}

const AddNoteForm = ({ setChangeMemoPlaceName, changeMemoPlaceName }: IAddNoteFormProps) => {
  const queryClient = useQueryClient()
  const userId = useRecoilValue(userIdAtom)
  const [openAddNoteForm, setOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)
  const memo = useRecoilValue(memoAtom) // type 설정
  const imageFiles = useRecoilValue(imageListAtom)
  const markPosition = useRecoilValue(markPositionAtom)
  const { openMessageModal, closeMessageModal } = useOpenMessageModal()
  const { size, isSize: isMobile } = useResize()
  const [addressResult, setAddressResult] = useState<ISearchAddressResultInfo[] | undefined>(
    queryClient.getQueryData([
      'getAddressByPosition',
      markPosition.clickedPosition.latitude,
      markPosition.clickedPosition.longitude,
    ])
  )
  const [placeResult, setPlaceResult] = useState<ISearchPlacesResultInfo[] | undefined>([])
  const [isOkChangeMark, setIsOkChangeMark] = useRecoilState(isOkChangeMarkAtom)
  const resetMemoData = useResetMemo()

  useEffect(() => {
    if (isOkChangeMark) {
      setAddressResult(
        queryClient.getQueryData([
          'getAddressByPosition',
          markPosition.clickedPosition.latitude,
          markPosition.clickedPosition.longitude,
        ])
      )
      const placesResultsData: ISearchPlacesResultInfo[] | undefined = queryClient.getQueryData(
        ['getPlacesByKeyword'],
        {
          exact: false,
        }
      )
      setPlaceResult(
        placesResultsData?.filter(
          (place) =>
            Number(place.x) === markPosition.clickedPosition.longitude &&
            Number(place.y) === markPosition.clickedPosition.latitude
        )
      )
      setIsOkChangeMark(false)
    }
  }, [
    markPosition.clickedPosition.latitude,
    markPosition.clickedPosition.longitude,
    isOkChangeMark,
    queryClient,
    setIsOkChangeMark,
  ])

  useEffect(() => {
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [size.MOBILE])

  const warningMessageOkButtonHandle = () => {
    closeMessageModal()
    setOpenAddNoteForm((prevState) => ({ ...prevState, isOpen: false }))
    resetMemoData()
  }

  const handleCloseButtonClick = () => {
    openMessageModal(modalMessage().warning.memo.CLOSE_ADD_NOTE_FORM, warningMessageOkButtonHandle)
  }

  const sendMemoData = {
    writer: userId,
    createAt: dayjs(new Date()).valueOf(),
    geolocation: {
      latitude: markPosition.clickedPosition.latitude,
      longitude: markPosition.clickedPosition.longitude,
    },
    memo: {
      siteName: changeMemoPlaceName
        ? memo.siteName
        : (placeResult && placeResult.length !== 0 && placeResult[0].place_name) || memo.siteName,
      travelDate: memo.travelDate,
      text: memo.text,
      hashTagList: memo.hashTagList,
    },
  }

  const addNoteMessageOkButtonHandle = () => {
    createDocsToFirebase(userId, sendMemoData.createAt, sendMemoData)
    storeImagesToFirebase(imageFiles, userId, sendMemoData.createAt)
    setOpenAddNoteForm((prevState) => ({ ...prevState, isOpen: false }))
    resetMemoData()
    openMessageModal(modalMessage().notification.memo.NOTE_UPDATED)
  }

  const updateNoteMessageOkButtonHandle = () => {
    // await updateDoc(doc(firebaseDBService, userId), sendMemoData)
    setOpenAddNoteForm((prevState) => ({ ...prevState, type: 'add' }))
    resetMemoData()
    openMessageModal(modalMessage().notification.memo.NOTE_UPDATED)
  }

  const handleMemoSubmitClick = async () => {
    if (!memo.siteName) {
      openMessageModal(modalMessage().notification.memo.NO_PLACE_NAME)
    } else if (openAddNoteForm.type === 'add') {
      openMessageModal(modalMessage().warning.memo.ADD_NOTE_FORM, addNoteMessageOkButtonHandle)
    } else {
      openMessageModal(modalMessage().warning.memo.UPDATE_NOTE_FORM, updateNoteMessageOkButtonHandle)
    }
  }

  return (
    <div className={styles.addNoteContainer}>
      <div className={styles.addNoteBox}>
        {isMobile && <XIcon className={styles.xIcon} onClick={handleCloseButtonClick} />}
        <Address addressResult={addressResult} />
        <PlaceName
          setChangeMemoPlaceName={setChangeMemoPlaceName}
          changeMemoPlaceName={changeMemoPlaceName}
          placeResult={placeResult}
        />
        <TravelDate />
        <DescriptionText />
        <Picture />
        <HashTag />
        <button type='button' onClick={handleMemoSubmitClick}>
          {openAddNoteForm.type === 'add' ? '메모 저장' : '메모 수정'}
        </button>
      </div>
      {!isMobile && openAddNoteForm.isOpen && (
        <button className={openAddNoteForm && styles.closeButton} type='button' onClick={handleCloseButtonClick}>
          <XIcon className={styles.arrowIcon} />
        </button>
      )}
    </div>
  )
}

export default AddNoteForm
