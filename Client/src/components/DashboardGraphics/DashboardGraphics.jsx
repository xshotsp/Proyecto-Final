import styles from "./DashboardGraphics.module.css"

const DashboardGraphics = ({login }) => {
  return (
    <div className={styles.container}>
      <h2>Quirkz</h2>
      <img src={login.photo} alt="" />
      <h4>Admin</h4>
      <select name="" id="">
        <option value="">Usuarios</option>
        <option value="">Activos</option>
        <option value="">Inactivos</option>
      </select>
      <select name="" id="">
        <option value="">Productos</option>
        <option value="">Activos</option>
        <option value="">Inactivos</option>
      </select>
      <button>Compras</button>
    </div>
  );
};

export default DashboardGraphics;
