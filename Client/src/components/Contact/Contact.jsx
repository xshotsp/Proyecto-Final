import s from './Contact.module.css'

const Contact = () => {
  return (
    <div className={s.container}>
        <h1 className={s.chau}>
            Contact us!
        </h1>

        <p>Name *</p>
        <input type="text" />

        <p>Email *</p>
        <label htmlFor="email">
            <input type="text" />
        </label>
        <br />
        <p>
        <label htmlFor="text">Message *</label>

        </p>
        <textarea name="txtarea" 
        id="txt" 
        cols="40" 
        rows="10"
        placeholder='Send us your message here!'
        />
        <br />
        <button>Send</button>
        <br />
        <h2>Our information</h2>
        <br />
        <span>
        <h4>You can find us at</h4>
        <p>Av. Quirkz 3322, Córdoba, Argentina</p>
        </span>
        <h2>
        <strong>Phone</strong>
        : 4653 2312

        </h2>
    </div>
  )
}

export default Contact