import { useState } from "react"

const SearchBar = () => {
  
    const [search, setSearch] = useState('');

    const handleInputChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = () => {
        if(search.trim() === '') return null;
        // prueba
        console.log('Searching for ', search);
        setSearch('')
    }
  
    return (
    <div>
        <input 
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleInputChange} />

        <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}

export default SearchBar