/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import s from "./login.module.css"

const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [error, setError] = useState()

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

  return (
<section className={s['login-container']}>
      <hr />
      <h2>Mi Cuenta</h2>
      <hr />
      <h2>Acceder</h2>
      <form className={s['login-form']} onSubmit={handleSubmit}>
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
    </section>
  );
};

export default Login;