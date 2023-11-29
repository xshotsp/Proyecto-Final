/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import s from "./login.module.css";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";

const Login = ({ setLogin, login }) => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const clientIdGoogle = import.meta.env.VITE_CLIENT_ID_GOOGLE;
  const clientIdFb = import.meta.env.VITE_FB_APP_ID

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios(
        `http://localhost:3001/user/login/?email=${usuario}&password=${contraseña}`
      );
      setLogin(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError("Credenciales incorrectas");
    }
  };

  const onSuccess = (response) => {
    const userObject = {
      access: true,
      email: response.profileObj.email,
      photo: response.profileObj.imageUrl,
    };
    setLogin(userObject);
  };

  const onFailure = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
    console.log(response);

    const userObject = {
      access: true,
      email: response.email,
      photo: response.picture.data.url,
    };
    setLogin(userObject);

  }


  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientIdGoogle,
      });
    };
    if (login.access) navigate("/");

    gapi.load("client:auth2", start);
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
        <GoogleLogin
          clientId={clientIdGoogle}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_policy"}
          className={s.google__button}
        />
        <FacebookLogin
          appId={clientIdFb}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </div>
    </section>
  );
};

export default Login;
