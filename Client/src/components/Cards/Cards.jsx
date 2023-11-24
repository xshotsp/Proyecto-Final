import Pagination from '../pagination/Pagination';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../redux/actions/actions';
import s from './cards.module.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startIndex = (currentPage - 1) * 18;
        const endIndex = startIndex + 18;
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
      <div className={s.product-list}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={products.length}  
        pageSize={18}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default ProductList;
