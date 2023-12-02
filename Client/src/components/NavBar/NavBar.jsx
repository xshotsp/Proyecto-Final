/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// NavBar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../searchbar/SearchBar";
import styles from "./navbar.module.css";


  const handleLogout = () => {
    setLogin({
      access: false,
      email: "",
      photo: "",
    });

    setShowOptions(false);
    navigate("/");
  };
const NavBar = ({ cartItems }) => {
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
              Registrarse
            </li> 
          </Link>
          
          <Link to="/cart" className={styles.cart}>
            <li>
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className={styles.nav_cart_length}>
                {cartItems.length === 0 ? "" : cartItems.length}
              </span>
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