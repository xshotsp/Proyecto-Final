import "./App.css";

import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import HomePage from './components/Home/HomePage';
import FormPage from './components/formpage/FormPage';
import Login from './components/Login/Login';
import ProductDetail from './components/detailpage/DetailPage'

function App() {
  const {pathname} = useLocation();
  return (
    <div className="App">
      {pathname === "/" || pathname === "/createuser" ? null : <NavBar />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/detalle/:id" component={ProductDetail} />
        <Route path='/form' element={<FormPage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
