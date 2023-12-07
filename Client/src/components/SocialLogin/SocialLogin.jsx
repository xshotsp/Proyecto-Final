/* eslint-disable react/prop-types */
import axios from "axios";
import {
  googleSignInFunction,
  /*   facebookSignInFunction, */
} from "../../firebase/firebase.config";
import s from "./SocialLogin.module.css";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../redux/actions/actions";

const URL = "http://localhost:3001";

const SocialLogin = () => {
  const dispatch = useDispatch();

  const handleClickGoogle = async () => {
    const user = await googleSignInFunction();
    dispatch(userLoggedIn(user.email));
    const { data } = await axios(`${URL}/user/${user.email}`);
    if (data === null) {
      const provider = user.providerData[0].providerId.split(".")[0];
      const userObject = {
        email: user.email,
        username: user.displayName,
        profile_picture: user.photoURL,
        provider 
      };
      await axios.post(`${URL}/user`, userObject);
    }
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
