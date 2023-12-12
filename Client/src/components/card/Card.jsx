/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import s from "./Card.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ product, handleAddProduct }) => {
  const { id, name, price, colour, image } = product;
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`${s.productCard} ${darkMode ? s.darkMode : s.lightMode}`}>
      {image && <img src={image} alt={name} className={s.productImage} />}
      <Link to={`/product/${id}`}>
        <h3 className={s.namecard}>{name}</h3>
      </Link>
      <div className={s.propiedades}>
        <p>Price: {`$${price}`}</p>
        <p>Colour: {colour}</p>
      </div>
      <button
        className={`${s.productAddButton} ${
          darkMode ? s.darkMode : s.lightMode
        }`}
        onClick={() => handleAddProduct(product)}
      >
        Add to shopping cart
      </button>
    </div>
  );
};

export default Card;
