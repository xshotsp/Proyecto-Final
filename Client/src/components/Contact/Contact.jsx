import s from './Contact.module.css'

const Contact = () => {
  return (
    <div className={s.container}>
        <h1 className={s.chau}>
            Contáctanos!
        </h1>

        <p>Nombre *</p>
        <input type="text" />

        <p>Email *</p>
        <label htmlFor="email">
            <input type="text" />
        </label>
        <br />
        <p>
        <label htmlFor="text">Mensaje *</label>

        </p>
        <textarea name="txtarea" 
        id="txt" 
        cols="40" 
        rows="10"
        placeholder='Escribenos tu mensaje aqui!'
        />
        <br />
        <button>Enviar</button>
        <br />
        <h2>Nuestros datos</h2>
        <br />
        <span>
        <h4>Puedes encontrarnos en</h4>
        <p>Av. Quirkz 3322, Córdoba, Argentina</p>
        </span>
        <h2>
        <strong>Telefono</strong>
        : 4653 2312

        </h2>
    </div>
  )
}

export default Contact