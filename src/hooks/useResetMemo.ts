import { useResetRecoilState } from 'recoil'

import { imageListAtom, isEditMemoPlaceNameAtom, memoAtom } from 'store/atom'

const useResetMemo = () => {
  const resetMemo = useResetRecoilState(memoAtom)
  const resetImageFiles = useResetRecoilState(imageListAtom)
  const resetIsEditMemoPlaceName = useResetRecoilState(isEditMemoPlaceNameAtom)

  const resetMemoData = () => {
    resetMemo()
    resetImageFiles()
    resetIsEditMemoPlaceName()
  }

  return resetMemoData
}

export default useResetMemo
