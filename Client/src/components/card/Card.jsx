// Card.jsx
import React from 'react';
import s from './Card.module.css';

const Card = ({ product }) => {
  const { name, imageUrl, price, colour, description } = product;

const Card = ({product}) => {
  const { name, price, colour, image, id } = product;
  return (
    <div className={s.productCard}>
      <img src={imageUrl} alt={name} className={s.productImage} />
      <div className={s.productInfo}>
        <h3>{name}</h3>
        <p>Precio: {price}</p>
        <p>Color: {colour}</p>
        <p>Descripción: {description}</p>
      </div>
    <div className={s.productCard}>        
      {image && <img src={`https://${image}`} alt={name} className={s.productImage} />}
      <Link to={`/product/${id}`}> <h3>{name}</h3></Link>
      <p>Precio: {price}</p>
      <p>Color: {colour}</p>
    </div>
  );
}

export default Card;
