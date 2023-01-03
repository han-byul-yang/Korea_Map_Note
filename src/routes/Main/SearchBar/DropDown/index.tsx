import React, { Dispatch } from 'react'
import { useSetRecoilState } from 'recoil'

import { useGetPlacesByKeywordApiQuery } from 'hooks/query/useGetKaKaoApiQuery'
import { isDeleteSearchMarkerAtom, mapLevelAtom, mapPositionAtom, markPositionAtom } from 'store/atom'
import { ISearchPlacesResultInfo } from 'types/searchPlacesType'

import { SearchIcon } from 'assets/svgs'
import styles from './dropDown.module.scss'

interface IDropDownProps {
  setSearchInput: Dispatch<React.SetStateAction<string>>
  debouncedSearchInput: string
  setDebouncedSearchInput: Dispatch<React.SetStateAction<string>>
  showDropDown: boolean
  setShowDropDown: Dispatch<React.SetStateAction<boolean>>
  isMapLoaded: boolean
}

const DropDown = ({
  setSearchInput,
  debouncedSearchInput,
  setDebouncedSearchInput,
  showDropDown,
  setShowDropDown,
  isMapLoaded,
}: IDropDownProps) => {
  const setMarkPosition = useSetRecoilState(markPositionAtom)
  const setMapPosition = useSetRecoilState(mapPositionAtom)
  const setMapLevel = useSetRecoilState(mapLevelAtom)
  const setIsDeleteSearchMarker = useSetRecoilState(isDeleteSearchMarkerAtom)

  const { isLoading, data: placesResultData } = useGetPlacesByKeywordApiQuery(debouncedSearchInput, isMapLoaded)

  if (isLoading) {
    return <div>loading...</div>
  }

  const handleResultPlaceClick = (resultPlace: ISearchPlacesResultInfo) => {
    setDebouncedSearchInput(resultPlace.place_name)
    setSearchInput(resultPlace.place_name)
    setMapPosition({ latitude: Number(resultPlace.y), longitude: Number(resultPlace.x) })
    setMarkPosition((prev) => {
      return { ...prev, searchPosition: { latitude: Number(resultPlace.y), longitude: Number(resultPlace.x) } }
    })
    setMapLevel(4)
    setIsDeleteSearchMarker(false)
    setShowDropDown(false)
  }

  return (
    <ul className={styles.dropDownList}>
      {showDropDown &&
        placesResultData?.map((resultPlace) => {
          return (
            <li key={resultPlace?.id} className={styles.dropDownItem}>
              <SearchIcon className={styles.searchIcon} />
              <button type='button' onClick={() => handleResultPlaceClick(resultPlace)}>
                <p className={styles.placeName}>{resultPlace?.place_name}</p>
                <p className={styles.addressName}>{resultPlace?.address_name}</p>
              </button>
            </li>
          )
        })}
    </ul>
  )
}

export default React.memo(DropDown)
