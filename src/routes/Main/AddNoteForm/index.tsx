import { Dispatch, FormEvent, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import useResize from 'hooks/useResize'
import presentDate from 'utils/presentDate'
import { createDocsToFirebase } from 'utils/firebaseService/firebaseDBService'
import { clickedMarkPositionAtom, isOpenAddNoteFormAtom, memoAtom, userIdAtom } from 'store/atom'
import { IMemo } from 'types/memoType'
import { ISearchAddressResultInfo, ISearchPlacesResultInfo } from 'types/searchPlacesType'
import Picture from './Picture'
import HashTag from './HashTag'

import { XIcon } from 'assets/svgs'
import styles from './addNoteForm.module.scss'

const AddNoteForm = () => {
  const [changeMemoPlaceName, setChangeMemoPlaceName] = useState(false)
  const userId = useRecoilValue(userIdAtom)
  const [openAddNoteForm, setOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)
  const { size, isSize: isMobile } = useResize()

  const queryClient = useQueryClient()
  const clickedMarkPosition = useRecoilValue(clickedMarkPositionAtom)

  const addressResultsData: ISearchAddressResultInfo[] | undefined = queryClient.getQueryData([
    'getAddressByPosition',
    clickedMarkPosition.latitude,
    clickedMarkPosition.longitude,
  ])
  const placesResultsData: ISearchPlacesResultInfo[] | undefined = queryClient.getQueryData(['getPlacesByKeyword'], {
    exact: false,
  })
  const placeResultData = placesResultsData?.filter((place) => Number(place.x) === clickedMarkPosition.longitude)

  const [memo, setMemo] = useRecoilState(memoAtom) // type 설정

  useEffect(() => {
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [size.MOBILE])

  const handleXButtonClick = () => {
    setOpenAddNoteForm(false)
  }

  const handleCloseButtonClick = () => {
    setOpenAddNoteForm(false)
    setMemo((prevMemo) => ({ ...prevMemo, siteName: '' }))
  }

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setMemo((prev) => {
      if (e.currentTarget?.name === 'siteName') {
        return { ...prev, siteName: e.currentTarget.value }
      }
      if (e.currentTarget?.name === 'text') {
        return { ...prev, text: e.currentTarget.value }
      }
      return { ...prev, hashTag: ['여행', '힐링'] }
    })
  }

  const sendMemoData = {
    writer: userId,
    createAt: new Date(),
    geolocation: {
      latitude: clickedMarkPosition.latitude,
      longitude: clickedMarkPosition.longitude,
    },
    memo: {
      siteName: memo.siteName,
      travelDate: memo.travelDate,
      text: memo.text,
      picture: memo.picture,
      hashTag: memo.hashTag,
    },
  } // useMemo?

  const handleMemoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createDocsToFirebase('memoInfo', sendMemoData)
  }

  const handleMemoClick = () => {
    createDocsToFirebase('memoInfo', sendMemoData)
  }

  const handleChangePlaceNameClick = () => {
    setChangeMemoPlaceName(true)
    setMemo((prev) => ({
      ...prev,
      siteName: placeResultData && placeResultData.length !== 0 ? placeResultData[0].place_name : '',
    }))
  }

  return (
    <div className={openAddNoteForm ? styles.openContainer : styles.closeContainer}>
      <div className={styles.addNoteBox}>
        {isMobile && <XIcon className={styles.xIcon} onClick={handleXButtonClick} />}
        {addressResultsData && (
          <p>
            기본 주소: {addressResultsData[0].address.address_name}
            <br />
            도로명 주소: {addressResultsData[0].road_address?.address_name}
          </p>
        )}
        <form onSubmit={handleMemoSubmit}>
          <label>
            이 장소의 이름은?
            {placeResultData && placeResultData.length !== 0 ? (
              <>
                {changeMemoPlaceName ? (
                  <input type='text' name='siteName' value={memo.siteName} onChange={handleInputChange} />
                ) : (
                  <span>{placeResultData && placeResultData.length !== 0 && placeResultData[0].place_name}</span>
                )}
                <button type='button' onClick={handleChangePlaceNameClick}>
                  {changeMemoPlaceName ? '되돌리기' : '이름 수정'}
                </button>
              </>
            ) : (
              <input type='text' name='siteName' value={memo.siteName} onChange={handleInputChange} />
            )}
          </label>
          <p>
            방문 시기: {presentDate()}
            <button type='button'>날짜 변경</button>
          </p>
          <input type='text' name='text' value={memo.text} onChange={handleInputChange} />
          <Picture />
          <HashTag />
        </form>
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
