import { Link } from "react-router-dom"

const Error404 = () => {
  return (
    <>
    <h1>Error404</h1>
    <br />
    <h1>Page not found...</h1>
    <br />
    <Link to="/">
      <button>Back to home</button>
    </Link>
    </>
  )
}

export default Error404