import React from 'react';

const Cart = ({ cartItems , handleAddProduct, handleRemoveProduct, handleClearCart }) => {

  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0)


  return (
    <div className={s["cart-items"]}>
      <h2 className={s["cart-items-header"]}>Productos en el carrito: </h2>
      <div className={s["clear-cart"]}>
        {cartItems.length >= 1 && (
          <button className={s["clear-cart-button"]} onClick={handleClearCart}>Limpiar carrito</button>
        )}
      </div>

      {cartItems.length === 0 && (
        <div className={s["cart-items-empty"]}>Tu carrito esta vacio! ?? </div>
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
        Precio total: ${totalPrice}
        </h2>
        </div>
        <div>
          <br />
          <button
          disabled={totalPrice ? false : true}
          >
            Completar compra
          </button>
        </div>
          <br />
      </div>
    </div>
  );
};

export default Cart;