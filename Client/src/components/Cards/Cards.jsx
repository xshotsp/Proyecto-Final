import { useEffect, useState } from 'react';
import { getAllProducts } from '../../redux/actions/actions';  

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { name, imageUrl, price, colour } = product;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <h3>{name}</h3>
      <p>Precio: {price}</p>
      <p>Color: {colour}</p>
    </div>
  );
};

export default ProductList;
