import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import CreateUserForm from "./components/createUserForm/CreateUserForm";
import HomePage from "./components/HomePage/HomePage";
import FormPage from "./components/formpage/FormPage";
import Login from "./components/Login/Login";
import DetailPage from "./components/detailpage/DetailPage";
import Cart from "./components/Cart/Cart";
import EditPerfilForm from "./components/editPerfilForm/EditPerfilForm";
import { useSelector, useDispatch } from "react-redux";
import {
  setAccess,
  toggleDarkMode,
  userLoggedIn,
} from "./redux/actions/actions";
import { useEffect, useState } from "react";
import Contact from "./components/Contact/Contact";
import Error404 from "./components/Error/Error404";
import { auth } from "./firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2';
import Dashboard from "./components/Dashboard/Dashboard";
import axios from "axios";

const URL = "http://localhost:3001";

function App() {
  const darkMode = useSelector((state) => state.darkMode);
  const access = useSelector((state) => state.access);
  const activeUser = useSelector((state)=>state.activeUser)
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddProduct =async (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
            : item
        )
      );
       if(access){
        const objProduct = {
          userEmail:activeUser.email,
          productId:product.id,
          quantity: 1
        }
/*         const response = await axios.post(`${URL}/add-to-cart`,objProduct) */
        console.log(objProduct)

      } 
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    Swal.fire({
      icon: 'success',
      title: '',
      text: 'sumado al carrito ',
      showConfirmButton: false,
      timer: 1500
    })
  };

  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user !== null) {
        dispatch(setAccess(true));
        dispatch(userLoggedIn(user.email));
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
  

  return (
    <div className={darkMode ? "div__darkMode" : ""}>
      <NavBar
        darkMode={darkMode}
        setDarkMode={() => dispatch(toggleDarkMode())}
        cartItems={cartItems}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              handleAddProduct={handleAddProduct}
              cartItems={cartItems}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<DetailPage handleAddProduct={handleAddProduct} />}
        />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<CreateUserForm />} />
        <Route path="/editperfil/:email" element= {<EditPerfilForm />} />
        <Route path="*" element={<Error404 />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              handleRemoveProduct={handleRemoveProduct}
              handleClearCart={handleClearCart}
              handleAddProduct={handleAddProduct}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
