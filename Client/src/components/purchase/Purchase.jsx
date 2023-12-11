/* eslint-disable react/prop-types */
import s from './Purchase.module.css'
//import transporter from '../../functions/sendMails';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const URL = "http://localhost:3001"
//const URL = "https://quirkz.up.railway.app"

const SuccessPayment = ({cartItems}) => {
    const navigate = useNavigate();
   
     //const resPurchase = useSelector((state) => state.purchase)
     const resPurchase = {collector_id: "24324", date_created: "2023-12-10"}
     //const User = useSelector((state) => state.activeUser)

     //console.log(User)
    const User = {name:"Luis", lastname: "Lenis", email: "llenis73@gmail.com"}
    
     const totalPrice = Math.floor(cartItems.reduce((price, item) => price + item.quantity * item.price, 0))
    
     let items = []
     for (let product of cartItems){
        items.push({name:product.name, quantity:product.quantity, price: product.price})
     }
     const purchase = {items: items, totalAmount: totalPrice, order:resPurchase.collector_id, 
                    date: resPurchase.date_created, email:User.email, name: User.name, lastname: User.lastname} ;
     
    
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(purchase)
        await axios.post(`${URL}/history`, purchase);
        
        navigate(`/`);
    };
   
    return (
      <div className={s["purchase-items"]}>
        <h1 className={s["purchase-items-header"]}>Shopping summary: </h1>

        <h2>User</h2>
        <h3>Name: {User.name}&nbsp;{User.lastname} </h3>
        <h3>Email: {User.email}</h3>
        
        <h2>Order: {resPurchase.collector_id} </h2>
        <h3>Date: {resPurchase.date_created} </h3>
        <h3>Total: ${totalPrice}</h3>
        <h3>Currency: COP</h3>
        <h3>Status: Paid</h3>
       
       
        <h2> Items: </h2>
        <div>
          {cartItems.map((product) => (
            <div key={product.id} className={s["purchase-items-list"]}>
                        
              <br />
              <div className={s["purchase-items-quantity"]}>
                <h3>  
                {product.quantity}
                </h3>
            </div>

              <div className={s["purchase-items-name"]}>
                <h2>  
                {product.name}
                </h2>
                </div>
               
             
               <div className={s["purchase-items-price"]}>
              <h3>
               ${product.price}
              </h3>
                </div>
                
            </div>
          ))}

        <button onClick = {handleSubmit}>Finish</button>
        </div>
          * We will be sending information of order to your email
  
      </div>
    );
  };
  
  export default SuccessPayment;