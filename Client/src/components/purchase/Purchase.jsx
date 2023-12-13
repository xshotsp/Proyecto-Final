/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cleanUserCart } from "../../redux/actions/actions";
import s from "./Purchase.module.css";

const URL = import.meta.env.VITE_URL;

const SuccessPayment = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);
  const User = useSelector((state) => state.activeUser);

  const [purchaseResponse, setPurchaseResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const getCollectionId = (search) => {
    const params = search.split("&");

    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      const [key, value] = param.split("=");
      if (key === "?collection_id") {
        return value;
      }
    }
    return null;
  };

  const collector_Id = getCollectionId(search);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const totalPrice = Math.floor(
    userCart.reduce((price, item) => price + item.quantity * item.price, 0)
  );

  let items = [];
  for (let product of userCart) {
    items.push({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      date: formattedDate,
    });
  }

  const purchase = {
    items: items,
    totalAmount: totalPrice,
    order: collector_Id,
    date: formattedDate,
    email: User.email,
    name: User.name,
    lastname: User.lastname,
  };

  useEffect(() => {
    const sendPurchase = async () => {
      try {
        const response = await axios.post(`${URL}/history`, purchase);
        setPurchaseResponse(response.data);

        // Limpiar el carrito de usuario
        const cartIds = userCart.map((item) => item.id);
        const objCartItems = {
          email: User.email,
          productsId: cartIds,
        };

        await axios.delete(`${URL}/cart`, {
          data: objCartItems,
        });

        dispatch(cleanUserCart());
      } catch (error) {
        console.error("Error al realizar la solicitud POST:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loading && userCart.length > 0) {
      sendPurchase();
    }
  }, [userCart]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    navigate(`/`);
  };

  if (loading) {
    return (
      <div className={s.loading_container}>
        <div className={s.loading_spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className={s["purchase-items"]}>
      <h1 className={s["purchase-items-header"]}>Shopping summary: </h1>
      <h2>User</h2>
      <h3>{User.name && `Name: ${User.name} ${User.lastname}`} </h3>
      <h3>Email: {User.email}</h3>
      <h2>Order: {purchaseResponse?.order} </h2>
      <h3>Date: {purchaseResponse?.date} </h3>
      <h3>Total: ${purchaseResponse?.totalAmount}</h3>
      <h3>Currency: COP</h3>
      <h3>Status: Paid</h3>
      <h2> Items: </h2>
      <div>
        {purchaseResponse &&
          purchaseResponse.items.map((product) => (
            <div key={product.id} className={s["purchase-items-list"]}>
              <br />
              <div className={s["purchase-items-quantity"]}>
                <h3>{product.quantity}</h3>
              </div>

              <div className={s["purchase-items-name"]}>
                <h2>{product.name}</h2>
              </div>

              <div className={s["purchase-items-price"]}>
                <h3>${product.price}</h3>
              </div>
            </div>
          ))}

        <button onClick={handleSubmit}>Finish</button>
      </div>
      * We will be sending information of order to your email
    </div>
  );
};

export default SuccessPayment;
