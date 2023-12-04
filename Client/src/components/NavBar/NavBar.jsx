import { useState } from "react";
import { toggleDarkMode } from "../../redux/actions/actions";
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
  faBagShopping

} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../searchbar/SearchBar";
import styles from "./navbar.module.css";

import { signOutFunction } from "../../firebase/firebase.config";


const NavBar = ({ login, setLogin }) => {
  const [activePage, setActivePage] = useState("");
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleMouseOver = (page) => {
    setActivePage(page);
  };


  const handleMouseOut = () => {
    setActivePage('');

  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleLogout = () => {
    setLogin({
      access: false,
      email: "",
      photo: "",
    });

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
            <div
             className={styles.nav__linkContainer}
             onMouseOver={() => handleMouseOver('producto')}
             onMouseOut={handleMouseOut}
            >
                  <Link to="/form">
                <li className={activePage === 'producto' ? styles.active : ''}>
                  <FontAwesomeIcon icon={faBagShopping} />
                  {activePage === 'producto' && <span>Crea un producto</span>}
                </li>
              </Link>
            </div>
    
           <div
            className={styles.nav__linkContainer}
            onMouseOver={() => handleMouseOver('cart')}
            onMouseOut={handleMouseOut}
           >
            <Link to="/cart" className={styles.cart}>
            <li className={activePage === 'cart' ? styles.active : ''}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {activePage === "cart" && <span>Carrito</span>}
            </li>
          </Link>
           </div>

         {!login.access && (
             
             <div
             className={styles.nav__linkContainer}
              onMouseOver={() => handleMouseOver('createuser')}
              onMouseOut={handleMouseOut}
             >
                <Link to="/createuser">
              <li className={activePage === 'createuser' ? styles.active : ''}>
                <FontAwesomeIcon icon={faListCheck} />
                {activePage === 'createuser' && <span>Registrarse</span>}
              </li>
            </Link>
          </div>
           
          )}

        {!login.access && (
           <div
            className={styles.nav__linkContainer}
            onMouseOver={() => handleMouseOver('login')}
            onMouseOut={handleMouseOut}
            >
                <Link to="/login">
              <li className={activePage === 'login' ? styles.active : ''}>
                <FontAwesomeIcon icon={faUser} />
                {activePage === 'login' && <span>Login</span>}
              </li>
              </Link>
            </div>
          )}


        <div
          className={styles.nav__linkContainer}
          onMouseOver={() => handleMouseOver('contacto')}
          onMouseOut={handleMouseOut}
         >
              <Link to="/contacto">
            <li className={activePage === 'contacto' ? styles.active : ''}>
              <FontAwesomeIcon icon={faAddressBook} />
              {activePage === 'contacto' && <span>Contacto</span>}
            </li>
          </Link>
         </div>
          
        </ul>
        <div className={styles.darkModeToggle} onClick={handleDarkModeToggle}>
          <FontAwesomeIcon
            icon={darkMode ? faSun : faMoon}
            className={styles.darkModeIcon}
          />
        </div>
        {login.access && (
          <div className={styles.user__photo}>
            <img
              src={login.photo}
              alt=""
              onClick={() => setShowOptions(!showOptions)}
            />
          </div>
        )}

        {showOptions && (
          <div className={styles.user__options}>
            <p>{login.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;