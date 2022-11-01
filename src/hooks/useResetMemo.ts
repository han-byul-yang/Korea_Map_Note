import { useResetRecoilState } from 'recoil'

import { imageListAtom, memoAtom } from 'store/atom'

const useResetMemo = () => {
  const resetMemo = useResetRecoilState(memoAtom)
  const resetImageFiles = useResetRecoilState(imageListAtom)

  const resetMemoData = () => {
    resetMemo()
    resetImageFiles()
  }

  return resetMemoData
}

export default useResetMemo
