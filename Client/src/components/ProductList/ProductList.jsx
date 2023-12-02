/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// ProductList.jsx

import { useEffect , useState} from 'react';

import { useSelector, useDispatch} from 'react-redux';
import { getAllProducts, getProducts } from '../../redux/actions/actions';
import s from './ProductList.module.css';
import Card from '../card/Card';
import Pagination from '../pagination/Pagination';
//import data from '../data/data';

const ProductList = ({ handleAddProduct }) => {
  
  const dispatch = useDispatch()
  const products = useSelector ((state) => state.allproducts)
  
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = products.slice(firstCardIndex, lastCardIndex);

  // useEffect(() => {
  //    dispatch(getAllProducts());
  //    setCurrentPage(1)
  // }, [dispatch]);

  useEffect(() => {
    if(data.length === 0) dispatch(getProducts());
    setCurrentPage(1)
 }, []);

  return (
    <div>
      {
      (data[0]?.message) && <h2>{data[0].message}</h2>
      }
      
      {
       (data[0]?.name) && <h1>Lista de Productos</h1>
      }
      
      {
        (data[0]?.name) &&
      
      <div className={s.productList}>
        {/* {products.map((product) => ( */}
        {currentCards.map((product) => (
          <Card key={product.id} product={product} handleAddProduct={handleAddProduct} />
        ))}
      </div>
      }

  

      <Pagination
      filteredProducts={products} //cambio
      cardsPerPage={cardsPerPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}/>
    </div>
  );
};

export default ProductList;