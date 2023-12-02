/* eslint-disable react/prop-types */
import { googleSignInFunction ,facebookSignInFunction} from "../../firebase/firebase.config";

const SocialLogin = () => {
  const handleClickGoogle = async () => {
    await googleSignInFunction();
  };
  const handleClickFacebook = async () => {
    await facebookSignInFunction()
  };

  return (
    <div>
      <button onClick={handleClickGoogle}>Sign in with Google</button>
      <button onClick={handleClickFacebook}>Sign in with Facebook</button>
    </div>
  );
};

export default SocialLogin;
