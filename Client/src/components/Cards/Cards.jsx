import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../redux/actions/actions';
import Pagination from '../pagination/Pagination';
import s from './cards.module.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startIndex = (currentPage - 1) * 3;
        const endIndex = startIndex + 3;
        const productsData = await getAllProducts();
        setProducts(productsData.slice(startIndex, endIndex));
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <div className={s.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={products.length}
        pageSize={3}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { name, imageUrl, price, colour } = product;

  return (
    <div className={s.productCard}>
      <img src={imageUrl} alt={name} className={s.productImage} width="100" height="100" />
      <h3>{name}</h3>
      <p>Precio: {price}</p>
      <p>Color: {colour}</p>
    </div>
  );
};

export default ProductList;
