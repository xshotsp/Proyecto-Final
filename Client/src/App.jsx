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
import { useState } from "react";

function App() {

  const [cartItems, setCartItems] = useState([]);

  const handleAddProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if(ProductExist){
      setCartItems(cartItems.map((item) => item.id === product.id 
      ? {...ProductExist, quantity: ProductExist.quantity + 1}
      : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if(ProductExist.quantity === 1){
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) => item.id === product.id 
        ? {...ProductExist, quantity: ProductExist.quantity - 1} 
        : item
        )
      );
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  }

  return (
    <div className="App">
      <NavBar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<HomePage
        handleAddProduct={handleAddProduct} />} />
        <Route path="/product/:id" element={<DetailPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<CreateUserForm />} />
        <Route path="/cart"
         element={<Cart
          cartItems={cartItems}
          handleRemoveProduct={handleRemoveProduct}
          handleClearCart={handleClearCart}
          handleAddProduct={handleAddProduct} />}
          />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

//cambio