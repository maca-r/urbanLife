import { Link } from "react-router-dom";
import { routes } from "../../Routes/routes";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
      <Link to={routes.home} className={styles.logo}>
        <div className={styles.logo}>
          <img className={styles.logoImage} src="/images/logo.png" alt="logo Urban Life" />
        </div>
        <h6>Donde el diseño encuentra a todos</h6>
      </Link>

      <div className={styles.rutas}>
        <Link to={routes.signUp} className={styles.crearCuenta}>
          Crear cuenta
        </Link>
        <Link to={routes.login} className={styles.iniciarSesion}>
          Iniciar sesión
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
