import { useState } from "react";
import { AddCategorias } from "./AddCategorias";
import { ImgCategoria } from "./ImgCategoria";
import { ListarCategorias } from "./ListarCategorias";
import { PapeleraCategoria } from "./PapeleraCategoria";
import styles from "./Categorias.module.css";

export function Categorias() {
  const [panelSection, setPanelSection] = useState(null);
  const [showTitle, setShowTitle] = useState(true);

  const handlePanelSection = (targetSection) => {
    setPanelSection(targetSection);
    setShowTitle(false);
  };

  return (
    <section>
      <div className={styles.buttonPanel}>
        <button onClick={() => handlePanelSection("añadirCategorias")}>
          Agregar Categorias
        </button>

        <button onClick={() => handlePanelSection("imgCategoria")}>
          Agregar Imagen
        </button>

        <button onClick={() => handlePanelSection("listarCategorias")}>
          Listar Categorias
        </button>

        <button onClick={() => handlePanelSection("papeleraCategoria")}>
          Papelera
        </button>
      </div>
      {showTitle && <h4>Elija una acción del panel superior</h4>}

      {panelSection === "añadirCategorias" && <AddCategorias />}
      {panelSection === "imgCategoria" && <ImgCategoria />}
      {panelSection === "listarCategorias" && <ListarCategorias />}
      {panelSection === "papeleraCategoria" && <PapeleraCategoria />}
    </section>
  );
}
