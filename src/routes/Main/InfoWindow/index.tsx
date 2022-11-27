import { Dispatch, memo, useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import useClickOutside from 'hooks/useClickOutside'
import useResetMemo from 'hooks/useResetMemo'
import { useGetAddressByPositionApiQuery } from 'hooks/query/useGetKaKaoApiQuery'
import { isOkChangeMarkAtom, isOpenAddNoteFormAtom, isOpenReadNotesAtom, markPositionAtom } from 'store/atom'
import useOpenMessageModal from 'hooks/useOpenMessageModal'
import modalMessage from 'constants/modalMessage'
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
  const [isOpenAddNoteForm, setIsOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)
  const setIsOpenReadNotes = useSetRecoilState(isOpenReadNotesAtom)
  const setIsOkChangeMark = useSetRecoilState(isOkChangeMarkAtom)
  const { openMessageModal, closeMessageModal } = useOpenMessageModal()
  const resetMemoData = useResetMemo()
  const { isLoading } = useGetAddressByPositionApiQuery(markPosition, isMapLoaded)

  const clickOutsideHandle = () => {
    setOpenInfoWindow(false)
  }
  const { clickOutsideEvent } = useClickOutside(containerRef, clickOutsideHandle)

  useEffect(() => {
    clickOutsideEvent()
  }, [clickOutsideEvent])

  const addNoteMessageOkButtonHandle = () => {
    setIsOkChangeMark(true)
    closeMessageModal()
    resetMemoData()
  }

  const handleAddNoteClick = () => {
    setIsOpenReadNotes(false)
    setIsOpenAddNoteForm((prevState) => ({ ...prevState, isOpen: true }))
    if (!isOpenAddNoteForm.isOpen) {
      setIsOkChangeMark(true)
    }
    if (isOpenAddNoteForm.isOpen) {
      openMessageModal(modalMessage.warning.memo.CLOSE_ADD_NOTE_FORM, addNoteMessageOkButtonHandle)
    }
  }

  const readNoteMessageOkButtonHandle = () => {
    setIsOkChangeMark(true)
    closeMessageModal()
    setIsOpenReadNotes(true)
    setIsOpenAddNoteForm((prevState) => ({ ...prevState, isOpen: false }))
    resetMemoData()
  }

  const handleReadNoteClick = () => {
    if (isOpenAddNoteForm.isOpen) {
      openMessageModal(modalMessage.warning.memo.CLOSE_ADD_NOTE_FORM, readNoteMessageOkButtonHandle)
    } else {
      setIsOpenAddNoteForm((prevState) => ({ ...prevState, isOpen: false }))
      setIsOpenReadNotes(true)
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
