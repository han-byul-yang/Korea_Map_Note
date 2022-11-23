import { FormEvent } from 'react'
import { useRecoilState } from 'recoil'

import { isEditMemoPlaceNameAtom, memoAtom } from 'store/atom'
import { ISearchPlacesResultInfo } from 'types/searchPlacesType'

interface IPlaceNameProps {
  placeResult: ISearchPlacesResultInfo[] | undefined
}
const PlaceName = ({ placeResult }: IPlaceNameProps) => {
  const [memo, setMemo] = useRecoilState(memoAtom) // type 설정
  const [isEditMemoPlaceName, setIsEditMemoPlaceName] = useRecoilState(isEditMemoPlaceNameAtom)

  const handleChangePlaceNameClick = () => {
    setIsEditMemoPlaceName(true)
    setMemo((prev) => ({
      ...prev,
      siteName: placeResult![0].place_name,
    }))
  }

  const handlePlaceNameChange = (e: FormEvent<HTMLInputElement>) => {
    setMemo((prevMemo) => ({ ...prevMemo, siteName: e.currentTarget.value }))
  }

  return (
    <label>
      이 장소의 이름은?
      {placeResult && placeResult.length !== 0 ? (
        <>
          {isEditMemoPlaceName ? (
            <input type='text' name='siteName' value={memo.siteName} onChange={handlePlaceNameChange} />
          ) : (
            <span>{placeResult && placeResult.length !== 0 && placeResult[0].place_name}</span>
          )}
          <button type='button' onClick={handleChangePlaceNameClick}>
            {isEditMemoPlaceName ? '되돌리기' : '이름 수정'}
          </button>
        </>
      ) : (
        <input type='text' name='siteName' value={memo.siteName} onChange={handlePlaceNameChange} />
      )}
    </label>
  )
}

export default PlaceName
