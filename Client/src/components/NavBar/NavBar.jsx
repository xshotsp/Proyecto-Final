import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import s from "./navbar.module.css"; // Asegúrate de importar tus estilos CSS

const NavBar = () => {
  return (
    <div>
      <nav className={s.navBar}>
        <h1>
          <u>Quirkz!</u>
        </h1>
        <SearchBar />
        <ul className={s.navList}>
          <li>
            <Link to="/">Tienda</Link>
          </li>
          <li>
            <Link to="/hombre">Hombre</Link>
          </li>
          <li>
            <Link to="/mujer">Mujer</Link>
          </li>
          <li>
            <Link to="/niños">Niños</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <Link to="/login">Mi Cuenta</Link>
          </li>
        </ul>
      </nav>
      <div></div>
    </div>
  );
};

export default NavBar;
