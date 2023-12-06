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
import { useSelector, useDispatch } from "react-redux";
import { setAccess, toggleDarkMode, userLoggedIn } from "./redux/actions/actions";
import { useEffect, useState } from "react";
import Contact from "./components/Contact/Contact";
import Error404 from "./components/Error/Error404";
import DashboardGraphics from "./components/DashboardGraphics/DashboardGraphics";
import { auth } from "./firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const darkMode = useSelector((state) => state.darkMode);
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddProduct = (product) => {
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

  onAuthStateChanged(auth, async (user) => {
    if (user !== null) {
      dispatch(setAccess(true))
      dispatch(userLoggedIn(user.email)); 
    }
  }); 


  return (
    <div className={darkMode && "div__darkMode"}>
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
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route path="/createuser" element={<CreateUserForm />} />
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
        <Route path="dashboard" element={<DashboardGraphics />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
