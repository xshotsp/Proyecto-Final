// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersAction, getAllProducts } from "../../redux/actions/actions";
import UsersTable from "../usersTable/usersTable";
import ProductsTable from "../productsTable/productsTable";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [botonActivo, setBotonActivo] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (botonActivo === "usuarios") {
      dispatch(getAllUsersAction()).then((userData) => setData(userData));
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
          Usuarios
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
          Productos
        </button>
        <button
          onClick={() => handleBotonClick("compras")}
          className={botonActivo === "compras" ? styles.activo : ""}
        >
          Compras
        </button>
      </div>
      <div className={styles.content}>
        {botonActivo === "usuarios" && <UsersTable data={data} />}
        {botonActivo === "usuariosBloqueados" && <UsuariosBloqueadosTable data={data} />}
        {botonActivo === "productos" && <ProductsTable data={data} />}
        {botonActivo === "compras" && <ComprasTable data={data} />}
      </div>
    </div>
  );
};

export default Dashboard;
