/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
//Firebase
import { useState, useEffect } from "react";
import axios from "axios";
import s from "./login.module.css";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useDispatch, useSelector } from "react-redux";
import { setAccess, userCart, userLoggedIn } from "../../redux/actions/actions";
import Swal from "sweetalert2";
import validate from "./validate";

//const URL = "https://quirkz.up.railway.app";
const URL = "http://localhost:3001";

const Login = ({ cartItems, setToken }) => {
  const [loginInput, setLoginInput] = useState({
    usuario: "",
    contraseña: "",
  });
  const [errors, setErrors] = useState({
    usuario: "",
    contraseña: "",
  });

  const navigate = useNavigate();
  const access = useSelector((state) => state.access);
  const dispatch = useDispatch();

  const mostrarAlerta = (iconType, msjText) => {
    Swal.fire({
      icon: iconType,
      title: "",
      text: msjText,
    });
  };

  const productsId = cartItems?.map((product) => {
    return {
      productId: product.id,
      quantity: product.quantity,
    };
  });

  const formHandler = (event) => {
    setLoginInput({
      ...loginInput,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...loginInput,
        [event.target.name]: event.target.value,
      })
    );
  };
  console.log(errors);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios(`${URL}/user/${loginInput.usuario}`);
      if (response.data.provider === "google") {
        Swal.fire({
          icon: "error",
          title: "",
          text: "The email is already associated with a Google account.",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      const { data } = await axios(
        `${URL}/user/login/?email=${loginInput.usuario}&password=${loginInput.contraseña}`
      );
      const newToken = data.token;
      setToken(newToken);
      localStorage.setItem("token", newToken);
      const itemsArr = {
        email: loginInput.usuario,
        products: productsId,
      };
      await axios.post(`${URL}/cart`, itemsArr);

      Swal.fire({
        icon: "success",
        title: "",
        text: "Updated shopping cart.",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(setAccess(data.access));
      dispatch(userLoggedIn(loginInput.usuario));
      dispatch(userCart(loginInput.usuario));
    } catch (error) {
      mostrarAlerta("error", error.response.data.error);
    }
  };

  useEffect(() => {
    if (access) navigate("/");
  }, [access]);

  console.log(loginInput);

  return (
    <section className={s["login-container"]}>
      <hr />
      <h2>My account</h2>
      <hr />
      <h2>Access</h2>
      <form className={s["login-form"]} onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="User or email"
            name="usuario"
            value={loginInput.usuario}
            onChange={formHandler}
          />
          <div className={s.error__container}>
          {errors.usuario && <p className={s.error}>{errors.usuario}</p>}
          </div>
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="Password"
            name="contraseña"
            value={loginInput.contraseña}
            onChange={formHandler}
          />
          <div className={s.error__container}>
          {errors.contraseña && <p className={s.error}>{errors.contraseña}</p>}
          </div>
        </label>
        <br />
        <br />
        <button type="submit">Access</button>
      </form>
      <br />
      <br />
      <h3 className={s.or__h3}> Or </h3>
      <div>
        <SocialLogin cartItems={cartItems} />
      </div>
    </section>
  );
};

export default Login;
