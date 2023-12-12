/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Hero from "../Hero/Hero";
import ProductList from "../ProductList/ProductList";
import Filters from "../Filters/Filters";
import { useEffect, useState } from "react";

import { getAllSelects, getFilters } from "../../redux/actions/actions";
import s from "./home.module.css";

const HomePage = ({ handleAddProduct }) => {
  const dispatch = useDispatch();

  const [initialFilters, setInitialFilters] = useState({});
  const darkMode = useSelector((state) => state.darkMode);

  const selects = useSelector((state) => state.selectFilter);
  const colourOpt = selects?.colour;
  const brandOpt = selects?.brand;
  const PriceOpt = ["Highest", "Lowest"];

  useEffect(() => {
    dispatch(getAllSelects());
    dispatch(getFilters(initialFilters));
  }, [dispatch, initialFilters]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInitialFilters({ ...initialFilters, [name]: value });
    dispatch(getFilters(initialFilters));
  };

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
          ticket="Colour"
          options={colourOpt}
          handleChange={handleChange}
          state={null}
        />
        <Filters
          name="brand"
          ticket="Brand"
          options={brandOpt}
          handleChange={handleChange}
          state={null}
        />
        <Filters
          name="price"
          ticket="Price"
          handleChange={handleChange}
          options={PriceOpt}
          state={null}
        />
        <div>
          <button
            className={`${s.reset__button} ${darkMode && s.darkMode}`}
            onClick={() => {
              dispatch(getAllSelects());
              dispatch(getFilters({}));
              setInitialFilters({});
            }}
          >
            Restart
          </button>
        </div>
        <div>
          {initialFilters?.colour && (
            <div onClick={() => handleFilterRemove("colour")} className={s.remove}>
              {`x ${initialFilters.colour}`}
            </div>
          )}
          {initialFilters?.brand && (
            <div onClick={() => handleFilterRemove("brand")}className={s.remove}>
              {`x ${initialFilters.brand}`}
            </div>
          )}
          {initialFilters?.price && (
            <div onClick={() => handleFilterRemove("price")}className={s.remove}>
              {`x ${initialFilters.price}`}
            </div>
          )}
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default HomePage;

//   return (
//     <div>
//       <div>
//       <Hero />
//       </div>
//       <div className={s.filtersContainer}>
//         <Filters
//           name="colour"
//           options={colourOpt}
//           handleChange={handleChange}    
//           state={null}
//         />
//         <Filters
//           name="brand"
//           options={brandOpt}
//           handleChange={handleChange}
//           state={null}
//         />
//         <Filters
//           className="filters"
//           name="price"
//           handleChange={handleChange}
//           options={PriceOpt}
//           state={null}
//         />
//       </div>
      
//       <ProductList />
//     </div>
//   );
// };

//export default HomePage;
