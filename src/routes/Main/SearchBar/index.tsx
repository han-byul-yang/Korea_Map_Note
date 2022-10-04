import { FormEvent, Suspense, useDeferredValue, useState, useTransition } from 'react'

import DropDown from './DropDown'

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
    <>
      <input type='search' value={searchInput} onChange={handleSearchInputChange} />
      {searchInput.length !== 0 && <DropDown searchInput={searchInput} map={map} />}
    </>
  )
}

export default SearchBar

// map - context api 로 넘겨주기
