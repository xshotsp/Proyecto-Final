// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../searchbar/SearchBar';
import styles from './NavBar.module.css';

const NavBar = () => {
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
            <li>
              Contacto
            </li>
          </Link>
            <Link to="/createuser">
            <li>
              Registrarse
            </li> 
          </Link>
          <Link to="/login">
            <li>
              <FontAwesomeIcon icon={faUser} />
            </li>
            </Link>
          <Link to="/cart">
            <li>
              <FontAwesomeIcon icon={faShoppingCart} />
            </li>
          </Link>
        </ul>
      </nav>
      <div>
        
      </div>
    </div>
  );
}

export default NavBar;
