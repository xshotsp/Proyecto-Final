import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPurchases } from "../../redux/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
/* import s from "./PurchaseTable.module.css"; */




const PurchaseTable = () => {
  const dispatch = useDispatch();
  const allpurchases = useSelector((state) => state.allPurchases);

  console.log(allpurchases)

  useEffect(() => {
    dispatch(getAllPurchases());
  }, []);

  

  return (
    <div /* className={s["purchasetable-items"]} */>
      <h2 /* className={s["purchasetable-items-header"]} */>Purchases</h2>
      <table>
        <thead>
          <tr>
            <th /* className={s["purchasetable-items-price"]} */>ID</th>
            <th /* className={s["purchasetable-items-order"] }*/>ORDER</th>
            <th /* className={s["purchasetable-items-date"]} */>Date</th>
            <th /* className={s["purchasetable-items-price"]} */>Total</th>
            <th /* className={s["purchasetable-items-name"]} */>User</th>
          </tr>
        </thead>
        <tbody>
          {allpurchases.map((product) => (
            <tr key={product.id}>
              <td /* className={s["purchasetable-items-price"]} */>{product.id}</td>
              <td /* className={s["purchasetable-items-order"] }*/>{product.order}</td>
              <td /* className={s["purchasetable-items-date"]} */>{product.date}</td>
              <td /* className={s["purchasetable-items-price"]} */>${product.totalAmount}</td>
              <td /* className={s["purchasetable-items-name"]} */>{product.userEmail}</td>
              <td>
                <Link to={`/purchase/${product.id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTable;