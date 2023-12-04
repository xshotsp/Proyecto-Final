import React from 'react';
import s from './Card.module.css';
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

const Card = ({ product, handleAddProduct }) => {

  const { id, name, price, colour, image } = product;
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`${s.productCard} ${darkMode ? s.darkMode : s.lightMode}`}>
      {image && (
        <img src={image}alt={name}/>
      )}
      <Link to={`/product/${id}`}><h3>{name}</h3></Link>
      <div className={s.propiedades}>
      <p>Precio: {`$${price}`}</p>
      <p>Color: {colour}</p>
      </div>
      <button
       className={`${s.productAddButton} ${darkMode ? s.darkMode : s.lightMode}`} 
       onClick={() => handleAddProduct(product)}>Añadir al carrito</button>
    </div>
  );
};

export default Card;
