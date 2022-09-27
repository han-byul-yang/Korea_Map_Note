import { FormEvent, useState } from 'react'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearchInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.currentTarget.value)
  }

  return <input type='search' value={searchInput} onChange={handleSearchInputChange} />
}

export default SearchBar
