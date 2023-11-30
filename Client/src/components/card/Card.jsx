import React from 'react';
import s from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = ({ product, handleAddProduct }) => {

  const { name, price, colour, image, id } = product;

  return (
    <div className={s.productCard}>
      {image && (
        <img src={image}alt={name}/>
      )}
      <Link to={`/product/:id`}><h3>{name}</h3></Link>
      <div className={s.propiedades}>
      <p>Precio: {`$${price}`}</p>
      <p>Color: {colour}</p>
      </div>
      <button
       className={s.productAddButton} 
       onClick={() => handleAddProduct(product)}>Añadir al carrito</button>
    </div>
  );
};

export default Card;
