import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { isOpenAddNoteFormAtom, isOpenMessageModalAtom } from 'store/atom'
import MessageModal from 'components/Modal/MessageModal'
import AddNoteForm from 'routes/Main/AddNoteForm'
import ModalPortal from 'components/Modal/ModalPortal'
import SearchBar from './SearchBar'
import KakaoMap from './KaKaoMap'

const Main = () => {
  const [map, setMap] = useState(false)
  const openMessageModal = useRecoilValue(isOpenMessageModalAtom)
  const [openAddNoteForm, setOpenAddNoteForm] = useRecoilState(isOpenAddNoteFormAtom)

  return (
    <>
      <SearchBar map={map} />
      <AddNoteForm />
      <KakaoMap setMap={setMap} />
      {openMessageModal && (
        <ModalPortal>
          <MessageModal />
        </ModalPortal>
      )}
    </>
  )
}

export default Main

// declare 정확히 알기
// env 파일에 key 집어넣기
// 지도 렌더링 시간 너무 오래걸림
// mapmarker 리팩토링, handleMapMarkerClick 함수도
// map, setMap context api로 넘겨주기
