/* eslint-disable react-hooks/exhaustive-deps */
import s from './MyShopping.module.css'
import { useParams, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import axios from 'axios';
import { useSelector } from 'react-redux';
import { getPurchaseByUser } from '../../redux/actions/actions';


 //const URL = 'http://localhost:3001'
//const URL = "https://quirkz.up.railway.app"

const MyShopping = () => {

  const {email} = useParams();
  const dispatch = useDispatch();
  const purchaseItems = useSelector((state) => state.purchaseByUser)
  const navigate = useNavigate();

  console.log(purchaseItems)

  let myItems = []
  for (let shop of purchaseItems) {
    for (let item of shop.items){
      myItems.push(item)
    }
  }

  console.log(myItems)
  //const purchaseItems = [{id: 1, image: "https://images.asos-media.com/products/hugo-match-it-logo-sliders-in-black/204318769-1-black",
                        //   name: "HUGO Match It logo sliders in black", order: "25034", date: "12-11-2023", total: "$78.00"},
                        // {id: 2, image: "https://images.asos-media.com/products/nike-initiator-sneakers-in-white-and-gray/204917959-1-grey",
                        //   name: "Nike Initiator sneakers in white and gray", order: "32001",date: "20-10-2023", total: "$75.00"}]

  // useEffect 
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
          <div key={product.id} className={s["purchase-items-list"]}>

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