import { useState } from "react"
import { getProductName } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {
    const dispatch = useDispatch;
    const [search, setSearch] = useState('');

    const handleInputChange = (e) => {
        setSearch(e.target.value)
    }

 
    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            await dispatch(getProductName(search))
        } catch (error) {
            console.log(error)
        }
        
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