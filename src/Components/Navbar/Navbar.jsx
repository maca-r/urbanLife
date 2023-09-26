import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Dropdown, Modal } from "react-bootstrap";
const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

import { routes } from "../../Routes/routes";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  function handleResize() {
    if (window.innerWidth >= 860) {
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
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      const listarUsuarios =
        privateUrl != ""
          ? `${privateUrl}:80/auth/usuarios/listausuarios-all`
          : `${publicUrl}:80/auth/usuarios/listausuarios-all`;

      axios
        .get(listarUsuarios, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Respuesta del servidor:", response.data);

          if (response.status === 200 && response.data.length > 0) {
            const userData = response.data[0];
            const initials =
              userData.nombre.charAt(0).toUpperCase() +
              userData.apellido.charAt(0).toUpperCase();
            setUserInitials(initials);
          } else {
            console.error("Error al obtener la información del usuario");
          }
        })

        .catch((error) => {
          console.error("Error al obtener la información del usuario", error);
        });
    }
  }, []);

  const handleLogout = async () => {
    try {
      const logout =
        privateUrl != ""
          ? `${privateUrl}:80/api/v1/auth/logout`
          : `${publicUrl}:80/api/v1/auth/logout`;

      const response = await axios.post(logout, null, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      if (response.status === 200 || response.status === 202) {
        localStorage.removeItem("token");
        console.log("Cierre de sesión exitoso");
        window.location.reload();
      } else {
        console.error("Error en el cierre de sesión");
      }
    } catch (error) {
      console.error("Error en el cierre de sesión", error);
    }
  };

  const navigate = useNavigate();

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

      {mobileMenu === false ? (
        <div className={styles.rutas}>
          {isLoggedIn ? (
            <>
              <div className={styles.userInitials}>{userInitials}</div>
              <button onClick={() => navigate("/favs")}>. Favoritos</button>
              <button
                className={styles.logOut}
                onClick={() => setShowConfirmModal(true)}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to={routes.registro} className={styles.crearCuenta}>
                Crear cuenta
              </Link>
              <Link to={routes.login} className={styles.iniciarSesion}>
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className={styles.rutas}>
          {isLoggedIn ? (
            <Dropdown>
              <div className={styles.userInitials}>{userInitials}</div>

              <Dropdown.Toggle
                style={{
                  backgroundColor: "#E3CE8D",
                  color: "#2B2B28",
                  border: "none",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Opciones
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <button onClick={() => navigate("/favs")}>. Favoritos</button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <button
                    className={styles.logOut}
                    onClick={() => setShowConfirmModal(true)}
                  >
                    Cerrar Sesión
                  </button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#E3CE8D",
                  color: "#2B2B28",
                  border: "none",
                  fontSize: "0.8rem",
                }}
              >
                Menu
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to={routes.registro} style={{ color: "#2B2B28" }}>
                    Crear cuenta
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={routes.login} style={{ color: "#2B2B28" }}>
                    Iniciar sesión
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      )}

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cierre de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
