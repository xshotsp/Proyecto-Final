import { useDispatch, useSelector } from 'react-redux'
import Hero from "../Hero/Hero";
import ProductList from "../ProductList/ProductList";
import Filters from "../Filters/Filters";
import { useEffect, useState } from 'react';

import { getAllSelects, getFilters } from '../../redux/actions/actions';
import s from "./home.module.css"



const HomePage = ({ handleAddProduct}) => {

const dispatch = useDispatch();

const [initialFilters,setInitialFilters] = useState({})

const selects = useSelector((state) => state.selectFilter);
const colourOpt = selects?.colour;
const brandOpt = selects?.brand;
const PriceOpt = ['mayor a menor', 'menor a mayor'];

 useEffect (() => {
    dispatch (getAllSelects())
    dispatch (getFilters(initialFilters))
}, [dispatch, initialFilters])



const handleChange = (event) => {
  const { name, value } = event.target;
  setInitialFilters({ ...initialFilters, [name]: value });
  dispatch(getFilters(initialFilters));
 }


 const handleFilterRemove = (filterName) => {
  const newInitialFilters = { ...initialFilters };
  delete newInitialFilters[filterName];
  setInitialFilters(newInitialFilters);
  dispatch(getFilters(newInitialFilters));
};


  return (
    <div>
      <div>
        <Hero />
      </div>
      <div className={s.filtersContainer}>
        <Filters
          name="colour"
          ticket="color"
          options={colourOpt}
          handleChange={handleChange}    
          state={null}
        />
        <Filters
          name="brand"
          ticket="marca"
          options={brandOpt}
          handleChange={handleChange}
          state={null}
        />
         <Filters
          name="price"
          ticket="ordenar por precio"
          handleChange={handleChange}
          options={PriceOpt}
          state={null}
        />
        <div>
         <button className={s.filtersContainer} 
          onClick={() => {
            dispatch (getAllSelects())
            dispatch(getFilters({}));
            setInitialFilters({});
          }}
        >
          Reinicio
        </button>
        </div>
        <div>
        {initialFilters?.colour && (
          <div onClick={() => handleFilterRemove('colour')}>
            {`x ${initialFilters.colour}`}
          </div>
        )}
        {initialFilters?.brand && (
          <div onClick={() => handleFilterRemove('brand')}>
            {`x ${initialFilters.brand}`}
          </div>
        )}
        {initialFilters?.price && (
          <div onClick={() => handleFilterRemove('price')}>
            {`x ${initialFilters.price}`}
          </div>
        )}
      </div>
      
      </div>
      <ProductList handleAddProduct={handleAddProduct} />
    </div>
  );
};

export default HomePage;
