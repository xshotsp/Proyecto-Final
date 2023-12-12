/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
//Firebase
import { useState, useEffect } from "react";
import axios from "axios";
import s from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useDispatch, useSelector } from "react-redux";
import { setAccess, userCart, userLoggedIn } from "../../redux/actions/actions";
import Swal from "sweetalert2";

//const URL = "https://quirkz.up.railway.app"; 
const URL = "http://localhost:3001";

const Login = ({ cartItems }) => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios(
        `${URL}/user/login/?email=${usuario}&password=${contraseña}`
      );
      const itemsArr = {
        email: usuario,
        products: productsId,
      };
      await axios.post(`${URL}/cart`, itemsArr);

      Swal.fire({
        icon: "success",
        title: "",
        text: "Carrito actualizado.",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(setAccess(data.access));
      dispatch(userLoggedIn(usuario));
      dispatch(userCart(usuario))
    } catch (error) {
      mostrarAlerta("error", error.response.data.error);
    }
  };

  useEffect(() => {
    if (access) navigate("/");
  }, [access]);

  return (
    <section className={s["login-container"]}>
      <hr />
      <h2>Mi Cuenta</h2>
      <hr />
      <h2>Acceder</h2>
      <form className={s["login-form"]} onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Nombre de usuario o correo electrónico"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Acceder</button>
        <p>¿No tienes una cuenta? <Link to='/createuser'>¡Registrate Aquí!</Link></p>
      </form>
      <h3 className={s.or__h3}> O </h3>
      <div>
        <SocialLogin cartItems={cartItems} />
      </div>
    </section>
  );
};

export default Login;
