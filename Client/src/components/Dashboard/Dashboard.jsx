// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersAction, getAllProducts } from "../../redux/actions/actions";
import UsersTable from "../usersTable/usersTable";
import UsersBanTable from "../usersBan/usersBan"; // Asegúrate de importar el componente correcto
import ProductsTable from "../productsTable/productsTable";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [botonActivo, setBotonActivo] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (botonActivo === "usuarios") {
      dispatch(getAllUsersAction()).then((userData) => setData(userData));
    } else if (botonActivo === "usuariosBloqueados") {
      // Modificamos el nombre del botón
      // Aquí deberías llamar a la acción que obtiene los usuarios bloqueados
      // algo así como dispatch(getAllBlockedUsersAction())
      // y establecer la lógica correspondiente en la acción
      // para obtener solo los usuarios bloqueados.
      setData([]); // Esto debería ser ajustado con la lógica correcta
    } else if (botonActivo === "productos") {
      dispatch(getAllProducts()).then((productData) => setData(productData));
    }
    
  }, [dispatch, botonActivo]);

  const handleBotonClick = (boton) => {
    setBotonActivo((prevBoton) => (prevBoton === boton ? null : boton));
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <h2>Quirkz</h2>
        <button
          onClick={() => handleBotonClick("usuarios")}
          className={botonActivo === "usuarios" ? styles.activo : ""}
        >
          Users
        </button>
        <button
          onClick={() => handleBotonClick("usuariosBloqueados")}
          className={botonActivo === "usuariosBloqueados" ? styles.activo : ""}
        >
          Usuarios Bloqueados
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
