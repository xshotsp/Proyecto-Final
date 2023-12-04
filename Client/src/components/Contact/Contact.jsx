// Contact.js

import s from './Contact.module.css';

const Contact = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Contáctanos!</h1>

      <p className={s.label}>Nombre *</p>
      <input type="text" className={s.input} />

      <p className={s.label}>Email *</p>
      <label htmlFor="email" className={s.inputLabel}>
        <input type="text" className={s.input} />
      </label>

      <br />

      <p className={s.label}>
        <label htmlFor="text" className={s.textareaLabel}>
          Mensaje *
        </label>
      </p>

      <textarea
        name="txtarea"
        id="txt"
        cols="40"
        rows="10"
        placeholder="Escribenos tu mensaje aqui!"
        className={s.textarea}
      />

      <br />

      <button className={s.button}>Enviar</button>

      <br />

      <h2 className={s.subtitle}>Nuestros datos</h2>

      <br />

      <span>
        <h4 className={s.subtitle}>Puedes encontrarnos en</h4>
        <p className={s.address}>Av. Quirkz 3322, Córdoba, Argentina</p>
      </span>

      <h2 className={s.subtitle}>
        <strong>Teléfono</strong>: 4653 2312
      </h2>
    </div>
  );
};

export default Contact;
