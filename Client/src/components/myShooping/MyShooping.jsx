/* eslint-disable react-hooks/exhaustive-deps */
import s from './MyShopping.module.css'
import { useParams, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPurchaseByUser } from '../../redux/actions/actions';
import { v4 as uuidv4 } from 'uuid';


const MyShopping = () => {

  const {email} = useParams();
  const dispatch = useDispatch();
  const purchaseItems = useSelector((state) => state.purchaseByUser)
  const navigate = useNavigate();

 
  let myItems = []
  for (let shop of purchaseItems) {
    for (let item of shop.items){
      myItems.push(item)
    }
  }

 
   useEffect (() => {
     dispatch(getPurchaseByUser(email))
    }, [email])

  const handleReview = (id) => {
    navigate(`/product/${id}`);
  };
 
  return (
    <div className={s["purchase-items"]}>
      <h2 className={s["purchase-items-header"]}>My Shopping: </h2>
      
      {myItems.length === 0 && (
        <div className={s["purchase-items-empty"]}>Make a first buy </div>
      )}

      <div>
        {myItems.map((product) => (
          <div key={uuidv4()} className={s["purchase-items-list"]}>

            <div className={s["purchase-items-date"]}>
            <h3>  
              {product.date}
            </h3>
            </div>
            <div className={s["purchase-items-name"]}>
                <h3>
                  {product.name}
                </h3>          
            </div>
              <div className={s["purchase-items-order"]}>
              <h3>  
              {product.quantity}
              </h3>
              </div>
            
             <div className={s["purchase-items-price"]}>
            <h3>
              {product.price}
            </h3>
              </div>
              <div>
              <button 
              className={s["purchase-items-button"]} 
              onClick ={() =>handleReview(product.id)}
              >Qualify</button>
              </div>
          </div>
        ))}
      </div>
        

    </div>
  );
};

export default MyShopping;