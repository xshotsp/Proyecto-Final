import GL from '../../assets/google.png';
import GL2 from '../../assets/google2.png';
import FB from '../../assets/facebook.png';
import FB2 from '../../assets/facebook2.png';
import style from './SocialLogin.module.css';
import {
  googleSignInFunction,
  facebookSignInFunction,
} from "../../firebase/firebase.config";

const SocialLogin = () => {
  const handleClickGoogle = async () => {
    const message = await googleSignInFunction();
    console.log(message);
  };
  const handleClickFacebook = async () => {
    const message = await facebookSignInFunction();
    console.log(message);
  };

  return (
    <div className={style.buttonContainer}>
    <i className={style.btn} onClick={handleClickGoogle}>
      <img src={GL2} alt="Google" />
    </i>
    <i className={style.btn} onClick={handleClickFacebook}>
      <img src={FB2} alt="Facebook" />
    </i>
  </div>
  );
};

export default SocialLogin;
