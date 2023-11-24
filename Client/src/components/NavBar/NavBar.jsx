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

          {
            pathname === "/" && <Link to="/createuser">
          <button>Registrarse</button></Link>
          }
          
        </ul>
      </nav>
      <div>

      </div>
    </div>
  )
}

export default NavBar