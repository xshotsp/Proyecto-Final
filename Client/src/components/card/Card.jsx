import React from 'react';
import s from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  const { name, price, colour, image, id } = product;

  return (
    <Link to={`/product/${id}`} className={s.productCard}>
      {image && (
        <img src={image}alt={name}/>
      )}
      <h3>{name}</h3>
      <p>Precio: {`$${price}`}</p>
      <p>Color: {colour}</p>
    </Link>
  );
};

export default Card;
