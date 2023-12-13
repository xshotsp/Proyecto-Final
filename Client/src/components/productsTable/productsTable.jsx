// ProductsTable.jsx
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllProducts } from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import s from "./productsTable.module.css"

const URL = import.meta.env.VITE_URL;

const ProductsTable = () => {
  const dispatch = useDispatch();
  const allproducts = useSelector((state) => state.allproducts);


  const updateHandler = async (id) => {
    await axios.put(`${URL}/product/restore/${id}`);
    dispatch(getAllProducts())
  };


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
          {allproducts.map((product) => (
            <tr key={product.id} className={!product.active && s.disabled}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <Link to={`/editproduct/${product.id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </td>
              <td>
                <button onClick={() => updateHandler(product.id)}>
                  <FontAwesomeIcon icon={product.active ? faBan: faCheck} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
