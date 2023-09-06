import { useState } from "react";
import { AñadirProducto } from "./AñadirProducto";
import { AddImages } from "./AddImages";

import styles from "./Categorias.module.css";
import { RegistrarTalleProd } from "./RegistrarTalleProd";
import { ListaProductos } from "./ListaProductos";

export function Producto() {
  const [panelSection, setPanelSection] = useState(null);
  const [showTitle, setShowTitle] = useState(true);

  const handlePanelSection = (targetSection) => {
    setPanelSection(targetSection);
    setShowTitle(false);
  };

  return (
    <section>
      <div className={styles.buttonPanel}>
        <button onClick={() => handlePanelSection("agregarProducto")}>
          Agregar Producto
        </button>

        <button onClick={() => handlePanelSection("registrarTalleProd")}>
          Agregar Talle
        </button>

        <button onClick={() => handlePanelSection("addImages")}>
          Agregar Imagen
        </button>

        <button onClick={() => handlePanelSection("listarProducto")}>
          Listar Producto
        </button>
      </div>
      {showTitle && <h4>Elija una acción del panel superior</h4>}

      {panelSection === "agregarProducto" && <AñadirProducto />}
      {panelSection === "addImages" && <AddImages />}
      {panelSection === "registrarTalleProd" && <RegistrarTalleProd />}
      {panelSection === "listarProducto" && <ListaProductos />}
    </section>
  );
}
