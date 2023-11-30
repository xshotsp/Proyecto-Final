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
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const isEmailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; 
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
   
  const validateField = (name, value) => {
    let fieldError = '';

    if (name === 'email') {
      if (!isEmailValid.test(value)) {
        fieldError = 'Por favor, ingrese un correo electrónico válido.';
      }
      setEmailError(fieldError);
    } else if (name === 'password') {
      if (!isPasswordValid.test(value)) {
        fieldError = 'La contraseña debe contener al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número.';
      }
      setPasswordError(fieldError);
    }
    return fieldError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Campo '${name}' cambió a: ${value}`);
    validateField(name, value);

  if (name === 'email') {
    setEmail(value);
  } else if (name === 'password') {
    setPassword(value);
  }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailFieldError = validateField('email', email);
    const passwordFieldError = validateField('password', password);

    if (emailFieldError || passwordFieldError) {
      return; // No necesitas manejar el error general aquí
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
      setLoginError('Credenciales incorrectas, por favor registrate o valida nuevamente');
    }
    
  }

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
        <Link to={`/createuser`}> <input type="button" value='registrate' /></Link>
    </div>
   </div>
   <div className={style.from_information}>
      <div className={style.infor_childs}>
         <h2>Inicia Sesión</h2>
         <div className={style.icons}>
           <i className={style.bx}><img className={style.bx_fc} src={FB} alt="logoFacebook" /></i>
           <i className={style.bx}><img className={style.bx_gl} src={GL} alt="logoGoogle" /></i>
           <i className={style.bx}><img className={style.bx_in} src={INS} alt="logoInstagram" /></i>
         </div>
         <p>o usa tu email para iniciar sesión</p>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.tamaño}>
        <label>
          <i className={style.bx}><img className={style.bx_email} src={EML} alt='Email' /></i>
          <input
                  type="email"
                  placeholder='Correo Electrónico'
                  name='email'
                  value={email}
                  onChange={handleChange}
                />
        </label>
        </div>
        {emailError && <p className={style.error}>{emailError}</p>}
       <div className={style.tamaño}>
       <label>
          <i className={style.bx}><img className={style.bx_contra} src={pss} alt='contraseña' /></i>
          <input
                  type="password"
                  placeholder='Contraseña'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
        </label>
       </div>
       {passwordError && <p className={style.error}>{passwordError}</p>}
       <div className={style.olvidar}>
          <Link to={``}><p>¿olvidaste tu contraseña?</p></Link>
       </div>
        <input type="submit" value='Iniciar sesión' />
        {loginError && <p className={style.error}>{loginError}</p>}
      </form>
      </div>
    </div>
    </div>
  );
};

export default Login;