import s from './footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className={s.container}>
        <u>QUIRKZ!</u>
      <ul className={s.links}>
        <li>Empresa</li>
        <li>Productos</li>
        <li>Acerca De</li>
        <li>Oficinas</li>
        <li>Consultas:</li>
        <li>consultas@quirkz.com.ar</li>
      </ul>
      <div className={s.socialIcons}>
        
        <div className={s.iconContainer}>
          <FontAwesomeIcon icon={faFacebook} />
        </div>
        <div className={s.iconContainer}>
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </div>
      <div className={s.copyright}>
        <hr />
        <p>Copyright © 2023 - Todos Los Derechos Reservados</p>
      </div>
    </div>
  );
}

export default Footer;