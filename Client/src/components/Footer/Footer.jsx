import s from './footer.module.css';
import FB from '../../assets/FB.ico'
import INS from '../../assets/inst.ico'

const Footer = () => {
  return (
    <div className={s.container}>
        <u>QUIRKZ!</u>
      <ul className={s.links}>
        <div>
        <h2>Company</h2>
        <hr />
        <br />
        <li>About Us</li>
        <br />
        <li>Contacts</li>
        <br />
        <li>Stores</li>
        </div>  
        <div>
        <h2>Support</h2>
        <hr />
        <br />
        <li>Help</li>
        <br />
        <li>Delivery</li>
        <br />
        <li>Refunds</li>
        <br />
        <li>Returns</li>
        <br />
        <div>
        </div>
        </div>
        <ul>
          <u>
            
        <h2>Contacts</h2>
          </u>

        <p>+4 2321 5432</p>
        <br />
        <div className={s.iconContainer}>
        <a href='https://www.facebook.com/profile.php?id=61554580442585' target='_blank'rel='noreferrer'><img src={FB} alt='facebook logo' /></a>
        <a href='https://www.instagram.com/quirkzshop/' target='_blank'rel='noreferrer'><img src={INS} alt='facebook logo' /></a>

        </div>
        <div className={s.iconContainer}>
        <div className={s.socialIcons}>
        </div>
        </div>
        </ul>
      </ul>
      <div className={s.copyright}>
        <hr />
        <p>Copyright © 2023 - All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;