import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { isOpenAddNoteFormAtom, isOpenMessageModalAtom, isOpenReadNotesAtom } from 'store/atom'
import MessageModal from 'components/Modal/MessageModal'
import AddNoteForm from 'routes/Main/AddNoteForm'
import ModalPortal from 'components/Modal/ModalPortal'
import SearchBar from './SearchBar'
import KakaoMap from './KaKaoMap'
import ReadNotes from './ReadNotes'

const Main = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [changeMemoPlaceName, setChangeMemoPlaceName] = useState(false)
  const [fileImageList, setFileImageList] = useState<File[]>([])
  const openMessageModal = useRecoilValue(isOpenMessageModalAtom)
  const isOpenAddNoteForm = useRecoilValue(isOpenAddNoteFormAtom)
  const isOpenReadNote = useRecoilValue(isOpenReadNotesAtom)

  return (
    <>
      <SearchBar isMapLoaded={isMapLoaded} />
      {isOpenAddNoteForm && (
        <AddNoteForm
          setChangeMemoPlaceName={setChangeMemoPlaceName}
          changeMemoPlaceName={changeMemoPlaceName}
          setFileImageList={setFileImageList}
          fileImageList={fileImageList}
        />
      )}
      <KakaoMap setIsMapLoaded={setIsMapLoaded} isMapLoaded={isMapLoaded} />
      <ReadNotes />
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
