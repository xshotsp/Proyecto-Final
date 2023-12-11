import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import CreateUserForm from "./components/createUserForm/CreateUserForm";
import HomePage from "./components/HomePage/HomePage";
import FormPage from "./components/formpage/FormPage";
import Login from "./components/Login/Login";
import DetailPage from "./components/detailpage/DetailPage";
import Cart from "./components/Cart/Cart";
import EditPerfilForm from "./components/editPerfilForm/EditPerfilForm";
import EditProductForm from "./components/editProduct/EditProduct";
import MyShopping from "./components/myShooping/MyShooping";
import { useSelector, useDispatch } from "react-redux";
import {
  setAccess,
  toggleDarkMode,
  userCart,
  userLoggedIn,
} from "./redux/actions/actions";
import { useEffect, useState } from "react";
import Contact from "./components/Contact/Contact";
import Error404 from "./components/Error/Error404";
import { auth } from "./firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import Dashboard from "./components/Dashboard/Dashboard";
import axios from "axios";

const URL = "http://localhost:3001";

function App() {
  const darkMode = useSelector((state) => state.darkMode);
  const access = useSelector((state) => state.access);
  const activeUser = useSelector((state) => state.activeUser);
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);
  const dispatch = useDispatch();
  const { pathname } = useLocation();


  useEffect(() => {
    if (!access)localStorage.setItem("cart", JSON.stringify(cartItems));

  }, [cartItems]);

  const handleAddProduct = async (product) => {
    if (access) {
      const objProduct = {
        email: activeUser.email,
        products: {
          productId: product.id,
          quantity: 1,
        },
      };
      const response = await axios.post(`${URL}/cart`, objProduct);
      console.log(response)
      if (pathname === "/") {
        Swal.fire({
          icon: "success",
          title: "",
          text: "sumado al carrito ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      dispatch(userCart(activeUser.email));
    } else {
      const ProductExist = cartItems.find((item) => item.id === product.id);
      if (ProductExist) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
      if (pathname === "/") {
        Swal.fire({
          icon: "success",
          title: "",
          text: "sumado al carrito ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleRemoveProduct = async (product) => {
    if (access) {
      const objProduct = {
        email: activeUser.email,
        productId: product.id,
      };
      await axios.put(`${URL}/cart`, objProduct);
      dispatch(userCart(activeUser.email));
    } else {
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
    }
  };

  const handleClearCart = async () => {
    if (access) {
      await axios.delete(`${URL}/cart/${activeUser.email}`);
      dispatch(userCart(activeUser.email));
    }
    setCartItems([]);
    Swal.fire({
      icon: "success",
      title: "",
      text: "Carrito Borrado.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user !== null) {
        dispatch(setAccess(true));
        dispatch(userLoggedIn(user.email));
        dispatch(userCart(user.email))
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
        <Route path="/login" element={<Login cartItems={cartItems} />} />
        <Route path="/createuser" element={<CreateUserForm />} />
        <Route path="/editperfil/:email" element= {<EditPerfilForm />} />
        <Route path="/editproduct/:id" element= {<EditProductForm />} />
        <Route path="/shopping" element = {<MyShopping />} />
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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
