import { useEffect, useState } from "react";
import styles from "./Admin.module.css";

import { AddTalles } from "./AddTalles";

import { Categorias } from "./Categorias";

import { Producto } from "./Producto";
// import { Caracteristicas } from "./Caracteristicas";
import { ListaProductos } from "./ListaProductos";
import ListaTalles from "./ListaTalles";
import { Button } from "react-bootstrap";

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
      <h2 className={styles.title}>Panel de Administración</h2>

      {alertaResponsive ? (
        <h3 className={styles.mensaje}>
          {" "}
          El panel de administrador sólo está disponible para versión desktop
        </h3>
      ) : (
        <div className={styles.panel}>
          <div className={styles.buttonPanel}>
            <Button onClick={() => handlePanelSection("agregarTalles")}>
              Registrar Talles
            </Button>

            <Button onClick={() => handlePanelSection("listaTalles")}>
              Listar Talles
            </Button>

            <Button onClick={() => handlePanelSection("categorias")}>
              Administrar Categorias
            </Button>

            <Button onClick={() => handlePanelSection("producto")}>
              Agregar Productos
            </Button>

            <Button onClick={() => handlePanelSection("listaProductos")}>
              Listar Productos
            </Button>
          </div>

          {/* <button onClick={() => handlePanelSection("caracteristicas")}>
              Administrar Caracteristicas
            </button> */}

          <div className={styles.showPanelSection}>
            {panelSection == "" && (
              <h3>
                Haga click en un botón del panel izquierdo para visualizar el
                contenido
              </h3>
            )}
            {panelSection == "producto" && <Producto />}

            {panelSection == "categorias" && <Categorias />}

            {/* {panelSection == "caracteristicas" && <Caracteristicas />} */}

            {panelSection == "agregarTalles" && <AddTalles />}

            {panelSection == "listaTalles" && <ListaTalles />}

            {panelSection == "listaProductos" && <ListaProductos />}
          </div>
        </div>
      )}
    </>
  );
}
