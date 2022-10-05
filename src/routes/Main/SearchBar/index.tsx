import { FormEvent, Suspense, useDeferredValue, useState, useTransition } from 'react'

import DropDown from './DropDown'

import { SearchIcon } from 'assets/svgs'
import styles from './searchBar.module.scss'

interface ISearchBarProps {
  isMapLoaded: boolean
}

const SearchBar = ({ isMapLoaded }: ISearchBarProps) => {
  const [searchInput, setSearchInput] = useState('')
  const [showDropDown, setShowDropDown] = useState(true)

  const handleSearchInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.currentTarget.value)
    setShowDropDown(true)
  }

  return (
    <form className={styles.searchBarForm}>
      <SearchIcon className={styles.searchIcon} />
      <input type='search' value={searchInput} onChange={handleSearchInputChange} />
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
