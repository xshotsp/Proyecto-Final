/* eslint-disable react/prop-types */
import s from './Cart.module.css'
import { useNavigate } from 'react-router-dom';
//import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';


//const URL = 'http://localhost:3001'
const URL = "https://quirkz.up.railway.app"

const Cart = ({  cartItems , handleAddProduct, handleRemoveProduct, handleClearCart }) => {
  const access = useSelector((state) => state.access)

  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0)

   
  const navigate = useNavigate();

  const mercadoPago = async () => {
    console.log('entre al finishPurchase');
    if (access === false) {
      const Toast = Swal.mixin({
        toast: 'true',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        title: 'Primero debes iniciar sesion',
      });

      navigate('/login');
    } else {
      const response = await axios.post(`${URL}/purchase`, cartItems);
      window.location.href = response.data.init_point;
    
    }
  };


  return (
    <div className={s["cart-items"]}>
      <h2 className={s["cart-items-header"]}>Products in the shopping cart: </h2>
      <div className={s["clear-cart"]}>
        {cartItems.length >= 1 && (
          <button className={s["clear-cart-button"]} onClick={handleClearCart}>Clear shopping cart</button>
        )}
      </div>

      {cartItems.length === 0 && (
        <div className={s["cart-items-empty"]}>Empty shopping cart! ?? </div>
      )}

      <div>
        {cartItems.map((product) => (
          <div key={product.id} className={s["cart-items-list"]}>
            <img className={s["cart-items-img"]}
              src={product.image}
              alt={product.name} 
            />
            <br />
            <div className={s["cart-items-name"]}>
              <h2>  
              {product.name}
              </h2>
              </div>
            <div className={s["cart-items-function"]}>
              <button 
              className={s["cart-items-add"]} 
              onClick={() => handleAddProduct(product)}
              >+</button>

              <button className={s["cart-items-remove"]}
              onClick={() => handleRemoveProduct(product)}
              >-</button>
            </div>
             <div className={s["cart-items-price"]}>
              {product.quantity} * ${product.price}
              </div>
          </div>
        ))}
      </div>
        
      <div className={s["cart-items-total-price-name"]}>
        <br />
        <div className={s["cart-items-total-price"]}> 
        <h2>
        Total price: ${totalPrice}
        </h2>
        </div>
        <div>
          <br />
          <button className={s.btncart}
          disabled={totalPrice ? false : true}
          onClick = {mercadoPago}
          >
            Complete purchase
          </button>
        </div>
          <br />
      </div>
    </div>
  );
};

export default Cart;