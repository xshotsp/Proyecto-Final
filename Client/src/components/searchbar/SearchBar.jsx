import { useState } from "react"
import styles from "./SearchBar.module.css"

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
    <div className={styles.container}>
        <input 
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleInputChange} 
        className={styles.input}/>

        <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}

export default SearchBar