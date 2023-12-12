import s from './footer.module.css';
import FB from '../../assets/FB.ico'
import INS from '../../assets/inst.ico'

const Footer = () => {
  return (
    <div className={s.container}>
        <u>QUIRKZ!</u>
      <ul className={s.links}>
        <li>Company</li>
        <li>Products</li>
        <li>About us</li>
        <li>Officce</li>
        <li>Advertise: consultas@quirkz.com.ar</li>
      
      </ul>
      <div className={s.socialIcons}>
        
        <div className={s.iconContainer}>
           <a><img src={FB} alt='facebook logo' /></a>
        </div>
        <div className={s.iconContainer}>
        <a><img src={INS} alt='facebook logo' /></a>
        </div>
      </div>
      <div className={s.copyright}>
        <hr />
        <p>Copyright © 2023 - All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;