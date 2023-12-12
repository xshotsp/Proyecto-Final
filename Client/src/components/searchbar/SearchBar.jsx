import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductName, getFilters } from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [initialFilters, setInitialFilters] = useState({});
  const darkMode = useSelector((state) => state.darkMode);
  const navigate = useNavigate()
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      //handleSearch();
      navigate('/')
      e.preventDefault()
    }
  };

  useEffect(() => {
    dispatch(getFilters(initialFilters));
  }, [initialFilters, dispatch]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    const { name, value } = e.target;
    setInitialFilters({ [name]: value });
    dispatch(getFilters(initialFilters));
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter") { // Verifica si se presionó la tecla "Enter"
      event.preventDefault();
      console.log("Tecla presionada:", event.key); // Agrega este console.log para depurar
      try {
        await dispatch(getProductName(search));
        setSearch("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className={`${styles.container} ${
        darkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <input
        name="name"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleInputChange}
        className={styles.input}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearch} className={styles.search}>
      <Link to='/'>
        <FontAwesomeIcon icon={faSearch} />
      </Link>
      </button>
    </div>
  );
};

export default SearchBar;
