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
import { useSelector, useDispatch } from 'react-redux';
import {toggleDarkMode} from './redux/actions/actions'
import { useEffect, useState } from "react";
import Contact from "./components/Contact/Contact";
import Error404 from "./components/Error/Error404";

import { useState, useEffect } from "react";

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

function App() {
  const [cartItems, setCartItems] = useState([]);
  const darkMode = useSelector(state => state.darkMode); 
  const [isLoggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const body = document.body;
    body.classList.toggle('darkMode', darkMode);
    body.classList.toggle('lightMode', !darkMode);
  }, [darkMode]);

  return (
    <div className='App'>
      <NavBar darkMode={darkMode} setDarkMode={() => dispatch(toggleDarkMode())} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage handleAddProduct={(product) => handleAddProduct(cartItems, setCartItems, product)} />} />
        <Route path="/product/:id" element={<DetailPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />} />
        <Route path="/createuser" element={<CreateUserForm />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/cart"
         element={<Cart
          cartItems={cartItems}
          handleRemoveProduct={handleRemoveProduct}
          handleClearCart={handleClearCart}
          handleAddProduct={handleAddProduct} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
