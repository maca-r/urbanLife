import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import { ListaProductos } from "./ListaProductos";
import { AddCategorias } from "./AddCategorias";
import { AddTalles } from "./AddTalles";
import { AñadirProducto } from "./AñadirProducto";

export function Admin() {
  const [alertaResponsive, setAlertaResponsive] = useState(false);

  function handleResize() {
    if (window.innerWidth >= 780) {
      setAlertaResponsive(false);
    } else {
      setAlertaResponsive(true);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
  }, []);

  const [panelSection, setPanelSection] = useState("");

  const handlePanelSection = (targetSection) => {
    setPanelSection(targetSection);
  };

  return (
    <>
      <h2>Panel de Administración</h2>

      {alertaResponsive ? (
        <h3 className={styles.mensaje}>
          {" "}
          El panel de administrador sólo está disponible para versión desktop
        </h3>
      ) : (
        <div className={styles.panel}>
          {/* <section className={styles.sectionDesktop}>
        <Link to="/listaproductos">
          <button onClick={handlePanelSection("listaProductos")}>Lista Productos</button>
        </Link>
        <Link to="/añadirproducto">
          <button onClick={handlePanelSection("agregarProducto")}>Agregar Producto</button>
        </Link>
        <Link to="/añadircategorias">
          <button onClick={handlePanelSection("agregarCategoria")}>Agregar Categoria</button>
        </Link>
        <Link to="/añadirtalles">
          <button onClick={handlePanelSection("agregarTalles")}>Agregar Talles</button>
        </Link>
      </section> */}

          <div className={styles.buttonPanel}>
            <button onClick={() => handlePanelSection("listaProductos")}>
              Lista Productos
            </button>

            <button onClick={() => handlePanelSection("agregarProducto")}>
              Agregar Producto
            </button>

            <button onClick={() => handlePanelSection("agregarCategoria")}>
              Agregar Categoria
            </button>

            {/* <button onClick={ () => handlePanelSection("agregarTalles")}>Agregar Talles</button> */}
          </div>

          <div className={styles.showPanelSection}>
            {panelSection == "" && (
              <h3>
                Haga click en un botón del panel izquierdo para visualizar el
                contenido
              </h3>
            )}
            {panelSection == "listaProductos" && <ListaProductos />}
            {panelSection == "agregarProducto" && <AñadirProducto />}
            {panelSection == "agregarCategoria" && <AddCategorias />}
            {panelSection == "agregarTalles" && <AddTalles />}
          </div>
        </div>
      )}
    </>
  );
}
