import { Dispatch } from 'react'

interface IAddNoteProps {
  setOpenAddNoteModal: Dispatch<React.SetStateAction<boolean>>
}

const AddNoteModal = ({ setOpenAddNoteModal }: IAddNoteProps) => {
  return <div>dd</div>
}

export default AddNoteModal
