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

const Login = ({setLogin, login}) => {
  const [usuario, setUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [error, setError] = useState()
  const navigate = useNavigate()

  const clientIdGoogle = import.meta.env.VITE_CLIENT_ID_GOOGLE;
  const clientIdFb = import.meta.env.VITE_FB_APP_ID;

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      const response = await axios('http://localhost:3001/user/login', {
        usuario,
        contraseña,
      });
      if(response.ok) console.log('Login correcto');

    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setError('Credenciales incorrectas')
    }
  };

  const onSuccessGoogle = async (response) => {
    const userObject = {
      access: true,
      email: response.profileObj.email,
      photo: response.profileObj.imageUrl,
      username: response.profileObj.name,
    };
    try {
      const { data } = await axios.get(
        `http://localhost:3001/user/${userObject.email}`
      );

      if (data) {
        console.log("Ya existe");
        setLogin({
          access: true,
          email: data.email,
          photo: data.profile_picture,
        });
      } else {
        const respuesta = await axios.post(`http://localhost:3001/user`, {
          email: userObject.email,
          profile_picture: userObject.photo,
          password: 123456,
          username: userObject.username,
        });

        setLogin({
          access: true,
          email: respuesta.data.email,
          photo: respuesta.data.profile_picture,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud GET:", error);
    }
  };

  const onFailureGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = async (response) => {
    const { data } = await axios.get(
      `http://localhost:3001/user/${response.email}`
    );

    if (data) {
      setLogin({
        access: true,
        email: data.email,
        photo: data.profile_picture,
      });
    }else {
      const respuesta = await axios.post(`http://localhost:3001/user`, {
        email: response.email,
        profile_picture: response.picture.data.url,
        password: 123456,
        username: response.name,
      });

      setLogin({
        access: true,
        email: respuesta.data.email,
        photo: respuesta.data.profile_picture,
      });
    }

    const userObject = {
      access: true,
      email: response.email,
      photo: response.picture.data.url,
    };
    setLogin(userObject);
  };

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
          onSuccess={onSuccessGoogle}
          onFailure={onFailureGoogle}
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