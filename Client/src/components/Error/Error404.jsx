import { Link } from "react-router-dom"

const Error404 = () => {
  return (
    <>
    <h1>Error404</h1>
    <br />
    <h1>Pagina no encontrada...</h1>
    <br />
    <Link to="/">
      <button>Volver al inicio</button>
    </Link>
    </>
  )
}

export default Error404