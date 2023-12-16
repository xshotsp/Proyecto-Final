import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions/actions";
import s from "./ProductList.module.css";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const ProductList = ({ handleAddProduct }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allproducts);
  const darkMode = useSelector((state) => state.darkMode);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const productsActive = [...products].filter((p) => p.active === true);
  const currentCards = productsActive.slice(firstCardIndex, lastCardIndex);

  useEffect(() => {
    if (products.length === 0) dispatch(getAllProducts());
    setCurrentPage(1);
  }, [products]);

  return (
    <div>
{!productsActive.length && (
        <h2 className={`${s.titulo} ${darkMode && s.darkMode} `}>
          {"No products found matching your search."}
        </h2>
      )}

{productsActive.length ? (
        <h1 className={`${s.titulo} ${darkMode && s.darkMode} `}>
          Product List
        </h1>
      ) : (
        ""
      )}

      {productsActive.length ? (
        <div className={`${s.productList} ${darkMode && s.darkMode}`}>
          {currentCards.map((product) => (
            <Card
              key={product.id}
              product={product}
              handleAddProduct={handleAddProduct}
            />
          ))}
        </div>
      ) : (
        ""
      )}

      <Pagination
        filteredProducts={productsActive} //cambio
        cardsPerPage={cardsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductList;