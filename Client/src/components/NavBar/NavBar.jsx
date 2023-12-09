/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  setAccess,
  toggleDarkMode,
  userLoggedIn,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faAddressBook,
  faListCheck,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../searchbar/SearchBar";
import styles from "./navbar.module.css";

import { signOutFunction } from "../../firebase/firebase.config";

const NavBar = () => {
  const [activePage, setActivePage] = useState("");
  const dispatch = useDispatch();
  const { darkMode, access, activeUser } = useSelector((state) => state);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = (page) => {
    setActivePage(page);
  };

  const handleMouseLeave = () => {
    setActivePage("");
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleLogout = () => {
    dispatch(setAccess(false));
    dispatch(userLoggedIn(""));

    signOutFunction();

    setShowOptions(false);
    navigate("/");
  };

  return (
    <div
      className={`${styles.container} ${
        darkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <nav className={styles.nav}>
        <Link to="/">
          <h1 className={styles.nav__h1}>
            <u>QUIRKZ</u>
          </h1>
        </Link>
        <SearchBar expanded={true} />
        <ul className={styles.nav__ul}>
          <Link
            to="/contacto"
            onMouseEnter={() => handleMouseEnter("contacto")}
            onMouseLeave={handleMouseLeave}
          >
            <li className={activePage === "contacto" ? styles.active : ""}>
              <FontAwesomeIcon icon={faAddressBook} />
              {activePage === "contacto" && <span>Contacto</span>}
            </li>
          </Link>
          {!access && (
            <Link
              to="/createuser"
              onMouseEnter={() => handleMouseEnter("createuser")}
              onMouseLeave={handleMouseLeave}
            >
              <li className={activePage === "createuser" ? styles.active : ""}>
                <FontAwesomeIcon icon={faListCheck} />
                {activePage === "createuser" && <span>Registrarse</span>}
              </li>
            </Link>
          )}
          {!access && (
            <Link
              to="/login"
              onMouseEnter={() => handleMouseEnter("login")}
              onMouseLeave={handleMouseLeave}
            >
              <li className={activePage === "login" ? styles.active : ""}>
                <FontAwesomeIcon icon={faUser} />
                {activePage === "login" && <span>Login</span>}
              </li>
            </Link>
          )}
          <Link to="/form">
            <li>Crear producto</li>
          </Link>
          <Link to="/cart" className={styles.cart}>
            <li className={activePage === "cart" ? styles.active : ""}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {activePage === "cart" && <span>Carrito</span>}
            </li>
          </Link>
        </ul>
        <div className={styles.darkModeToggle} onClick={handleDarkModeToggle}>
          <FontAwesomeIcon
            icon={darkMode ? faSun : faMoon}
            className={styles.darkModeIcon}
          />
        </div>
        {access && (
          <div
            className={styles.photo__container}
            onClick={() => setShowOptions(!showOptions)}
          >
            <img
              src={activeUser?.profile_picture}
              alt=""
              className={styles.user__photo}
            />
          </div>
        )}

        {showOptions && (
          <div className={styles.user__options}>
            <p>{activeUser?.email}</p>
            <Link to={`/editperfil/${activeUser?.email}`}>
              <button>Editar Perfil</button>
            </Link>
            <Link to="/shopping">
              <button>Mis Compras</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
