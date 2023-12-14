// Contact.js
import React from 'react';
import { useSelector } from 'react-redux';
import s from './Contact.module.css';

const Contact = () => {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`${s.container} ${darkMode && s.darkMode}`}>
      <h1 className={s.chau}>Contact us!</h1>

      <div className={s.formGroup}>
        <label htmlFor="name">Name *</label>
        <input type="text" id="name" />
      </div>

      <div className={s.formGroup}>
        <label htmlFor="email">Email *</label>
        <input type="text" id="email" />
      </div>

      <div className={s.formGroup}>
        <label htmlFor="message">Message *</label>
        <textarea id="message" placeholder="Send us your message here!" rows="5" />
      </div>

      <button className={s.btnE}>Send</button>

      <div className={s.infoSection}>
        <h2>Our information</h2>

        <div className={s.infoItem}>
          <h4>You can find us at</h4>
          <p>Av. Quirkz 3322, Córdoba, Argentina</p>
        </div>

        <div className={s.infoItem}>
          <h2>
            <strong>Phone</strong>
          </h2>
          <p>4653 2312</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
