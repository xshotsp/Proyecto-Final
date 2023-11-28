import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  modifyQuantity,
} from '../../redux/actions/actions';

const Cart = ({ productsInCart, addToCart, removeFromCart, modifyQuantity }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (product) => {
    addToCart(product, quantity);
    setQuantity(1); // Reset quantity to 1 after adding to the cart
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product.id);
  };

  const handleModifyQuantity = (product) => {
    modifyQuantity(product.id, quantity);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {productsInCart.length === 0 ? (
        <p>Aun no tienes productos en el carrito.</p>
      ) : (
        <div id="cart">
          {productsInCart.map((product) => (
            <div key={product.id} className="card">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              {/* Buttons to modify the cart */}
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <button onClick={() => handleRemoveFromCart(product)}>Remove from Cart</button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              />
              <button onClick={() => handleModifyQuantity(product)}>
                Modify Quantity
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  productsInCart: state.productsInCart,
});

// Map actions to component props
const mapDispatchToProps = (dispatch) => ({
  addToCart: (product, quantity) => dispatch(addToCart(product, quantity)),
  removeFromCart: (productId) => dispatch(removeFromCart(productId)),
  modifyQuantity: (productId, newQuantity) => dispatch(modifyQuantity(productId, newQuantity)),
});

// Connect the component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
