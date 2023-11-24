/* eslint-disable react/prop-types */
// ProductList.jsx
import  { useEffect, useState } from 'react';
import { getAllProducts } from '../../redux/actions/actions';
import s from './ProductList.module.css';
import Card from '../card/Card';
import Pagination from '../pagination/Pagination';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 5;

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  const currentCards = products.slice(firstCardIndex, lastCardIndex);

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
      <div className={s.productList}>
        {currentCards.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <Pagination
      filteredCountries={products}
      cardsPerPage={cardsPerPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}/>
    </div>
  );
};


export default ProductList;