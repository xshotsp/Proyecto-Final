import "./App.css";

<<<<<<< HEAD
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import HomePage from './components/Home/HomePage';
import FormPage from './components/formpage/FormPage';
import Login from './components/Login/Login';
import ProductDetail from './components/detailpage/DetailPage'
=======
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./Components/Home/HomePage";
import Footer from "./Components/Footer/Footer";
import CreateUserForm from "./components/createUserForm/CreateUserForm";
>>>>>>> 2dbfa6df2285cb6d72b6904566ccc71f1f9bda32

function App() {
  const {pathname} = useLocation();
  return (
    <div className="App">
      {pathname === "/" || pathname === "/createuser" ? null : <NavBar />}
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<HomePage />} />
        <Route path="/detalle/:id" component={ProductDetail} />
        <Route path='/form' element={<FormPage />} />
        <Route path='/login' element={<Login />} />
=======
        <Route path="/" element={<HomePage />} />
        <Route path="/createuser" element={<CreateUserForm />} />
>>>>>>> 2dbfa6df2285cb6d72b6904566ccc71f1f9bda32
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
