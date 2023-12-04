//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useState, useEffect } from "react";
import axios from "axios";
import s from "./login.module.css";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";


const URL="https://quirkz.up.railway.app"
const Login = ({ setLogin, login }) => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      const response = await axios(
        `${URL}/user/login/?email=${usuario}&password=${contraseña}`
      );
      setLogin(response.data);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setError('Credenciales incorrectas')
    }
  };

  useEffect(() => {
    if (login.access) navigate("/");
  }, [login.access]);

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
      {error && <p>{error}</p>}
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