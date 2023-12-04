import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import validate from './validate';
import { useSelector } from 'react-redux';
import SocialLogin from "../SocialLogin/SocialLogin";
import { useNavigate } from "react-router-dom";
import EML from '../../assets/email.png';
import pss from '../../assets/cerrar-con-llave.png';
import style from './create.module.css';

const URL = 'https://quirkz.up.railway.app';

const CreateUserForm = () => {

  const darkMode = useSelector((state) => state.darkMode);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: '',
    password: '',
    passwordRep: '',
    email: '',
    profile_picture: 'https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg',
    member: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    passwordRep: '',
    email: '',
  });

  const mostrarAlerta = (iconType, msjText) => {
    Swal.fire({
      icon: iconType,
      title: '',
      text: msjText,
    });
  };

  const formHandler = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const long = Object.values(errors);
      if (long.length === 0) {
        await axios.post(`${URL}/user`, input);
        mostrarAlerta('success', 'El usuario se creó de manera exitosa');
        setInput({
          username: '',
          password: '',
          passwordRep: '',
          email: '',
          profile_picture: '',
          member: '',
        });
      } else mostrarAlerta('error', 'Debe llenar todos los campos sin errores');
    } catch (error) {
      console.log(error);
      mostrarAlerta('error', error.response.data);
    }
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={`${style.container_from} ${darkMode ? style.darkMode : style.lightMode}`}>
    <div className={`${style.information} ${darkMode ? style.darkMode : style.lightMode}`}>
      <div className={style.info_childs}>
        <h2 className={darkMode ? style.darkMode : style.lightMode}>Bienvenido</h2>
        <p>
          Para poder comprar en nuestra tienda, disfrutar de nuestro descuentos 
          y ofertas inicia sesión
        </p>
          <input type="button" value="Inicia Sesión" onClick={handleLoginClick}/>
      </div>
    </div>
    <div className={style.from_information}>
      <div className={style.infor_childs}>
        <h2>Registrate</h2>
        <div className={style.icons}>
        <div>
            <SocialLogin/>
          </div>
        </div>
        <p>o usa tu email y registrate</p>
      <form className={`${style.form} ${darkMode ? style.darkMode : style.lightMode}`} onSubmit={submitHandler}>
          <label>
          <i className={style.bx}>
          <img className={style.bx_email} src={EML} alt="Email" />
          </i>
           <input
            placeholder ="Email"
            type="text"
            name="email"
            value={input.email}
            onChange={formHandler}
            />
            <span className={style.required}>*</span>
          </label>
         
          {errors.email && <p>{errors.email}</p>}
           
           <label>
           <i className={style.bx}>
             <img className={style.bx_contra} src={pss} alt="contraseña" />
           </i>
           <input
            placeholder ="Ingrese su contraseña"
            type="password"
            name="password"
            value={input.password}
            onChange={formHandler}
          />
          <span className={style.required}>*</span>
           </label>

           <label>
           <i className={style.bx}>
             <img className={style.bx_contra} src={pss} alt="contraseña" />
           </i>
           <input
            placeholder ="Confirmación Contraseña"
            type="password"
            name="passwordRep"
            value={input.passwordRep}
            onChange={formHandler}
          />
          <span className={style.required}>*</span>
           </label>
          {errors.password && <p>{errors.password}</p>}
          
          {errors.passwordRep && <p>{errors.passwordRep}</p>}
          <input type="submit" value="registrarse" />
      </form>
      <span className={style.aviso}>los campos con el * son Obligatorios</span>
      
    </div>
    </div>
  </div>
  );
};

export default CreateUserForm;


