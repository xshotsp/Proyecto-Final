// Card.jsx
import React from 'react';
import s from './Card.module.css';



//esto es nuevo
const Card = ({product}) => {
  const { name, price, colour, image, id,description } = product;
  return (
    <div className={s.productCard}>
      <img src={`http://${image}`} alt={name} className={s.productImage} />
      <div className={s.productInfo}>
        <h3>{name}</h3>
        <p>Precio: {price}</p>
        <p>Color: {colour}</p>
        <p>Descripción: {description}</p>
      </div>
      </div>
  )
}


export default Card;
