//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import style from "./login.module.css";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import EML from '../../assets/email.png';
import pss from '../../assets/cerrar-con-llave.png';


const URL="https://quirkz.up.railway.app"
const Login = ({ setLogin, login }) => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState();
  const darkMode = useSelector((state) => state.darkMode);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios(
        `${URL}/user/login/?email=${usuario}&password=${contraseña}`
      );
      setLogin(response.data);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError("Credenciales incorrectas");
    }
  };

  const handleRegistroClick = () => {
    navigate('/createuser');
  };


  useEffect(() => {
    if (login.access) navigate("/");
  }, [login.access]);

  return (
    <div className={`${style.container_from} ${darkMode ? style.darkMode : style.lightMode}`}>
      <div className={`${style.information} ${darkMode ? style.darkMode : style.lightMode}`}>
        <div className={style.info_childs}>
          <h2 className={darkMode ? style.darkMode : style.lightMode}>Bienvenido</h2>
          <p>
            ¡Bienvenido a nuestra tienda en línea! 🛍️ Descubre una experiencia de compra única y exclusiva. Regístrate
            ahora para acceder a ofertas especiales, descuentos personalizados y recibir las últimas novedades antes que
            nadie. ¡No te pierdas la oportunidad de ser parte de nuestra comunidad de compradores felices! Regístrate hoy
            y deja que la moda y la conveniencia lleguen directamente a tu puerta. ¡Únete a nosotros y haz que cada
            compra sea una experiencia inolvidable! 💻📦
          </p>
            <input type="button" value="registrate" onClick={handleRegistroClick} />
        </div>
      </div>
      <div className={style.from_information}>
        <div className={style.infor_childs}>
          <h2>Inicia Sesión</h2>
          <div className={style.icons}>
          <div>
            <SocialLogin/>
          </div>
          </div>
      <form className={`${style.form} ${darkMode ? style.darkMode : style.lightMode}`}  onSubmit={handleSubmit}>
        <label>
        <i className={style.bx}>
          <img className={style.bx_email} src={EML} alt="Email" />
        </i>
          <input
            type="text"
            placeholder="Usuario o correo  "
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </label>
        <label>
        <i className={style.bx}>
          <img className={style.bx_contra} src={pss} alt="contraseña" />
        </i>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </label>
        <input type="submit" value="Iniciar sesión" />
      </form>
      {error && <p>{error}</p>} 
      </div>
      </div>
    </div>
  );
};

export default Login;