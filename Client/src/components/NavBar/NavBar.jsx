import { Link, useLocation } from "react-router-dom"
import SearchBar from "../searchbar/SearchBar"

const NavBar = () => {
  const {pathname} = useLocation()
  return (
    <div>
      <nav>
        <h1>
        <u>Quirkz!</u>
        </h1>
        <SearchBar/> 
        <ul>
          <Link to="/">
          <li>Tienda</li>
          </Link>

          <Link to="/hombre">
          <li>Hombre</li>
          </Link>
          
          <Link to="/mujer">
          <li>Mujer</li>
          </Link>

          <Link to="/niños">
          <li>Niños</li>
          </Link>
          
          <Link to="/contacto">
          <li>Contacto</li>
          </Link>

          <Link to="/login">
            <li>Mi Cuenta</li>
          </Link>

        </ul>
      </nav>
      <div>

      </div>
    </div>
  )
}

export default NavBar