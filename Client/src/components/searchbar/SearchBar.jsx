import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getProductName, getFilters } from "../../redux/actions/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [initialFilters,setInitialFilters] = useState({})

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    const { name, value } = e.target;
    setInitialFilters({ [name]: value });
    dispatch(getFilters(initialFilters));
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      await dispatch(getProductName(search));
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <input
        name = "name"
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleInputChange}
        className={styles.input}
      />

      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
