/* eslint-disable react/prop-types */
// ProductList.jsx
import { useEffect , useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllProducts } from '../../redux/actions/actions';
import s from './ProductList.module.css';
import Card from '../card/Card';
import Pagination from '../pagination/Pagination';

const ProductList = () => {
<<<<<<< HEAD
=======

>>>>>>> e7391359abe52e5236547ac925762f9a04b59369
  
  const products = useSelector ((state) => state.allproducts)
  const dispatch = useDispatch()

<<<<<<< HEAD
  useEffect(() => {
    
    dispatch(getAllProducts());
  }, [dispatch]);

   

=======
  
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 5;

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  const currentCards = products.slice(firstCardIndex, lastCardIndex);


  useEffect(() => {
    
     dispatch(getAllProducts());
  }, [dispatch]);

  
>>>>>>> e7391359abe52e5236547ac925762f9a04b59369
  return (
    <div>
      {
      (products[0]?.message) && <h2>{products[0].message}</h2>
      }
      
      {
       (products[0]?.name) && <h1>Lista de Productos</h1>
      }
      
      {
        (products[0]?.name) &&
      
      <div className={s.productList}>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      }

  

      <Pagination
      filteredCountries={products}
      cardsPerPage={cardsPerPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}/>
    </div>
  );
};

export default ProductList;
