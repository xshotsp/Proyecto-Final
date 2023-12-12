// ProductsTable.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GET_ALL_PRODUCTS } from "../../redux/actions/actionTypes";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://quirkz.up.railway.app/product/all-products");
        dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
        setProductData(response.data);
      } catch (error) {
        console.error("Error getting products:", error.message);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
