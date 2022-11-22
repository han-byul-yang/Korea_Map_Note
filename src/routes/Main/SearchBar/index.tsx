import { FormEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { isDeleteSearchMarkerAtom } from 'store/atom'
import DropDown from './DropDown'

import { SearchIcon, XIcon } from 'assets/svgs'
import styles from './searchBar.module.scss'

interface ISearchBarProps {
  isMapLoaded: boolean
}

const SearchBar = ({ isMapLoaded }: ISearchBarProps) => {
  const [searchInput, setSearchInput] = useState('')
  const [showDropDown, setShowDropDown] = useState(true)
  const [showXIcon, setShowXIcon] = useState(false)
  const setIsDeleteSearchMarker = useSetRecoilState(isDeleteSearchMarkerAtom)

  const handleSearchInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.currentTarget.value)
    setShowXIcon(true)
    setShowDropDown(true)
  }

  const handleXButtonClick = () => {
    setSearchInput('')
    setIsDeleteSearchMarker(true)
    setShowXIcon(false)
  }

  return (
    <form className={styles.searchBarForm}>
      <SearchIcon className={styles.searchIcon} />
      <input type='search' value={searchInput} onChange={handleSearchInputChange} />
      {showXIcon && <XIcon className={styles.xIcon} onClick={handleXButtonClick} />}
      {searchInput.length !== 0 && (
        <DropDown
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          showDropDown={showDropDown}
          setShowDropDown={setShowDropDown}
          isMapLoaded={isMapLoaded}
        />
      )}
    </form>
  )
}

export default SearchBar

// map - context api 로 넘겨주기
// dropDown props - context api로 넘겨주기
