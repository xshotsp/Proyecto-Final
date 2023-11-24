import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getProductName } from "../../redux/actions/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      await dispatch(getProductName(search));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <input
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
