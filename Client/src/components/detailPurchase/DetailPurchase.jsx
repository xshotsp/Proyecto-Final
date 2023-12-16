/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect } from "react";
import { useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPurchases } from "../../redux/actions/actions";
/* import { Link } from "react-router-dom"; */




const DetailPurchase = () => {

    const {id} = useParams()
 
  const dispatch = useDispatch();
  const allpurchases = useSelector((state) => state.allPurchases);
  const purchase = allpurchases[id-1];

  console.log(purchase)

  useEffect(() => {
    dispatch(getAllPurchases());
  }, []);


return (
    <div>
      <h2>Purchase</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ITEM</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {purchase.items.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailPurchase;