
const Login = () => {
  return (
    <section className="login-header">
        <hr />
        <h2>Mi Cuenta</h2>
        <a> Home ➜ Mi Cuenta</a>
        <hr />
        <h2>Acceder</h2>
        <input
        type="text" 
        placeholder="Nombre de usuario o correo electrónico" />
        <br />
        <br />
        <input 
        type="password"
        placeholder="Ingrese su contraseña" />
        <br />
        <br />
        <button>Acceder</button>
        <br />
        <br />
    </section>
  )
}

export default Login