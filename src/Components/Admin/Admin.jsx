import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { ListaProductos } from "./ListaProductos";
// import { AddTalles } from "./AddTalles";
import { AñadirProducto } from "./AñadirProducto";
import { Categorias } from "./Categorias";

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
          <div className={styles.buttonPanel}>
            <button onClick={() => handlePanelSection("listaProductos")}>
              Lista Productos
            </button>

            <button onClick={() => handlePanelSection("agregarProducto")}>
              Agregar Producto
            </button>

            <button onClick={() => handlePanelSection("categorias")}>
              Administrar Categorias
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
            {panelSection == "categorias" && <Categorias />}
            {/* {panelSection == "agregarTalles" && <AddTalles />} */}
          </div>
        </div>
      )}
    </>
  );
}
