import { Dispatch, FormEvent, useEffect, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import useResize from 'hooks/useResize'
import { createDocsToFirebase } from 'utils/firebaseService/firebaseDBService'
import modalMessage from 'utils/modalMessage'
import {
  isOpenAddNoteFormAtom,
  isOpenMessageModalAtom,
  markPositionAtom,
  memoAtom,
  messageAtom,
  okOpenAddNoteFormAtom,
  userIdAtom,
} from 'store/atom'
import { ISearchAddressResultInfo, ISearchPlacesResultInfo } from 'types/searchPlacesType'
import Picture from './Picture'
import HashTag from './HashTag'

import { XIcon } from 'assets/svgs'
import styles from './addNoteForm.module.scss'
import Address from './Address'

interface IAddNoteFormProps {
  setChangeMemoPlaceName: Dispatch<React.SetStateAction<boolean>>
  changeMemoPlaceName: boolean
  setFileImageList: Dispatch<React.SetStateAction<File[]>>
  fileImageList: File[]
}

const AddNoteForm = ({
  setChangeMemoPlaceName,
  changeMemoPlaceName,
  setFileImageList,
  fileImageList,
}: IAddNoteFormProps) => {
  const userId = useRecoilValue(userIdAtom)
  const [openAddNoteForm, setOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)
  const [memo, setMemo] = useRecoilState(memoAtom) // type 설정
  const markPosition = useRecoilValue(markPositionAtom)
  const setMessage = useSetRecoilState(messageAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)
  const { size, isSize: isMobile } = useResize()
  const [addressResult, setAddressResult] = useState<ISearchAddressResultInfo[] | undefined>([])
  const [placeResult, setPlaceResult] = useState<ISearchPlacesResultInfo[] | undefined>([])
  const [okOpenAddNoteForm, setOkOpenAddNoteForm] = useRecoilState(okOpenAddNoteFormAtom)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (okOpenAddNoteForm) {
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
      setOkOpenAddNoteForm(false)
    }
  }, [
    markPosition.clickedPosition.latitude,
    markPosition.clickedPosition.longitude,
    okOpenAddNoteForm,
    queryClient,
    setOkOpenAddNoteForm,
  ])

  useEffect(() => {
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [size.MOBILE])

  const handleXButtonClick = () => {
    setOpenAddNoteForm(false)
  }

  const handleCloseButtonClick = () => {
    setOpenMessageModal(true)
    setMessage(modalMessage().warning.memo.CLOSE_ADD_NOTE_FORM)
  }

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setMemo((prev) => {
      if (e.currentTarget?.name === 'siteName') {
        return { ...prev, siteName: e.currentTarget.value }
      }
      if (e.currentTarget?.name === 'text') {
        return { ...prev, text: e.currentTarget.value }
      }
      return { ...prev, hashTagList: ['여행', '힐링'] }
    })
  }

  const sendMemoData = {
    writer: userId,
    createAt: new Date(),
    geolocation: {
      latitude: markPosition.clickedPosition.latitude,
      longitude: markPosition.clickedPosition.longitude,
    },
    memo: {
      siteName: changeMemoPlaceName
        ? memo.siteName
        : (placeResult && placeResult.length !== 0 && placeResult[0].place_name) || '',
      travelDate: memo.travelDate,
      text: memo.text,
      picture: memo.picture,
      hashTagList: memo.hashTagList,
    },
  }

  const handleMemoClick = () => {
    createDocsToFirebase(userId, sendMemoData)
  }

  const handleChangePlaceNameClick = () => {
    setChangeMemoPlaceName(true)
    setMemo((prev) => ({
      ...prev,
      siteName: placeResult![0].place_name,
    }))
  }

  return (
    <div className={openAddNoteForm ? styles.openContainer : styles.closeContainer}>
      <div className={styles.addNoteBox}>
        {isMobile && <XIcon className={styles.xIcon} onClick={handleXButtonClick} />}
        <Address addressResult={addressResult} />
        <label>
          이 장소의 이름은?
          {placeResult && placeResult.length !== 0 ? (
            <>
              {changeMemoPlaceName ? (
                <input type='text' name='siteName' value={memo.siteName} onChange={handleInputChange} />
              ) : (
                <span>{placeResult && placeResult.length !== 0 && placeResult[0].place_name}</span>
              )}
              <button type='button' onClick={handleChangePlaceNameClick}>
                {changeMemoPlaceName ? '되돌리기' : '이름 수정'}
              </button>
            </>
          ) : (
            <input type='text' name='siteName' value={memo.siteName} onChange={handleInputChange} />
          )}
        </label>
        {/* <VisitedDate /> */}
        <input type='text' name='text' value={memo.text} onChange={handleInputChange} />
        <Picture setFileImageList={setFileImageList} fileImageList={fileImageList} />
        <HashTag />
        <button type='button' onClick={handleMemoClick}>
          메모 저장
        </button>
      </div>
      {!isMobile && openAddNoteForm && (
        <button className={openAddNoteForm && styles.closeButton} type='button' onClick={handleCloseButtonClick}>
          <XIcon className={styles.arrowIcon} />
        </button>
      )}
    </div>
  )
}

export default AddNoteForm
