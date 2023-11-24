/* eslint-disable react/prop-types */
import s from "./Card.module.css"

const Card = ({product}) => {
  const { name, price, colour, image } = product;
  return (
    <div className={s.productCard}>
      {image && <img src={`https://${image}`} alt={name} className={s.productImage} />}
      <h3>{name}</h3>
      <p>Precio: {price}</p>
      <p>Color: {colour}</p>
    </div>
  );
}

export default Card