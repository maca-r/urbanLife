import { Link } from "react-router-dom";
import { routes } from "../../Routes/routes";
import styles from "./Navbar.module.css";
import {  useEffect, useState } from "react";


const Navbar = () => {


  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState([]);
  const [inicialesUserData, setInicialesUserData] = useState("");
  const [inicialesUSER, setInicialesUSER] = useState('')  


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const user = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserData(userData);
      const initials = userData.nombre[0] + userData.apellido[0];
      const upperCaseInitials = initials.toUpperCase();
      setInicialesUserData(upperCaseInitials); 
    }
    if (user) {
      setUser(user)
      const initialsUser = user.email[0] + user.email[1]
      const upperCaseInitialsUser = initialsUser.toUpperCase();
      setInicialesUSER(upperCaseInitialsUser)

    }
  }, []);
  


  const logout = () => {
    //localStorage.removeItem('userData');
    localStorage.removeItem('user');
    setUserData([])
    setUser([])
  }



  const renderProfileImageOrLoading = () => {
    if (userData.nombre !== "" && inicialesUserData !== "") {
      return <div className={styles.profileImage}>{inicialesUserData}</div>;
    } else if (user.email !== "" && inicialesUSER !== "") {
      return <div className={styles.profileImage}>{inicialesUSER}</div>;
    } else {
      return <div>Cargando...</div>;
    }
  };

  return (

    <nav>
      <Link to={routes.home} className={styles.logo}>
        <div className={styles.logo}>
          <img className={styles.logoImage} src="/images/logo.png" alt="logo Urban Life" />
        </div>
        <h6>Donde el diseño encuentra a todos</h6>
      </Link>

      <div className={styles.rutas}>

      {
          userData.length == 0 || !localStorage.getItem('user')? (
            <>
              <Link to={routes.registro} className={styles.crearCuenta}>
                Crear cuenta
              </Link>
              <Link to={routes.login} className={styles.iniciarSesion}>
                Iniciar sesión
              </Link>
            </>
          ) : (
            <div className={styles.cerrarSesionBOX}>

            {renderProfileImageOrLoading()}

            <button className={styles.logOut} onClick={logout}>Cerrar sesión</button>
            </div>
          )
        }
      </div>
    </nav>
  );
};

export default Navbar;
