import { Dispatch, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import {
  isOpenAddNoteFormAtom,
  isOpenMessageModalAtom,
  isOpenReadStoredNotesAtom,
  markPositionAtom,
  messageAtom,
} from 'store/atom'
import modalMessage from 'utils/modalMessage'
import { getAddressByPositionApi } from 'services/api/searchKakaoApi'
import { ISearchAddressResultInfo } from 'types/searchPlacesType'
import PlaceInfoBox from './PlaceInfoBox'

import { NotebookIcon, WriteIcon } from 'assets/svgs'
import styles from './infoWindow.module.scss'

interface IInfoWindowProps {
  setOpenInfoWindow: Dispatch<React.SetStateAction<boolean>>
  isMapLoaded: boolean
}

const InfoWindow = ({ setOpenInfoWindow, isMapLoaded }: IInfoWindowProps) => {
  const containerRef = useRef(null)
  const markPosition = useRecoilValue(markPositionAtom)
  const setMessage = useSetRecoilState(messageAtom)
  const setOpenAddNoteForm = useSetRecoilState(isOpenAddNoteFormAtom)
  const setOpenReadStoredNotes = useSetRecoilState(isOpenReadStoredNotesAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)

  const clickOutsideTarget = () => {
    setOpenInfoWindow(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideTarget)

  const { isLoading } = useQuery(
    ['getAddressByPosition', markPosition.clickedPosition.latitude, markPosition.clickedPosition.longitude],
    () => getAddressByPositionApi(markPosition.clickedPosition, isMapLoaded),
    {
      onSuccess: (res: ISearchAddressResultInfo[]) => {},
      staleTime: 1000,
      cacheTime: 1000,
      onError: () => {
        setOpenMessageModal(true)
        setMessage(modalMessage().error.api.SOMETHING_WRONG)
      },
    }
  )

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const handleAddNoteClick = () => {
    setOpenAddNoteForm(true)
  }

  const handleReadNoteClick = () => {
    setOpenReadStoredNotes(true)
  }

  return (
    <>
      <div className={styles.background} />
      <div className={styles.infoWindowContainer} ref={containerRef}>
        <PlaceInfoBox isLoading={isLoading} />
        <button className={styles.memoButton} type='button' onClick={handleAddNoteClick}>
          <WriteIcon className={styles.icon} />
          추억 추가
        </button>
        <button className={styles.memoButton} type='button' onClick={handleReadNoteClick}>
          <NotebookIcon className={styles.icon} />
          추억 보기
        </button>
      </div>
    </>
  )
}

export default InfoWindow
