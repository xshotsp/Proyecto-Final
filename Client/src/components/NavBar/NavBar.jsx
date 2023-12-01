// NavBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser,faAddressBook,faListCheck,faMoon,faSun } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../searchbar/SearchBar';
import styles from './navbar.module.css';

const NavBar = () => {
  const [activePage, setActivePage] = useState(''); 
  const [darkMode, setDarkMode] = useState(false);

  const handleMouseEnter = (page) => {
    setActivePage(page);
  };

  const handleMouseLeave = () => {
    setActivePage('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : styles.lightMode}`}>
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
            onMouseEnter={() => handleMouseEnter('contacto')}
            onMouseLeave={handleMouseLeave}
          >
            <li className={activePage === 'contacto' ? styles.active : ''}>
              <FontAwesomeIcon icon={faAddressBook} />
              {activePage === 'contacto' && <span>Contacto</span>}
            </li>
          </Link>
          <Link
            to="/createuser"
            onMouseEnter={() => handleMouseEnter('createuser')}
            onMouseLeave={handleMouseLeave}
          >
            <li className={activePage === 'createuser' ? styles.active : ''}>
              <FontAwesomeIcon icon={faListCheck} />
              {activePage === 'createuser' && <span>registrarse</span>}
            </li>
          </Link>
          <Link
            to="/login"
            onMouseEnter={() => handleMouseEnter('login')}
            onMouseLeave={handleMouseLeave}
          >
            <li className={activePage === 'login' ? styles.active : ''}>
              <FontAwesomeIcon icon={faUser} />
              {activePage === 'login' && <span>Login</span>}
            </li>
          </Link>
          <Link
            to="/cart"
            onMouseEnter={() => handleMouseEnter('cart')}
            onMouseLeave={handleMouseLeave}
          >
            <li className={activePage === 'cart' ? styles.active : ''}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {activePage === 'cart' && <span>Carrito</span>}
            </li>
          </Link>
        </ul>
        <div className={styles.darkModeToggle} onClick={toggleDarkMode}>
        <FontAwesomeIcon
          icon={darkMode ? faSun : faMoon}
          className={styles.darkModeIcon}
        />
      </div>
      </nav>
    </div>
  );
};

export default NavBar;