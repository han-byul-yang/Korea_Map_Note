import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import debounce from 'utils/debounce'
import { isDeleteSearchMarkerAtom } from 'store/atom'
import DropDown from './DropDown'

import { SearchIcon, XIcon } from 'assets/svgs'
import styles from './searchBar.module.scss'

interface ISearchBarProps {
  isMapLoaded: boolean
}

const SearchBar = ({ isMapLoaded }: ISearchBarProps) => {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('')
  const [showDropDown, setShowDropDown] = useState(true)
  const [showXIcon, setShowXIcon] = useState(false)
  const setIsDeleteSearchMarker = useSetRecoilState(isDeleteSearchMarkerAtom)

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const debouncing = useMemo(() => debounce(setDebouncedSearchInput), [])

  const handleSearchInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.currentTarget.value)
    setShowXIcon(true)
    setShowDropDown(true)
  }

  useEffect(() => {
    debouncing(searchInput)
  }, [debouncing, searchInput])

  const handleXButtonClick = () => {
    setSearchInput('')
    setIsDeleteSearchMarker(true)
    setShowXIcon(false)
  }

  return (
    <form className={styles.searchBarForm} onSubmit={handleFormSubmit}>
      <SearchIcon className={styles.searchIcon} />
      <input type='search' value={searchInput} onChange={handleSearchInputChange} />
      {showXIcon && <XIcon className={styles.xIcon} onClick={handleXButtonClick} />}
      {searchInput.length !== 0 && (
        <DropDown
          setSearchInput={setSearchInput}
          debouncedSearchInput={debouncedSearchInput}
          setDebouncedSearchInput={setDebouncedSearchInput}
          showDropDown={showDropDown}
          setShowDropDown={setShowDropDown}
          isMapLoaded={isMapLoaded}
        />
      )}
    </form>
  )
}

export default SearchBar
