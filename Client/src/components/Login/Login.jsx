/* eslint-disable react/prop-types */
//Firebase
import { useState, useEffect } from "react";
import axios from "axios";
import s from "./login.module.css";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useDispatch, useSelector } from "react-redux";
import { setAccess, userLoggedIn } from "../../redux/actions/actions";
import Swal from "sweetalert2";

/* const URL = "https://quirkz.up.railway.app"; */
const URL = "http://localhost:3001";

const Login = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios(
        `${URL}/user/login/?email=${usuario}&password=${contraseña}`
      );
      dispatch(setAccess(data.access));
      dispatch(userLoggedIn(usuario));
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
      </form>
      <br />
      <br />
      <h3 className={s.or__h3}> O </h3>
      <div>
        <SocialLogin />
      </div>
    </section>
  );
};

export default Login;
