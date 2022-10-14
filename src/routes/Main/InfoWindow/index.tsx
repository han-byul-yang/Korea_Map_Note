import { Dispatch, memo, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import useResize from 'hooks/useResize'
import {
  isOpenAddNoteFormAtom,
  isOpenMessageModalAtom,
  isOpenReadNotesAtom,
  markPositionAtom,
  messageAtom,
  isOkChangeMarkAtom,
  memoAtom,
} from 'store/atom'
import modalMessage from 'utils/modalMessage'
import { getAddressByPositionApi } from 'services/api/searchKakaoApi'
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
  const [openAddNoteForm, setOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)
  const setOpenReadNotes = useSetRecoilState(isOpenReadNotesAtom)
  const setOpenMessageModal = useSetRecoilState(isOpenMessageModalAtom)
  const setIsOkChangeMark = useSetRecoilState(isOkChangeMarkAtom)
  const setMemo = useSetRecoilState(memoAtom)
  const { size, isSize: isMobile } = useResize()

  const clickOutsideHandle = () => {
    setOpenInfoWindow(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  const { isLoading } = useQuery(
    ['getAddressByPosition', markPosition.clickedPosition.latitude, markPosition.clickedPosition.longitude],
    () => getAddressByPositionApi(markPosition.clickedPosition, isMapLoaded),
    {
      staleTime: 1000,
      cacheTime: 1000 * 60 * 60,
      onError: () => {
        setOpenMessageModal(true)
        setMessage(modalMessage().error.api.SOMETHING_WRONG)
      },
    }
  )

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  useEffect(() => {
    size.MOBILE.RESIZE()
    size.MOBILE.SIZEEVENT()
  }, [size.MOBILE])

  const addNoteMessageOkButtonHandle = () => {
    setIsOkChangeMark(true)
    setOpenMessageModal(false)
    setMemo({ siteName: '', travelDate: '', text: '', picture: [], hashTagList: [] })
    // setChangeMemoPlaceName(false)
    // setFileImageList([])
  }

  const handleAddNoteClick = () => {
    setOpenReadNotes(false)
    setOpenAddNoteForm(true)
    if (openAddNoteForm) {
      setOpenMessageModal(true)
      setMessage({
        ...modalMessage().warning.memo.CLOSE_ADD_NOTE_FORM,
        warningMessageOkButtonHandle: addNoteMessageOkButtonHandle,
      })
    }
    if (isMobile) {
      setIsOkChangeMark(true)
    }
  }

  const readNoteMessageOkButtonHandle = () => {
    setIsOkChangeMark(true)
    setOpenMessageModal(false)
    setOpenReadNotes(true)
    setOpenAddNoteForm(false)
    setMemo({ siteName: '', travelDate: '', text: '', picture: [], hashTagList: [] })
    // setChangeMemoPlaceName(false)
    // setFileImageList([])
  }

  const handleReadNoteClick = () => {
    if (openAddNoteForm) {
      setOpenMessageModal(true)
      setMessage({
        ...modalMessage().warning.memo.CLOSE_ADD_NOTE_FORM,
        warningMessageOkButtonHandle: readNoteMessageOkButtonHandle,
      })
    } else {
      setOpenAddNoteForm(false)
      setOpenReadNotes(true)
      setIsOkChangeMark(true)
    }
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

export default memo(InfoWindow)
