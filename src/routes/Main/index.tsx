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
  const isOpenMessageModal = useRecoilValue(isOpenMessageModalAtom)
  const isOpenAddNoteForm = useRecoilValue(isOpenAddNoteFormAtom)
  const isOpenReadNotes = useRecoilValue(isOpenReadNotesAtom)

  return (
    <>
      <SearchBar isMapLoaded={isMapLoaded} />
      {isOpenAddNoteForm.isOpen && <AddNoteForm />}
      <KakaoMap setIsMapLoaded={setIsMapLoaded} isMapLoaded={isMapLoaded} />
      {isOpenReadNotes && <ReadNotes />}
      {isOpenMessageModal && (
        <ModalPortal>
          <MessageModal />
        </ModalPortal>
      )}
    </>
  )
}

export default Main
