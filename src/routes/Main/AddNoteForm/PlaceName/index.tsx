import { Dispatch, FormEvent } from 'react'
import { useRecoilState } from 'recoil'

import { memoAtom } from 'store/atom'
import { ISearchPlacesResultInfo } from 'types/searchPlacesType'

interface IPlaceNameProps {
  setIsChangeMemoPlaceName: Dispatch<React.SetStateAction<boolean>>
  isChangeMemoPlaceName: boolean
  placeResult: ISearchPlacesResultInfo[] | undefined
}
const PlaceName = ({ setIsChangeMemoPlaceName, isChangeMemoPlaceName, placeResult }: IPlaceNameProps) => {
  const [memo, setMemo] = useRecoilState(memoAtom) // type 설정

  const handleChangePlaceNameClick = () => {
    setIsChangeMemoPlaceName(true)
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
          {isChangeMemoPlaceName ? (
            <input type='text' name='siteName' value={memo.siteName} onChange={handlePlaceNameChange} />
          ) : (
            <span>{placeResult && placeResult.length !== 0 && placeResult[0].place_name}</span>
          )}
          <button type='button' onClick={handleChangePlaceNameClick}>
            {isChangeMemoPlaceName ? '되돌리기' : '이름 수정'}
          </button>
        </>
      ) : (
        <input type='text' name='siteName' value={memo.siteName} onChange={handlePlaceNameChange} />
      )}
    </label>
  )
}

export default PlaceName
