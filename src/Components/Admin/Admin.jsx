import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";

export function Admin() {
  const [alertaResponsive, setAlertaResponsive] = useState(false);
  

  function handleResize() {
    if(window.innerWidth >= 780 ) {
      setAlertaResponsive(false);
    } else{
      setAlertaResponsive(true);
    }
}

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        window.addEventListener("load",handleResize)

    },[])

  return (
    <>
      <h2>Panel de Administración</h2>

      { alertaResponsive ? 
        <h3 className={styles.mensaje}>
          {" "}
          El panel de administrador sólo está disponible para versión desktop
        </h3>

        :

        <section className={styles.sectionDesktop}>
        <Link to="/listaproductos">
          <button>Lista Productos</button>
        </Link>
        <Link to="/añadirproducto">
          <button>Agregar Producto</button>
        </Link>
        <Link to="/añadircategorias">
          <button>Agregar Categoria</button>
        </Link>
        <Link to="/añadirtalles">
          <button>Agregar Talles</button>
        </Link>
      </section>

      }

    </>
  );
}
