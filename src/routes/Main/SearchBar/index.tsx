import { FormEvent, Suspense, useDeferredValue, useState, useTransition } from 'react'
import { useQuery } from '@tanstack/react-query'

import DropDown from './DropDown'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearchInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.currentTarget.value)
  }

  return (
    <>
      <input type='search' value={searchInput} onChange={handleSearchInputChange} />
      {searchInput.length !== 0 && <DropDown searchInput={searchInput} />}
    </>
  )
}

export default SearchBar
