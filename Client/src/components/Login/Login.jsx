/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import s from "./login.module.css";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState();
  const [access,setAccess] = useState(false)
  const navigate = useNavigate();


  const clientID = import.meta.env.VITE_CLIENT_ID_GOOGLE;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios(`http://localhost:3001/user/login/?email=${usuario}&password=${contraseña}`);
      setAccess(response.data)
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError("Credenciales incorrectas");
    }
  };



  const onSuccess = (response) => {
    const userObject = {
      email: response.profileObj.email,
      name: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
    };
    if (userObject.name && userObject.email && userObject.lastName) {
      navigate("/");
    }
  };

  const onFailure = (response) => {
    console.log(response);
  };

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    if(access) navigate("/");

    gapi.load("client:auth2", start);
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
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_policy"}
          className={s.google__button}
        />
      </div>
    </section>
  );
};

export default Login;
