import SearchBar from "../searchbar/SearchBar"

const NavBar = () => {

  return (
    <div>
      <nav>
        <h1>Quirkz!</h1>
        <SearchBar/> 
        <ul>
          <li>Shop</li>
          <li>Men</li>
          <li>Women</li>
          <li>Kids</li>
        </ul>
      </nav>
      <div>

      </div>
    </div>
  )
}

export default NavBar