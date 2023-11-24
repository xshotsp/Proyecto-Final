/* eslint-disable react/prop-types */
// ProductList.jsx
import  { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllProducts } from '../../redux/actions/actions';
import s from './ProductList.module.css';
import Card from '../card/Card';

const ProductList = () => {
  //const [products, setProducts] = useState([]);
  const products = useSelector ((state) => state.allproducts)
  const dispatch = useDispatch()

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const productsData = await getAllProducts();
    //     //setProducts(productsData);
    //   } catch (error) {
    //     console.error('Error al obtener productos:', error);
    //   }
    // };

    // fetchData();
    dispatch(getAllProducts());
  }, [dispatch]);

  if (products[0]?.name) console.log ('hola')
  else console.log('adios')
  
  console.log(products)
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

  
    </div>
  );
};


export default ProductList;