/* eslint-disable react/prop-types */
import {
  googleSignInFunction,
/*   facebookSignInFunction, */
} from "../../firebase/firebase.config";
import s from "./SocialLogin.module.css"

const SocialLogin = () => {
  const handleClickGoogle = async () => {
    const message = await googleSignInFunction();
    console.log(message);
  };
/*   const handleClickFacebook = async () => {
    const message = await facebookSignInFunction();
    console.log(message);
  }; */

  return (
    <div>
      <button onClick={handleClickGoogle} className={s.btn}>Sign in with Google</button>
{/*       <button onClick={handleClickFacebook}>Sign in with Facebook</button> */}
    </div>
  );
};

export default SocialLogin;
