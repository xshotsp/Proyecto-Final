/* eslint-disable react/prop-types */
// Cart.js
import React from 'react';
import s from './Cart.module.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { finishPurchase } from '../../redux/actions/actions';

const Cart = ({
  cartItems,
  handleAddProduct,
  handleRemoveProduct,
  handleClearCart,
}) => {
  const access = useSelector((state) => state.access);
  const userCart = useSelector((state) => state.userCart);
  const allproducts = useSelector((state) => state.allproducts);
  const darkMode = useSelector((state) => state.darkMode);

  const totalPrice = (access ? userCart : cartItems).reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  const priceToFixed = totalPrice.toFixed(2);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mercadoPago = async () => {
    if (access === false) {
      const Toast = Swal.mixin({
        toast: true,
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
        title: 'You must first log in',
      });

      navigate('/login');
    } else {
      dispatch(finishPurchase(userCart));
    }
  };

  return (
    <div className={`${s.container} ${darkMode && s.darkMode}`}>
      <h2 className={s['cart-items-header']}>
        Products in the shopping cart: {userCart?.length}
      </h2>
      <div className={s['clear-cart']}>
        {(access ? userCart.length : cartItems.length) >= 1 && (
          <button className={s['clear-cart-button']} onClick={handleClearCart}>
            Clear shopping cart
          </button>
        )}
      </div>

      {(access ? userCart.length : cartItems.length) === 0 && (
        <div className={s['cart-items-empty']}>Empty shopping cart! ?? </div>
      )}

      <div>
        {(access ? userCart : cartItems).map((product) => (
          <div key={product.id} className={s['cart-item']}>
            <img
              className={s['cart-items-img']}
              src={product.image}
              alt={product.name}
            />
            <div className={s['cart-item-details']}>
              <div className={s['cart-item-name']}>
                <h2>{product.name}</h2>
              </div>
              <div className={s['cart-item-function']}>
                <button
                  className={s['cart-item-function-button']}
                  onClick={() => handleAddProduct(product)}
                >
                  +
                </button>
                <button
                  className={s['cart-item-function-button']}
                  onClick={() => handleRemoveProduct(product)}
                >
                  -
                </button>
              </div>

              <div className={s['cart-item-price']}>
                {product.quantity} * ${product.price}
              </div>
              <div className={s['stock']}>
                {allproducts.map((item) => {
                  if (item.id === product.id) {
                    return <div key={item.id}>Stock: {item.quantity}</div>;
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={s['cart-items-total-price-name']}>
        <br />
        <div className={s['cart-items-total-price']}>
          <h2> Total price: ${priceToFixed}</h2>
        </div>
        <div className={s['cart-items-complete-purchase']}>
          <br />
          <button
            disabled={priceToFixed ? false : true}
            onClick={mercadoPago}
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
