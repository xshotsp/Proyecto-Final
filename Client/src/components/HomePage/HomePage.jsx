import { useDispatch, useSelector } from 'react-redux';
import Hero from "../Hero/Hero";
import ProductList from "../ProductList/ProductList";
import Filters from "../Filters/Filters";
import { useEffect, useState } from 'react';
import { getAllSelects } from '../../redux/actions/actions';
import s from './home.module.css';

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInitialFilters({ ...initialFilters, [name]: value });
    dispatch(getFilters(initialFilters));
  };

  return (
    <div>
      <div>
      <Hero />
      </div>
      <div className={s.filtersContainer}>
        <Filters
          name="colour"
          options={colourOpt}
          onChange={handleChange}
          state={null}
        />
        <Filters
          name="brand"
          options={brandOpt}
          onChange={handleChange}
          state={null}
        />
        <Filters
          className="filters"
          name="price"
          onChange={handleChange}
          options={PriceOpt}
          state={null}
        />
      </div>
      
      <ProductList />
    </div>
  );
};

export default HomePage;
