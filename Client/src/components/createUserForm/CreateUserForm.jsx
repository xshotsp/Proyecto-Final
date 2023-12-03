import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from "./create.module.css";
import FB from '../../assets/facebook.png';
import GL from '../../assets/google.png';
import INS from '../../assets/instagram.png';
import US from '../../assets/usuario.png'
import EML from '../../assets/email.png';
import pss from '../../assets/cerrar-con-llave.png';

const URL = "https://quirkz.up.railway.app"
const CreateUserForm = () => {
  const [notification, setNotification] = useState(null);
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
    profile_picture: "",
    member: "",
  });
  
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userError, setUserError] = useState('');
  const [registeError, setregisteError] = useState('');

  const isEmailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const isUsernameValid = /^[a-zA-Z0-9_]+$/;

  const validateField = (name, value) => {
    let fieldError = '';

    if (name === 'user') {
      if (!isUsernameValid.test(value)) {
        fieldError = 'Por favor, ingrese un nombre de usuario válido (solo letras, números y guiones bajos permitidos).';
      }
      setUserError(fieldError);
    } else if (name === 'email') {
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
  
    // Agrega las llamadas a setUser, setEmail, y setPassword aquí
    if (name === 'user') {
      setUser(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userFieldError = validateField('user', user);
    const emailFieldError = validateField('email', email);
    const passwordFieldError = validateField('password', password);

    if (userFieldError || emailFieldError || passwordFieldError) {
      return;
    }

  const submitHandler = async (event) => {
    event.preventDefault();
    const objetUser = {
      ...input,
      profile_picture: !input.profile_picture ? 'https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg': input.profile_picture
    }
    try {
      const response = await axios.post(`${URL}/user`, objetUser);
      setNotification({
        message: "Usuario creado con éxito",
        status: response.status,

      });

      if (response.ok) {
        console.log('registro exitoso');
        history.push('/');
      }

    } catch (error) {
      console.error('Error al registrase:', error.message);
      setregisteError('Credenciales incorrectas, por favor regístrate o valida nuevamente');
    }
  };


  return (
    <div className={style.container_from}>
      <div className={style.information}>
        <div className={style.info_childs}>
          <h2>Bienvenido</h2>
          <p>
            Para hacer tus compras en nuestra Tienda por favor
            inicia sesión con tus datos
          </p>
          <Link to={`/Login`}><input type="button" value='Iniciar sesión' /></Link>
        </div>
      </div>
      <div className={style.from_information}>
        <div className={style.infor_childs}>
          <h2>Crea una cuenta </h2>
          <div className={style.icons}>
            <i className={style.bx}><img className={style.bx_fc} src={FB} alt="logoFacebook" /></i>
            <i className={style.bx}><img className={style.bx_gl} src={GL} alt="logoGoogle" /></i>
            <i className={style.bx}><img className={style.bx_in} src={INS} alt="logoInstagram" /></i>
          </div>
          <p>o usa tu correo para regisrate</p>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.tamaño}>
              <label>
                <i className={style.bx}><img className={style.bx_user} src={US} alt="usuario" /></i>
                <input
                  type="text"
                  placeholder='Nombre Completo'
                  name='user'
                  value={user}
                  onChange={handleChange}
                />
              </label>
              {userError && <p className={style.error}>{userError}</p>}
            </div>
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
              {emailError && <p className={style.error}>{emailError}</p>}
            </div>
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
              {passwordError && <p className={style.error}>{passwordError}</p>}
            </div>
            <input type="submit" value='registrate' />
            {registeError && <p className={style.error}>{registeError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
  }
};

export default CreateUserForm;

