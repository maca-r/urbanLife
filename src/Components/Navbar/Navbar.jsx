import { Link } from "react-router-dom";
import { routes } from "../../Routes/routes";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Navbar = () => {
  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState([]);
  const [inicialesUserData, setInicialesUserData] = useState("");
  const [inicialesUSER, setInicialesUSER] = useState("");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserData(userData);
      const initials = userData.nombre[0] + userData.apellido[0];
      const upperCaseInitials = initials.toUpperCase();
      setInicialesUserData(upperCaseInitials);
    }
    if (user) {
      setUser(user);
      const initialsUser = user.email[0] + user.email[1];
      const upperCaseInitialsUser = initialsUser.toUpperCase();
      setInicialesUSER(upperCaseInitialsUser);
    }
  }, []);

  const logout = () => {
    setShowLogoutModal(true); // Mostrar el modal al hacer clic en "Cerrar sesión"
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    setUserData([]);
    setUser([]);
    setShowLogoutModal(false); // Cierra el modal después de confirmar el cierre de sesión
  };

  // const logout = () => {
  //   //localStorage.removeItem('userData');
  //   const confirmLogout = window.confirm("¿Seguro que quieres cerrar sesión?");
  //   if (confirmLogout) {
  //     localStorage.removeItem("user");
  //     setUserData([]);
  //     setUser([]);
  //   }
  // };

  const renderProfileImageOrLoading = () => {
    if (userData.nombre !== "" && inicialesUserData !== "") {
      return <div className={styles.profileImage}>{inicialesUserData} </div>;
      
    } else if (user.email !== "" && inicialesUSER !== "") {
      return <div className={styles.profileImage}>{inicialesUSER}</div>;
    } else {
      return <div>Cargando...</div>;
    }
  };

  return (
    <nav>

      <Link to={routes.home} className={styles.logoLink}>
        <div className={styles.logo}>
          <img
            className={styles.logoImage}
            src="/images/logo.png"
            alt="logo Urban Life"
          />
          <h6>Vivi tu estilo</h6>
        </div>
        
      </Link>

      {/* <h6>Donde el diseño encuentra a todos</h6> */}
      

      <div className={styles.rutas}>
        {userData.length == 0 || !localStorage.getItem("user") ? (
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

            <button className={styles.logOut} onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¿Seguro que quieres cerrar sesión?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Cerrar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
