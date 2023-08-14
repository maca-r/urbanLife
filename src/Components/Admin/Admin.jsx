import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";

export function Admin() {
  const [alertaResponsive, setAlertaResponsive] = useState(false);
  const [dimensions, setDimensions] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      if (dimensions >= 480) {
        setAlertaResponsive(false);
        setDimensions(window.innerWidth);
      } else {
        setAlertaResponsive(true);
      }
    }
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
  }, [dimensions]);

  return (
    <>
      <h2>Panel de Administración</h2>

      {alertaResponsive && (
        <h3 className={styles.mensaje}>
          {" "}
          El panel de administrador sólo está disponible para versión desktop
        </h3>
      )}

      <section className={styles.sectionDesktop}>
        <Link to="/listaproductos">
          <button>Lista Productos</button>
        </Link>
        <Link to="/añadirproducto">
          <button>Agregar Producto</button>
        </Link>
      </section>
    </>
  );
}
