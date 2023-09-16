import { Link, useNavigate } from "react-router-dom";

import { routes } from "../../Routes/routes";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const Navbar = () => {
  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState([]);
  const [inicialesUserData, setInicialesUserData] = useState("");
  const [inicialesUSER, setInicialesUSER] = useState("");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false)

  function handleResize() {
    if (window.innerWidth >= 780) {
      setMobileMenu(false);
    } else {
      setMobileMenu(true);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
  }, []);

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

  const navigate = useNavigate()

  const favoritos = () => {
    navigate("/favs");
  }

  const logout = () => {
    setShowLogoutModal(true); // Mostrar el modal al hacer clic en "Cerrar sesión"
  };

  

  const confirmLogout = () => {
    localStorage.removeItem("user");
    //setUserData([]);
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
      

      {mobileMenu === false ? 

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
            <Dropdown>
                <Dropdown.Toggle style={{backgroundColor:"#E3CE8D", color:"#2B2B28", border: "none", fontSize: "0.8rem", fontWeight: "bold"}}>
                  Opciones
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                  <button className={styles.logOut} onClick={favoritos}>
                    Favoritos
                  </button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                  <button className={styles.logOut} onClick={logout}>
                    Cerrar sesión
                  </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
            
            
            </Dropdown>
          </div>
        )}
      </div>

      :
      <>
      {userData.length == 0 || !localStorage.getItem("user") ? (
      <Dropdown>
      <Dropdown.Toggle style={{backgroundColor:"#E3CE8D", color:"#2B2B28", border: "none", fontSize: "0.8rem"}}>
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item >
            <Link to={routes.registro} style={{color: "#2B2B28"}}>
              Crear cuenta
            </Link>
        </Dropdown.Item>
        <Dropdown.Item>
            <Link to={routes.login} style={{color: "#2B2B28"}}>
              Iniciar sesión
            </Link>
        </Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
    ) : (
      <div className={styles.cerrarSesionBOX}>
        {renderProfileImageOrLoading()}
        {/* <button className={styles.logOut} onClick={favoritos}>
          Favoritos
        </button>
        <button className={styles.logOut} onClick={logout}>
          Cerrar sesión
        </button> */}
        <Dropdown>
          <Dropdown.Toggle style={{backgroundColor:"#E3CE8D", color:"#2B2B28", border: "none", fontSize: "0.8rem", fontWeight: "bold"}}>
            Opciones
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
            <button className={styles.logOut} onClick={favoritos}>
              Favoritos
            </button>
            </Dropdown.Item>
            <Dropdown.Item>
            <button className={styles.logOut} onClick={logout}>
              Cerrar sesión
            </button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )}
    </>
      }

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
