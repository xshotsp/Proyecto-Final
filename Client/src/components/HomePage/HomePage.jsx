import { useDispatch, useSelector } from 'react-redux';
import Hero from "../Hero/Hero";
import ProductList from "../ProductList/ProductList";
import Filters from "../Filters/Filters";
import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { getAllSelects } from '../../redux/actions/actions';
import s from './home.module.css';
=======

import { getAllSelects, getFilters } from '../../redux/actions/actions';
import s from "./home.module.css"


>>>>>>> c6188f362889618f01a2dc5f3d9df4d48c12d2dc

const HomePage = () => {
  const dispatch = useDispatch();

  const [initialFilters, setInitialFilters] = useState({});

  const selects = useSelector((state) => state.selectFilter);
  const colourOpt = selects?.colour;
  const brandOpt = selects?.brand;
  const PriceOpt = ['highest', 'lowest'];

  useEffect(() => {
    dispatch(getAllSelects());
    // dispatch(getFilter(initialFilters))
  }, []);

<<<<<<< HEAD
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInitialFilters({ ...initialFilters, [name]: value });
    dispatch(getFilters(initialFilters));
  };
=======
 useEffect (() => {
    dispatch (getAllSelects())
    dispatch (getFilters(initialFilters))
}, [dispatch, initialFilters])



const handleChange = (event) => {
  const { name, value } = event.target;
  setInitialFilters({ ...initialFilters, [name]: value });
  dispatch(getFilters(initialFilters));
 }
>>>>>>> c6188f362889618f01a2dc5f3d9df4d48c12d2dc


 const handleFilterRemove = (filterName) => {
  const newInitialFilters = { ...initialFilters };
  delete newInitialFilters[filterName];
  setInitialFilters(newInitialFilters);
  dispatch(getFilters(newInitialFilters));
};


  return (
    <div>
      <div>
<<<<<<< HEAD
      <Hero />
=======
        <Hero />
>>>>>>> c6188f362889618f01a2dc5f3d9df4d48c12d2dc
      </div>
      <div className={s.filtersContainer}>
        <Filters
          name="colour"
          options={colourOpt}
          handleChange={handleChange}    
          state={null}
        />
        <Filters
          name="brand"
          options={brandOpt}
          handleChange={handleChange}
          state={null}
        />
<<<<<<< HEAD
        <Filters
          className="filters"
=======
         <Filters
>>>>>>> c6188f362889618f01a2dc5f3d9df4d48c12d2dc
          name="price"
          handleChange={handleChange}
          options={PriceOpt}
          state={null}
        />
<<<<<<< HEAD
      </div>
      
=======
         <button
          onClick={() => {
            dispatch (getAllSelects())
            dispatch(getFilters({}));
            setInitialFilters({});
          }}
        >
          Reset
        </button>
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
>>>>>>> c6188f362889618f01a2dc5f3d9df4d48c12d2dc
      <ProductList />
    </div>
  );
};

export default HomePage;
