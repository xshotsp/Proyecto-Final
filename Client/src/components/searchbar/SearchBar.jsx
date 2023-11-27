import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { getProductName } from "../../redux/actions/actions";
=======
import { getProductName, getFilters } from "../../redux/actions/actions";
>>>>>>> c6188f362889618f01a2dc5f3d9df4d48c12d2dc
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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

<<<<<<< HEAD
      <button onClick={handleSearch} className={styles.search}>
=======
<button onClick={handleSearch} className={styles.search}>
>>>>>>> c6188f362889618f01a2dc5f3d9df4d48c12d2dc
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchBar;
