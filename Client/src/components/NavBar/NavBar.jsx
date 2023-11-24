import { Link } from "react-router-dom"
import SearchBar from "../searchbar/SearchBar"
import styles from "./NavBar.module.css"

const NavBar = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h1 className={styles.nav__h1}>
        <u>Quirkz!</u>
        </h1>
        <SearchBar/> 
        <ul className={styles.nav__ul}>
          <Link to="/">
          <li>Tienda</li>
          </Link>
          
          <Link to="/contacto">
          <li>Contacto</li>
          </Link>

          <Link to="/login">
            <li>Mi Cuenta</li>
          </Link>
          <Link to="/createuser">
            <li>Registrarse</li>
          </Link>

        </ul>
      </nav>
      <div>

      </div>
    </div>
  )
}

export default NavBar