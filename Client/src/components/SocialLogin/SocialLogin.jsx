/* eslint-disable react/prop-types */
import axios from "axios";
import {
  googleSignInFunction,
  /*   facebookSignInFunction, */
} from "../../firebase/firebase.config";
import s from "./SocialLogin.module.css";
import { useDispatch } from "react-redux";
import { userCart, userLoggedIn } from "../../redux/actions/actions";
import Swal from "sweetalert2";

const URL = "quirkz.up.railway.app";

const SocialLogin = ({ cartItems }) => {
  const dispatch = useDispatch();

  const productsId = cartItems?.map((product) => {
    return {
      productId: product.id,
      quantity: product.quantity,
    };
  });

  const handleClickGoogle = async () => {
    const user = await googleSignInFunction();
    const { data } = await axios(`${URL}/user/${user.email}`);
    if (data === null) {
      const provider =  await user.providerData[0].providerId.split(".")[0];
      const userObject = {
        email: user.email,
        username: user.displayName,
        profile_picture: user.photoURL,
        provider,
      };
      const userResponse = await axios.post(`${URL}/user`, userObject);
      dispatch(userLoggedIn(userResponse.data))
    }

    const itemsArr = {
      email: user.email,
      products: productsId,
    };
    await axios.post(`${URL}/cart`, itemsArr);
    dispatch(userCart(user.email))

    Swal.fire({
      icon: "success",
      title: "",
      text: "Carrito actualizado.",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(userLoggedIn(user.email));
  };

  /*   const handleClickFacebook = async () => {
    const message = await facebookSignInFunction();
    console.log(message);
  }; */

  return (
    <div>
      <button onClick={handleClickGoogle} className={s.btn}>
        Sign in with Google
      </button>
      {/*       <button onClick={handleClickFacebook}>Sign in with Facebook</button> */}
    </div>
  );
};

export default SocialLogin;
