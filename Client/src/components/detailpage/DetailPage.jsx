
const DetailPage = ({ product }) => {
  const { name, imageUrl, price, colour, description } = product;
  return (
    <div>
    <h1>{name}</h1>
    <img src={imageUrl} alt={name} className="product-image" />
    <p>Precio: {price}</p>
    <p>Color: {colour}</p>
    <p>Descripción: {description}</p>
  </div>
  )
}

export default DetailPage