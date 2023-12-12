/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  cleanUserCart,
  setAccess,
  toggleDarkMode,
  userLogOut,
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

const NavBar = ({cartItems,setCartItems,setToken}) => {
  const [activePage, setActivePage] = useState("");
  const dispatch = useDispatch();
  const { darkMode, access, activeUser, userCart } = useSelector((state) => state);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const cartToUse = access ? userCart : cartItems;
  const totalItemsCart = cartToUse.reduce((total, item) => total + item.quantity, 0);
  
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
    dispatch(userLogOut());
    dispatch(cleanUserCart())

    signOutFunction();
    localStorage.clear();
    setCartItems([])
    setShowOptions(false);
    setToken('');
    localStorage.removeItem('token')
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
              {activePage === "contacto" && <span>Contact</span>}
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
                {activePage === "createuser" && <span>Register</span>}
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
            <li>Create product</li>
          </Link>
          <Link to="/cart" className={styles.cart}>
            <li className={activePage === "cart" ? styles.active : ""}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {activePage === "cart" && <span>Shopping cart</span>}
            </li>
            <span className={styles.cart__items}>{totalItemsCart}</span>
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
              <button>Edit Profile</button>
            </Link>
            <Link to="/shopping">
              <button>My Purchases</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
