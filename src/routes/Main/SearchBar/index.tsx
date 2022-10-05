import { FormEvent, Suspense, useDeferredValue, useState, useTransition } from 'react'

import DropDown from './DropDown'

import { SearchIcon } from 'assets/svgs'
import styles from './searchBar.module.scss'

interface ISearchBarProps {
  map: boolean
}

const SearchBar = ({ map }: ISearchBarProps) => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearchInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.currentTarget.value)
  }

  return (
    <form className={styles.searchBarForm}>
      <SearchIcon className={styles.searchIcon} />
      <input type='search' value={searchInput} onChange={handleSearchInputChange} />
      {searchInput.length !== 0 && <DropDown searchInput={searchInput} map={map} />}
    </form>
  )
}

export default SearchBar

// map - context api 로 넘겨주기
