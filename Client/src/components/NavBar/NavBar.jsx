/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// NavBar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../searchbar/SearchBar";
import styles from "./navbar.module.css";
import {signOutFunction} from "../../firebase/firebase.config"

const NavBar = ({ login, setLogin }) => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogin({
      access: false,
      email: "",
      photo: "",
    });

    signOutFunction()

    setShowOptions(false);
    navigate("/");
  };

  
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link to="/">
          <h1 className={styles.nav__h1}>
            <u>QUIRKZ</u>
          </h1>
        </Link>
        <SearchBar expanded={true} />
        <ul className={styles.nav__ul}>
          <Link to="/contacto">
            <li>Contacto</li>
          </Link>

          {!login.access && (
            <Link to="/login">
              <li>
                <FontAwesomeIcon icon={faUser} />
              </li>
            </Link>
          )}

          {!login.access && (
            <Link to="/createuser">
              <li>Registrarse</li>
            </Link>
          )}

          <Link to="/cart">
            <li>
              <FontAwesomeIcon icon={faShoppingCart} />
            </li>
          </Link>

          <img
            src={login.photo}
            alt=""
            onClick={() => setShowOptions(!showOptions)}
          />
        </ul>

        {showOptions && (
          <div className={styles.options}>
            <p>{login.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;