import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useDispatch } from "react-redux";
import { getAllUsersAction } from "../../redux/actions/actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [botonActivo, setBotonActivo] = useState(null);

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  const handleBotonClick = (boton) => {
    // Si el botón actual ya está activo, desactívalo
    setBotonActivo((prevBoton) => (prevBoton === boton ? null : boton));
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <h2>Quirkz</h2>
        <img src="" alt="" />
        <h4>Admin</h4>
        <button
          onClick={() => handleBotonClick("usuarios")}
          className={botonActivo === "usuarios" ? styles.activo : ""}
        >
          Users
        </button>
        <button
          onClick={() => handleBotonClick("productos")}
          className={botonActivo === "productos" ? styles.activo : ""}
        >
          Products
        </button>
        <button
          onClick={() => handleBotonClick("compras")}
          className={botonActivo === "compras" ? styles.activo : ""}
        >
          Purchases
        </button>

      </div>
        {botonActivo && <p>Giving information {botonActivo}</p>}
    </div>
  );
};

export default Dashboard;
