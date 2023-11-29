/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import style from "./login.module.css";
import FB from '../../assets/facebook.png';
import GL from '../../assets/buscar.png';
import INS from '../../assets/instagram.png';
import EML from '../../assets/email.png';
import pss from '../../assets/cerrar-con-llave.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isEmailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; 
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid.test(email)) {
      setError('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    if (!isPasswordValid.test(password)) {
      setError('La contraseña debe contener al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        email,
        password,
      });

      if (response.ok) {
        console.log('Login correcto');
        <Link to={`/`}/>
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className={style.container_from}>
      <div className={style.information}>
    <div className={style.info_childs}>
      <h2>Bienvenido</h2>
        
       <p>¡Bienvenido a nuestra tienda en línea! 🛍️ Descubre una experiencia de compra única y exclusiva. 
        Regístrate ahora para acceder a ofertas especiales, descuentos personalizados y recibir las últimas novedades antes que nadie. 
        ¡No te pierdas la oportunidad de ser parte de nuestra comunidad de compradores felices! 
        Regístrate hoy y deja que la moda y la conveniencia lleguen directamente a tu puerta. 
        ¡Únete a nosotros y haz que cada compra sea una experiencia inolvidable! 💻📦</p>
        <Link to={`/createuser`}><input type="button" value='Registrate' /></Link>
    </div>
   </div>
      <div className={style.from_information}>
        <div className={style.infor_childs}>
          <h2>inicia sesión </h2>
          <div className={style.icons}>
            <i className={style.bx}><img className={style.bx_fc} src={FB} alt="logoFacebook" /></i>
            <i className={style.bx}><img className={style.bx_gl} src={GL} alt="logoGoogle" /></i>
            <i className={style.bx}><img className={style.bx_in} src={INS} alt="logoInstagram" /></i>
          </div>
          <p>o usa tu correo para ingresar</p>
          <form className={style.form} onSubmit={handleSubmit}>
            <label>
              <i className={style.bx}><img className={style.bx_email} src={EML} alt='Email' /></i>
              <input
                type="email"
                placeholder='Correo Electronico'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
              {error && !isEmailValid.test(email) && <p className={style.error}>{error}</p>}
            <label>
              <i className={style.bx}><img className={style.bx_contra} src={pss} alt='contraseña' /></i>
              <input
                type="password"
                placeholder='contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {error && !isPasswordValid.test(password) && <p className={style.error}>{error}</p>}
            <input type="submit" value='Iniciar sesión' />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
